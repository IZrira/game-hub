import React, { useState, useEffect, useMemo } from 'react';
import { MessageSquare, ArrowUpDown, Flame, Clock } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { isAdmin as checkIsAdmin } from '../lib/admin';
import CommentForm from './CommentForm';
import CommentCard, { Review } from './CommentCard';
import { CommentData } from './SEO';

interface Props {
  characterId: string;
  gameId: string;
  onCommentsLoaded?: (comments: CommentData[]) => void;
}

export const CharacterReviewBoard: React.FC<Props> = ({ characterId, gameId, onCommentsLoaded }) => {
  const { user, openLoginModal } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sortMode, setSortMode] = useState<'newest' | 'best'>('newest');

  const storageKey = `rira_local_reviews_${gameId}_${characterId}`;
  const upvotesKey = `rira_local_upvotes_${gameId}_${characterId}`;
  const reportsKey = `rira_local_reports_${gameId}_${characterId}`;

  const isAdmin = useMemo(() => {
    if (!user) return false;
    return checkIsAdmin(user.id);
  }, [user]);

  useEffect(() => {
    fetchReviews();
  }, [characterId, gameId, user?.id]);

  useEffect(() => {
    if (onCommentsLoaded) {
      const mappedComments: CommentData[] = reviews.map((r) => ({
        author: r.nickname?.trim() || 'Anonymous',
        date: r.created_at || new Date().toISOString(),
        content: r.comment_text || '',
        upvotes:
          typeof r.upvotes_count === 'number'
            ? r.upvotes_count
            : typeof r.like_count === 'number'
            ? r.like_count
            : 0,
        rating:
          typeof r.rating === 'number' && !isNaN(r.rating) && r.rating >= 1 && r.rating <= 5
            ? r.rating
            : 5,
      }));
      onCommentsLoaded(mappedComments);
    }
  }, [reviews, onCommentsLoaded]);

  const fetchReviews = async () => {
    setIsLoading(true);
    setError(null);

    let rawReviews: Review[] = [];
    let upvotesData: { comment_id: string; user_id: string }[] = [];
    let reportsData: { comment_id: string; user_id: string }[] = [];
    let isOfflineMode = false;

    if (supabase) {
      try {
        const { data: revs, error: revErr } = await supabase
          .from('character_reviews')
          .select('*')
          .eq('game_id', gameId)
          .eq('character_id', characterId)
          .order('created_at', { ascending: false });

        if (revErr) {
          throw revErr;
        }

        rawReviews = revs || [];

        const reviewIds = rawReviews.map((r) => r.id);
        if (reviewIds.length > 0) {
          try {
            const { data: uvs } = await supabase
              .from('comment_upvotes')
              .select('comment_id, user_id')
              .in('comment_id', reviewIds);

            if (uvs) upvotesData = uvs;
          } catch (uvErr) {
            console.warn('Could not fetch upvotes table from Supabase:', uvErr);
          }

          try {
            const { data: rps } = await supabase
              .from('comment_reports')
              .select('comment_id, user_id')
              .in('comment_id', reviewIds);

            if (rps) reportsData = rps;
          } catch (rpErr) {
            console.warn('Could not fetch comment_reports table from Supabase:', rpErr);
          }
        }
      } catch (err) {
        console.warn('Supabase fetch failed, falling back to local state:', err);
        isOfflineMode = true;
      }
    } else {
      isOfflineMode = true;
    }

    if (isOfflineMode) {
      try {
        const localData = localStorage.getItem(storageKey);
        if (localData) {
          rawReviews = JSON.parse(localData);
        } else {
          // Default sample reviews for smooth local dev / preview
          rawReviews = [
            {
              id: 'sample-1',
              created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
              game_id: gameId,
              character_id: characterId,
              nickname: 'Archive Explorer',
              rating: 5,
              comment_text: 'Outstanding character design and synergy! Highly recommended for end-game content.',
              user_id: 'sample-user-1',
              parent_id: null,
              media_urls: [],
              is_pinned: true,
              upvotes_count: 5,
              report_count: 0,
            },
            {
              id: 'sample-2',
              created_at: new Date(Date.now() - 3600000 * 12).toISOString(),
              game_id: gameId,
              character_id: characterId,
              nickname: 'Tactical Analyst',
              rating: 5,
              comment_text: 'Totally agree! Pairing with top-tier supports yields massive damage output.',
              user_id: 'sample-user-2',
              parent_id: 'sample-1',
              media_urls: [],
              is_pinned: false,
              upvotes_count: 2,
              report_count: 0,
            },
          ];
          localStorage.setItem(storageKey, JSON.stringify(rawReviews));
        }

        const localUpvotes = localStorage.getItem(upvotesKey);
        if (localUpvotes) {
          upvotesData = JSON.parse(localUpvotes);
        }

        const localReports = localStorage.getItem(reportsKey);
        if (localReports) {
          reportsData = JSON.parse(localReports);
        }
      } catch (e) {
        console.error('LocalStorage error:', e);
      }
    }

    // Process upvote counts, report counts, and user interaction state
    const upvotesCountMap = new Map<string, number>();
    const userUpvotedSet = new Set<string>();

    upvotesData.forEach((uv) => {
      upvotesCountMap.set(uv.comment_id, (upvotesCountMap.get(uv.comment_id) || 0) + 1);
      if (user && uv.user_id === user.id) {
        userUpvotedSet.add(uv.comment_id);
      }
    });

    const reportsCountMap = new Map<string, number>();
    const userReportedSet = new Set<string>();

    reportsData.forEach((rp) => {
      reportsCountMap.set(rp.comment_id, (reportsCountMap.get(rp.comment_id) || 0) + 1);
      if (user && rp.user_id === user.id) {
        userReportedSet.add(rp.comment_id);
      }
    });

    const processed = rawReviews.map((r) => {
      const computedUpvotes = upvotesCountMap.get(r.id) ?? r.upvotes_count ?? r.like_count ?? 0;
      const computedReports = reportsCountMap.get(r.id) ?? r.report_count ?? 0;

      return {
        ...r,
        media_urls: r.media_urls || [],
        upvotes_count: computedUpvotes,
        like_count: computedUpvotes,
        report_count: computedReports,
        user_has_upvoted: user ? userUpvotedSet.has(r.id) : false,
        user_has_reported: user ? userReportedSet.has(r.id) : false,
      };
    });

    setReviews(processed);
    setIsLoading(false);
  };

  const saveLocalReviews = (updated: Review[]) => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(updated));
    } catch (e) {
      console.error('LocalStorage save error:', e);
    }
  };

  const handleCreateReview = async (
    text: string,
    rating: number,
    parentId: string | null = null,
    mediaUrls: string[] = []
  ) => {
    if (!user) {
      openLoginModal();
      return;
    }

    const trimmedText = text.trim();
    if (!trimmedText) return;

    setIsSubmitting(true);
    const nickname =
      user.user_metadata?.full_name ||
      user.user_metadata?.name ||
      user.email?.split('@')[0] ||
      'User';

    const tempId = 'temp_' + Date.now();
    const newReviewData = {
      game_id: gameId,
      character_id: characterId,
      nickname,
      rating,
      comment_text: trimmedText,
      media_urls: mediaUrls,
      user_id: user.id,
      parent_id: parentId,
      is_pinned: false,
      report_count: 0,
      like_count: 0,
      author_is_admin: isAdmin,
    };

    const tempReview: Review = {
      ...newReviewData,
      id: tempId,
      created_at: new Date().toISOString(),
      upvotes_count: 0,
      user_has_upvoted: false,
      user_has_reported: false,
      author_is_admin: isAdmin,
    };

    // Optimistic UI update
    const prevReviews = [...reviews];
    const updated = [tempReview, ...reviews];
    setReviews(updated);
    setIsSubmitting(false); // Enable form immediately

    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('character_reviews')
          .insert([newReviewData])
          .select()
          .single();

        if (error) throw error;
        
        if (data) {
          // Replace temp review with real DB data
          setReviews((current) =>
            current.map((r) => (r.id === tempId ? { ...data, upvotes_count: 0, user_has_upvoted: false, user_has_reported: false } : r))
          );
        }
      } catch (err) {
        console.warn('Supabase post failed, rolling back:', err);
        setReviews(prevReviews);
        alert('댓글 등록에 실패했습니다. 네트워크 상태를 확인해주세요.');
      }
    } else {
      saveLocalReviews(updated);
    }
  };

  const handleToggleUpvote = async (commentId: string) => {
    if (!user) {
      openLoginModal();
      return;
    }

    const target = reviews.find((r) => r.id === commentId);
    if (!target) return;

    const currentlyUpvoted = !!target.user_has_upvoted;
    const newCount = currentlyUpvoted
      ? Math.max(0, (target.upvotes_count || target.like_count || 0) - 1)
      : (target.upvotes_count || target.like_count || 0) + 1;

    // Optimistic state update
    const updatedReviews = reviews.map((r) =>
      r.id === commentId
        ? { ...r, upvotes_count: newCount, like_count: newCount, user_has_upvoted: !currentlyUpvoted }
        : r
    );
    setReviews(updatedReviews);
    saveLocalReviews(updatedReviews);

    // Sync with Supabase
    if (supabase) {
      try {
        if (currentlyUpvoted) {
          const { error } = await supabase
            .from('comment_upvotes')
            .delete()
            .eq('comment_id', commentId)
            .eq('user_id', user.id);
          if (error) throw error;
        } else {
          const { error } = await supabase
            .from('comment_upvotes')
            .insert([{ comment_id: commentId, user_id: user.id }]);
          if (error) throw error;
        }
      } catch (err) {
        console.warn('Supabase upvote sync failed, rolling back:', err);
        setReviews(reviews); // Rollback
        saveLocalReviews(reviews);
        alert('일시적인 오류가 발생했습니다. 다시 시도해주세요.');
        return;
      }
    }

    try {
      let localUpvotes: { comment_id: string; user_id: string }[] = [];
      const stored = localStorage.getItem(upvotesKey);
      if (stored) localUpvotes = JSON.parse(stored);

      if (currentlyUpvoted) {
        localUpvotes = localUpvotes.filter(
          (uv) => !(uv.comment_id === commentId && uv.user_id === user.id)
        );
      } else {
        localUpvotes.push({ comment_id: commentId, user_id: user.id });
      }
      localStorage.setItem(upvotesKey, JSON.stringify(localUpvotes));
    } catch (e) {
      console.error('LocalStorage upvote save error:', e);
    }
  };

  const handleEdit = async (id: string, text: string, rating: number, mediaUrls: string[] = []) => {
    if (!user) {
      openLoginModal();
      return;
    }

    const trimmedText = text.trim();
    if (!trimmedText) return;

    if (supabase) {
      try {
        await supabase
          .from('character_reviews')
          .update({
            comment_text: trimmedText,
            rating,
            media_urls: mediaUrls,
            updated_at: new Date().toISOString(),
          })
          .eq('id', id)
          .eq('user_id', user.id);
      } catch (err) {
        console.warn('Supabase edit failed, updating locally:', err);
      }
    }

    const updated = reviews.map((r) =>
      r.id === id ? { ...r, comment_text: trimmedText, rating, media_urls: mediaUrls } : r
    );
    setReviews(updated);
    saveLocalReviews(updated);
  };

  const handleDelete = async (id: string) => {
    if (!user) {
      openLoginModal();
      return;
    }
    if (!window.confirm('Are you sure you want to delete this comment?')) return;

    const prevReviews = [...reviews];
    const updated = reviews.filter((r) => r.id !== id && r.parent_id !== id);
    setReviews(updated); // Optimistic UI update

    if (supabase) {
      try {
        const { error } = await supabase
          .from('character_reviews')
          .delete()
          .eq('id', id)
          .eq('user_id', user.id);
          
        if (error) throw error;
      } catch (err) {
        console.warn('Supabase delete failed, rolling back:', err);
        setReviews(prevReviews); // Rollback
        alert('삭제에 실패했습니다. 다시 시도해주세요.');
        return;
      }
    }
    saveLocalReviews(updated);
  };

  const handleTogglePin = async (commentId: string, currentPinned: boolean) => {
    if (!user) {
      openLoginModal();
      return;
    }

    const newPinned = !currentPinned;

    if (supabase) {
      try {
        await supabase
          .from('character_reviews')
          .update({ is_pinned: newPinned })
          .eq('id', commentId);
      } catch (err) {
        console.warn('Supabase pin update failed, updating locally:', err);
      }
    }

    const updated = reviews.map((r) =>
      r.id === commentId ? { ...r, is_pinned: newPinned } : r
    );
    setReviews(updated);
    saveLocalReviews(updated);
  };

  const handleReport = async (commentId: string) => {
    if (!user) {
      openLoginModal();
      return;
    }

    const target = reviews.find((r) => r.id === commentId);
    if (!target || target.user_has_reported) return;

    const newReportCount = (target.report_count || 0) + 1;

    // Optimistic state update
    const updatedReviews = reviews.map((r) =>
      r.id === commentId
        ? { ...r, report_count: newReportCount, user_has_reported: true }
        : r
    );
    setReviews(updatedReviews);
    saveLocalReviews(updatedReviews);

    // Sync with Supabase
    if (supabase) {
      try {
        await supabase
          .from('comment_reports')
          .insert([{ comment_id: commentId, user_id: user.id }]);
      } catch (err) {
        console.warn('Supabase report sync failed, updated locally:', err);
      }
    }

    try {
      let localReports: { comment_id: string; user_id: string }[] = [];
      const stored = localStorage.getItem(reportsKey);
      if (stored) localReports = JSON.parse(stored);

      localReports.push({ comment_id: commentId, user_id: user.id });
      localStorage.setItem(reportsKey, JSON.stringify(localReports));
    } catch (e) {
      console.error('LocalStorage report save error:', e);
    }
  };

  // Build tree structure and sort root comments
  const reviewIds = useMemo(() => new Set(reviews.map((r) => r.id)), [reviews]);

  const rootReviews = useMemo(() => {
    // Include orphans whose parent_id doesn't exist in current reviews dataset
    const roots = reviews.filter((r) => !r.parent_id || !reviewIds.has(r.parent_id));

    return roots.sort((a, b) => {
      // 1. Elevate pinned comments first!
      if (a.is_pinned && !b.is_pinned) return -1;
      if (!a.is_pinned && b.is_pinned) return 1;

      // 2. Sort mode: 'best' vs 'newest'
      if (sortMode === 'best') {
        const upvotesA = a.upvotes_count || a.like_count || 0;
        const upvotesB = b.upvotes_count || b.like_count || 0;
        if (upvotesA !== upvotesB) {
          return upvotesB - upvotesA;
        }
      }

      // Default or fallback: newest created_at
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
  }, [reviews, reviewIds, sortMode]);

  const repliesMap = useMemo(() => {
    const map = new Map<string, Review[]>();
    reviews.forEach((r) => {
      if (r.parent_id && reviewIds.has(r.parent_id)) {
        const list = map.get(r.parent_id) || [];
        list.push(r);
        map.set(r.parent_id, list);
      }
    });
    // Sort replies chronologically
    map.forEach((list) => {
      list.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
    });
    return map;
  }, [reviews, reviewIds]);

  if (error) {
    return (
      <div className="mt-12 p-6 rounded-[35px] bg-red-500/10 border border-red-500/20 text-center">
        <p className="text-red-400 font-medium">{error}</p>
      </div>
    );
  }

  // --- SEO: DiscussionForumPosting Schema ---
  const schemaData = useMemo(() => {
    if (rootReviews.length === 0) return null;
    
    return {
      "@context": "https://schema.org",
      "@type": "DiscussionForumPosting",
      "headline": `${gameId.toUpperCase()} Character/Weapon Discussion and Reviews`,
      "articleSection": "Community Reviews",
      "interactionStatistic": {
        "@type": "InteractionCounter",
        "interactionType": "https://schema.org/CommentAction",
        "userInteractionCount": reviews.length
      },
      "comment": rootReviews.map(r => ({
        "@type": "Comment",
        "text": r.comment_text || "",
        "dateCreated": r.created_at || new Date().toISOString(),
        "author": {
          "@type": "Person",
          "name": r.nickname?.trim() || "Anonymous"
        },
        ...(r.rating ? {
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": r.rating,
            "bestRating": 5,
            "worstRating": 1
          }
        } : {})
      }))
    };
  }, [rootReviews, reviews.length, gameId]);

  return (
    <section className="mt-12 pt-8 border-t border-white/5">
      {schemaData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      )}
      {/* Header and Sorting Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 px-2">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 flex items-center justify-center border border-brand-primary/20">
            <MessageSquare size={20} className="text-brand-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white italic tracking-tighter uppercase flex items-center gap-2">
              Community Reviews
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-white/10 text-gray-300 not-italic">
                {reviews.length}
              </span>
            </h2>
            <p className="text-xs text-gray-400 font-medium">
              Share your experience and tactics with other players.
            </p>
          </div>
        </div>

        {/* Sorting Options UI */}
        <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 p-1 rounded-xl self-start md:self-auto">
          <button
            onClick={() => setSortMode('newest')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              sortMode === 'newest'
                ? 'bg-brand-primary text-white shadow-md shadow-brand-primary/20'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Clock size={13} />
            <span>최신순 (Newest)</span>
          </button>
          <button
            onClick={() => setSortMode('best')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              sortMode === 'best'
                ? 'bg-brand-primary text-white shadow-md shadow-brand-primary/20'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Flame size={13} />
            <span>베스트/추천순 (Best)</span>
          </button>
        </div>
      </div>

      <div className="mb-8">
        <CommentForm
          onSubmit={async (text, rating, mediaUrls) =>
            handleCreateReview(text, rating, null, mediaUrls)
          }
          isSubmitting={isSubmitting}
          user={user}
          onRequireAuth={openLoginModal}
          placeholder="Share your thoughts about this character..."
          buttonLabel="Post Review"
          showRating={true}
        />
      </div>

      <div className="space-y-6">
        {isLoading ? (
          <div className="text-center py-12 text-gray-400 animate-pulse font-medium">
            Loading reviews...
          </div>
        ) : rootReviews.length === 0 ? (
          <div className="text-center py-12 text-gray-400 italic bg-white/[0.02] rounded-[30px] border border-white/5">
            No reviews yet. Be the first to share your thoughts!
          </div>
        ) : (
          rootReviews.map((review) => (
            <CommentCard
              key={review.id}
              review={review}
              repliesMap={repliesMap}
              user={user}
              onToggleUpvote={handleToggleUpvote}
              onDelete={handleDelete}
              onEdit={handleEdit}
              onPostReply={async (parentId, text, mediaUrls) =>
                handleCreateReview(text, 5, parentId, mediaUrls)
              }
              onTogglePin={handleTogglePin}
              onReport={handleReport}
              onRequireAuth={openLoginModal}
              isAdmin={isAdmin}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default CharacterReviewBoard;

