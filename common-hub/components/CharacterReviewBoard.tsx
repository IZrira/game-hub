import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Trash2, Edit3, Star, User, MessageSquare } from 'lucide-react';
import LoginModal from './LoginModal';

interface Review {
  id: string;
  created_at: string;
  game_id: string;
  character_id: string;
  nickname: string;
  rating: number;
  comment_text: string;
  user_id?: string;
}

interface Props {
  characterId: string;
  gameId: string;
}

export const CharacterReviewBoard: React.FC<Props> = ({ characterId, gameId }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Form states
  const [rating, setRating] = useState(5);
  const [commentText, setCommentText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Edit states
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);
  const [editRating, setEditRating] = useState(5);
  const [editCommentText, setEditCommentText] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Auth Listener
    const checkSession = async () => {
      if (!supabase) return;
      const { data: { session } } = await supabase.auth.getSession();
      setCurrentUser(session?.user || null);
    };
    checkSession();

    if (supabase) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setCurrentUser(session?.user || null);
      });
      return () => subscription.unsubscribe();
    }
  }, []);

  useEffect(() => {
    fetchReviews();
  }, [characterId, gameId]);

  const fetchReviews = async () => {
    setIsLoading(true);
    setError(null);
    try {
      if (!supabase) throw new Error("Supabase not initialized");
      const { data, error } = await supabase
        .from('character_reviews')
        .select('*')
        .eq('game_id', gameId)
        .eq('character_id', characterId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReviews(data || []);
    } catch (err) {
      console.error("Failed to fetch reviews:", err);
      setError("Reviews temporarily unavailable.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePostClick = (e: React.MouseEvent) => {
    if (!currentUser) {
      e.preventDefault();
      setIsLoginModalOpen(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      setIsLoginModalOpen(true);
      return;
    }
    if (!commentText.trim() || commentText.length > 500) return;
    
    setIsSubmitting(true);
    try {
      const newReview = {
        game_id: gameId,
        character_id: characterId,
        nickname: currentUser.user_metadata?.full_name || currentUser.user_metadata?.name || 'User',
        rating,
        comment_text: commentText.trim(),
        user_id: currentUser.id
      };

      const { data, error } = await supabase
        .from('character_reviews')
        .insert([newReview])
        .select()
        .single();

      if (error) throw error;
      
      if (data) {
        setReviews([data, ...reviews]);
      }
      setCommentText('');
      setRating(5);
    } catch (err) {
      console.error("Failed to post review:", err);
      alert("Failed to post review. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this comment?")) return;
    try {
      const { error } = await supabase
        .from('character_reviews')
        .delete()
        .eq('id', id)
        .eq('user_id', currentUser.id);

      if (error) throw error;
      setReviews(reviews.filter(r => r.id !== id));
    } catch (err) {
      console.error("Failed to delete review:", err);
      alert("Failed to delete review.");
    }
  };

  const handleEditStart = (review: Review) => {
    setEditingReviewId(review.id);
    setEditRating(review.rating);
    setEditCommentText(review.comment_text);
  };

  const handleEditCancel = () => {
    setEditingReviewId(null);
  };

  const handleEditSubmit = async (id: string) => {
    if (!editCommentText.trim() || editCommentText.length > 500) return;
    setIsEditing(true);
    try {
      const { error } = await supabase
        .from('character_reviews')
        .update({
          rating: editRating,
          comment_text: editCommentText.trim()
        })
        .eq('id', id)
        .eq('user_id', currentUser.id);

      if (error) throw error;

      setReviews(reviews.map(r => r.id === id ? { ...r, rating: editRating, comment_text: editCommentText.trim() } : r));
      setEditingReviewId(null);
    } catch (err) {
      console.error("Failed to edit review:", err);
      alert("Failed to edit review.");
    } finally {
      setIsEditing(false);
    }
  };

  if (error) {
    return (
      <div className="mt-12 p-6 rounded-[35px] bg-red-500/10 border border-red-500/20 text-center">
        <p className="text-red-400 font-medium">{error}</p>
      </div>
    );
  }

  const userNickname = currentUser ? (currentUser.user_metadata?.full_name || currentUser.user_metadata?.name || 'User') : 'Anonymous';
  const userAvatar = currentUser?.user_metadata?.avatar_url;

  return (
    <section className="mt-12 pt-8 border-t border-white/5">
      <div className="flex items-center gap-4 mb-8 px-2">
        <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 flex items-center justify-center border border-brand-primary/20">
          <MessageSquare size={20} className="text-brand-primary" />
        </div>
        <h2 className="text-2xl font-black text-white italic tracking-tighter uppercase">Community Reviews</h2>
      </div>

      <div className="glass-card p-6 md:p-8 rounded-[35px] border border-white/5 mb-8 bg-gradient-to-br from-white/[0.03] to-transparent">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-[11px] font-black text-gray-500 uppercase tracking-widest mb-2">Posting as</label>
              <div className="flex items-center gap-3 w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white">
                {userAvatar ? (
                  <img src={userAvatar} alt={userNickname} className="w-6 h-6 rounded-full" />
                ) : (
                  <User size={16} className="text-gray-400" />
                )}
                <span>{userNickname}</span>
                {!currentUser && <span className="text-xs text-brand-primary ml-auto font-bold cursor-pointer hover:underline" onClick={() => setIsLoginModalOpen(true)}>Login required</span>}
              </div>
            </div>
            <div className="w-full md:w-32">
              <label className="block text-[11px] font-black text-gray-500 uppercase tracking-widest mb-2">Rating</label>
              <select 
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-primary/50 transition-colors appearance-none"
                disabled={!currentUser}
              >
                {[5, 4, 3, 2, 1].map(num => (
                  <option key={num} value={num} className="bg-gray-900 text-white">{num} Stars</option>
                ))}
              </select>
            </div>
          </div>
          <div className="relative">
            <label className="block text-[11px] font-black text-gray-500 uppercase tracking-widest mb-2">Your Review</label>
            <textarea 
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder={currentUser ? "Share your thoughts about this character... (max 500 characters)" : "Please login to write a review."}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-primary/50 transition-colors min-h-[100px] resize-y placeholder:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              maxLength={500}
              disabled={!currentUser}
              required
            />
            {!currentUser && (
              <div 
                className="absolute inset-0 z-10 cursor-pointer" 
                onClick={() => setIsLoginModalOpen(true)}
              />
            )}
            <div className="flex justify-between items-center mt-2">
              <span className={`text-xs ${commentText.length > 500 ? 'text-red-400' : 'text-gray-500'}`}>
                {commentText.length} / 500
              </span>
              <button 
                type="submit" 
                onClick={handlePostClick}
                disabled={isSubmitting || (currentUser && (!commentText.trim() || commentText.length > 500))}
                className="px-6 py-2 bg-brand-primary hover:bg-brand-primary/80 text-white font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider text-sm"
              >
                {isSubmitting ? 'Posting...' : 'Post Review'}
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="space-y-4">
        {isLoading ? (
          <div className="text-center py-12 text-gray-500 animate-pulse">Loading reviews...</div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-12 text-gray-500 italic bg-white/[0.02] rounded-[30px] border border-white/5">No reviews yet. Be the first to share your thoughts!</div>
        ) : (
          reviews.map(review => {
            const isOwnReview = currentUser && review.user_id === currentUser.id;
            const isEditingThis = editingReviewId === review.id;

            return (
              <div key={review.id} className={`glass-card p-6 rounded-[30px] border border-white/5 group hover:bg-white/[0.04] transition-colors relative bg-white/[0.01] ${isEditingThis ? 'ring-1 ring-brand-primary/50' : ''}`}>
                
                {isOwnReview && !isEditingThis && (
                  <div className="absolute top-6 right-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                    <button 
                      onClick={() => handleEditStart(review)}
                      className="p-2 text-gray-600 hover:text-brand-primary rounded-lg hover:bg-brand-primary/10"
                      title="Edit comment"
                    >
                      <Edit3 size={16} />
                    </button>
                    <button 
                      onClick={() => handleDelete(review.id)}
                      className="p-2 text-gray-600 hover:text-red-400 rounded-lg hover:bg-red-400/10"
                      title="Delete comment"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                )}
                
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center border border-white/10 overflow-hidden">
                    <User size={16} className="text-gray-400" />
                  </div>
                  <div>
                    <div className="font-bold text-white flex items-center gap-2">
                      {review.nickname}
                      {!isEditingThis && (
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={12} className={i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-600"} />
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(review.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                      {review.user_id && <span className="ml-2 text-brand-primary/60 text-[10px] uppercase tracking-wider">Verified</span>}
                    </div>
                  </div>
                </div>

                {isEditingThis ? (
                  <div className="space-y-3 mt-4 animate-in fade-in slide-in-from-top-2">
                    <select 
                      value={editRating}
                      onChange={(e) => setEditRating(Number(e.target.value))}
                      className="w-full md:w-32 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-brand-primary/50 text-sm appearance-none"
                    >
                      {[5, 4, 3, 2, 1].map(num => (
                        <option key={num} value={num} className="bg-gray-900 text-white">{num} Stars</option>
                      ))}
                    </select>
                    <textarea 
                      value={editCommentText}
                      onChange={(e) => setEditCommentText(e.target.value)}
                      className="w-full bg-black/20 border border-brand-primary/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-primary/70 transition-colors min-h-[100px] resize-y"
                      maxLength={500}
                      autoFocus
                    />
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={handleEditCancel}
                        className="px-4 py-2 text-gray-400 hover:text-white text-sm font-medium transition-colors rounded-lg hover:bg-white/5"
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={() => handleEditSubmit(review.id)}
                        disabled={isEditing || !editCommentText.trim() || editCommentText.length > 500}
                        className="px-4 py-2 bg-brand-primary hover:bg-brand-primary/80 text-white text-sm font-bold rounded-lg transition-all disabled:opacity-50"
                      >
                        {isEditing ? 'Saving...' : 'Save Changes'}
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-300 whitespace-pre-wrap leading-relaxed text-sm pl-1">
                    {review.comment_text}
                  </p>
                )}
              </div>
            );
          })
        )}
      </div>

      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
    </section>
  );
};
