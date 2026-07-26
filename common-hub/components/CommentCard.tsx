import React, { useState } from 'react';
import { Trash2, Edit3, Star, User as UserIcon, Reply, ChevronDown, ChevronUp, Pin, Flag, AlertTriangle } from 'lucide-react';
import { User } from '@supabase/supabase-js';
import UpvoteButton from './UpvoteButton';
import CommentForm from './CommentForm';
import MarkdownRenderer from './MarkdownRenderer';

export interface Review {
  id: string;
  created_at: string;
  game_id: string;
  character_id: string;
  nickname: string;
  rating: number;
  comment_text: string;
  user_id?: string;
  parent_id?: string | null;
  upvotes_count?: number;
  user_has_upvoted?: boolean;
  media_urls?: string[];
  like_count?: number;
  report_count?: number;
  is_pinned?: boolean;
  user_has_reported?: boolean;
  updated_at?: string;
  author_is_admin?: boolean;
}

interface CommentCardProps {
  review: Review;
  repliesMap: Map<string, Review[]>;
  user: User | null;
  onToggleUpvote: (commentId: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onEdit: (id: string, text: string, rating: number, mediaUrls?: string[]) => Promise<void>;
  onPostReply: (parentId: string, text: string, mediaUrls?: string[]) => Promise<void>;
  onTogglePin?: (commentId: string, currentPinned: boolean) => Promise<void>;
  onReport?: (commentId: string) => Promise<void>;
  onRequireAuth: () => void;
  isAdmin?: boolean;
  level?: number;
}

export const CommentCard: React.FC<CommentCardProps> = ({
  review,
  repliesMap,
  user,
  onToggleUpvote,
  onDelete,
  onEdit,
  onPostReply,
  onTogglePin,
  onReport,
  onRequireAuth,
  isAdmin = false,
  level = 0,
}) => {
  const [isReplying, setIsReplying] = useState(false);
  const [isReplyingSubmitting, setIsReplyingSubmitting] = useState(false);
  const [isEditingThis, setIsEditingThis] = useState(false);
  const [editRating, setEditRating] = useState(review.rating || 5);
  const [editCommentText, setEditCommentText] = useState(review.comment_text);
  const [editMediaUrls, setEditMediaUrls] = useState<string[]>(review.media_urls || []);
  const [isEditingSubmitting, setIsEditingSubmitting] = useState(false);
  const [isThreadExpanded, setIsThreadExpanded] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const directReplies = repliesMap.get(review.id) || [];
  const isOwnReview = Boolean(user && review.user_id === user.id);
  const isBlinded = (review.report_count || 0) >= 3;

  const handleReplySubmit = async (text: string, _rating: number, mediaUrls?: string[]) => {
    setIsReplyingSubmitting(true);
    try {
      await onPostReply(review.id, text, mediaUrls);
      setIsReplying(false);
    } finally {
      setIsReplyingSubmitting(false);
    }
  };

  const handleEditSubmit = async (text: string, rating: number, mediaUrls?: string[]) => {
    if ((!text.trim() && (!mediaUrls || mediaUrls.length === 0)) || text.length > 500) return;
    setIsEditingSubmitting(true);
    try {
      await onEdit(review.id, text.trim(), rating, mediaUrls);
      setIsEditingThis(false);
    } finally {
      setIsEditingSubmitting(false);
    }
  };

  const handleReplyClick = () => {
    if (!user) {
      onRequireAuth();
      return;
    }
    setIsReplying(!isReplying);
  };

  const handleReportClick = () => {
    if (!user) {
      onRequireAuth();
      return;
    }
    if (review.user_has_reported) return;
    if (onReport) {
      onReport(review.id);
    }
  };

  const handlePinClick = () => {
    if (onTogglePin) {
      onTogglePin(review.id, !!review.is_pinned);
    }
  };

  // Depth capping: visual line indentation capped at depth 4 max
  const visualLevel = Math.min(level, 4);
  const indentClass = level > 0 ? 'ml-3 md:ml-6 pl-3 md:pl-4 border-l-2 border-brand-primary/20' : '';

  return (
    <div className={`space-y-3 ${indentClass}`}>
      <div
        className={`glass-card p-5 md:p-6 rounded-[28px] border group transition-all relative ${
          review.is_pinned
            ? 'border-brand-primary/40 bg-gradient-to-br from-brand-primary/[0.08] to-transparent shadow-lg shadow-brand-primary/5'
            : 'border-white/5 bg-white/[0.01] hover:bg-white/[0.03]'
        } ${isEditingThis ? 'ring-1 ring-brand-primary/50' : ''}`}
      >
        {/* Pinned Badge */}
        {review.is_pinned && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-primary/20 border border-brand-primary/30 text-brand-primary text-xs font-bold mb-3">
            <Pin size={12} className="rotate-45" />
            <span>📌 고정된 댓글</span>
          </div>
        )}

        {/* Action icons (Edit / Delete / Pin) */}
        <div className="absolute top-5 right-5 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all z-10">
          {isAdmin && onTogglePin && (
            <button
              onClick={handlePinClick}
              className={`p-1.5 rounded-lg transition-colors ${
                review.is_pinned
                  ? 'text-brand-primary bg-brand-primary/10'
                  : 'text-gray-400 hover:text-brand-primary hover:bg-white/10'
              }`}
              title={review.is_pinned ? 'Unpin comment' : 'Pin comment'}
            >
              <Pin size={15} className={review.is_pinned ? 'rotate-45' : ''} />
            </button>
          )}
          {isOwnReview && !isEditingThis && (
            <>
              <button
                onClick={() => {
                  setEditRating(review.rating || 5);
                  setEditCommentText(review.comment_text);
                  setEditMediaUrls(review.media_urls || []);
                  setIsEditingThis(true);
                }}
                className="p-1.5 text-gray-400 hover:text-brand-primary rounded-lg hover:bg-brand-primary/10 transition-colors"
                title="Edit comment"
              >
                <Edit3 size={15} />
              </button>
              <button
                onClick={() => onDelete(review.id)}
                className="p-1.5 text-gray-400 hover:text-red-400 rounded-lg hover:bg-red-400/10 transition-colors"
                title="Delete comment"
              >
                <Trash2 size={15} />
              </button>
            </>
          )}
        </div>

        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center border border-white/10 overflow-hidden shrink-0">
            <UserIcon size={15} className="text-gray-400" />
          </div>
          <div>
            <div className="font-bold text-white text-sm flex items-center gap-2">
              {review.nickname}
              {review.author_is_admin && (
                <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-amber-500/20 text-amber-500 border border-amber-500/30 font-black tracking-widest uppercase">
                  관리자
                </span>
              )}
              {isOwnReview && !review.author_is_admin && (
                <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-brand-primary/20 text-brand-primary border border-brand-primary/30 font-black tracking-widest uppercase">
                  작성자
                </span>
              )}
              {!isEditingThis && !isBlinded && review.rating > 0 && (
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={11}
                      className={
                        i < review.rating
                          ? 'text-yellow-500 fill-yellow-500'
                          : 'text-gray-600'
                      }
                    />
                  ))}
                </div>
              )}
            </div>
            <div className="text-[11px] text-gray-500 flex items-center gap-2">
              <span>
                {new Date(review.created_at).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </span>
              {review.user_id && (
                <span className="text-brand-primary/60 text-[9px] uppercase tracking-wider font-bold">
                  Verified
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Content Body */}
        {isEditingThis ? (
          <div className="mt-3 animate-in fade-in slide-in-from-top-2">
            <CommentForm
              onSubmit={handleEditSubmit}
              isSubmitting={isEditingSubmitting}
              user={user}
              onRequireAuth={onRequireAuth}
              placeholder="Edit your comment..."
              buttonLabel="Save Changes"
              showRating={level === 0}
              initialRating={editRating}
              initialText={editCommentText}
              initialMediaUrls={editMediaUrls}
              onCancel={() => setIsEditingThis(false)}
            />
          </div>
        ) : isBlinded ? (
          /* Auto-blind comment box with exact Korean text requirement */
          <div className="my-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3 text-red-400 text-xs md:text-sm font-medium">
            <AlertTriangle size={18} className="shrink-0 text-red-400" />
            <span>유저들의 신고로 숨김 처리된 댓글입니다</span>
          </div>
        ) : (
          <div className="space-y-3 my-2">
            <MarkdownRenderer content={review.comment_text} />

            {/* Media Attachments Gallery */}
            {review.media_urls && review.media_urls.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {review.media_urls.map((url, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedImage(url)}
                    className="w-20 h-20 md:w-24 md:h-24 rounded-xl border border-white/10 overflow-hidden cursor-pointer bg-black/40 hover:opacity-90 hover:scale-[1.02] transition-all"
                  >
                    <img
                      src={url}
                      alt={`Attachment ${idx + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://via.placeholder.com/150?text=Invalid+Image';
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Footer Actions Bar */}
        <div className="flex items-center gap-3 mt-4 pt-2 border-t border-white/5">
          <UpvoteButton
            commentId={review.id}
            upvotesCount={review.upvotes_count || review.like_count || 0}
            userHasUpvoted={!!review.user_has_upvoted}
            onToggleUpvote={onToggleUpvote}
          />

          <button
            onClick={handleReplyClick}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-gray-400 hover:text-white hover:bg-white/5 transition-colors border border-transparent"
          >
            <Reply size={14} />
            <span>Reply</span>
          </button>

          {/* Report Button */}
          {onReport && (
            <button
              onClick={handleReportClick}
              disabled={!!review.user_has_reported}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                review.user_has_reported
                  ? 'text-red-400/60 bg-red-500/10 cursor-not-allowed'
                  : 'text-gray-400 hover:text-red-400 hover:bg-red-400/10'
              }`}
              title={review.user_has_reported ? 'Already reported' : 'Report comment'}
            >
              <Flag size={13} className={review.user_has_reported ? 'fill-red-400/60' : ''} />
              <span>{review.user_has_reported ? '신고됨' : '신고'}</span>
            </button>
          )}

          {directReplies.length > 0 && (
            <button
              onClick={() => setIsThreadExpanded(!isThreadExpanded)}
              className="inline-flex items-center gap-1 text-xs font-bold text-brand-primary/80 hover:text-brand-primary ml-auto transition-colors"
            >
              <span>
                {directReplies.length} {directReplies.length === 1 ? 'reply' : 'replies'}
              </span>
              {isThreadExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
          )}
        </div>

        {/* Reply Form */}
        {isReplying && (
          <div className="mt-4 pt-4 border-t border-white/5">
            <CommentForm
              onSubmit={handleReplySubmit}
              isSubmitting={isReplyingSubmitting}
              user={user}
              onRequireAuth={onRequireAuth}
              placeholder={`Replying to @${review.nickname}...`}
              buttonLabel="Post Reply"
              showRating={false}
              onCancel={() => setIsReplying(false)}
            />
          </div>
        )}
      </div>

      {/* Image Modal Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-3xl max-h-[85vh] rounded-2xl overflow-hidden border border-white/10">
            <img src={selectedImage} alt="Attachment full preview" className="max-w-full max-h-[85vh] object-contain" />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-3 right-3 px-3 py-1 bg-black/70 text-white rounded-full text-xs font-bold hover:bg-white hover:text-black transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Nested Replies */}
      {isThreadExpanded && directReplies.length > 0 && (
        <div className="space-y-3 mt-2">
          {directReplies.map((reply) => (
            <CommentCard
              key={reply.id}
              review={reply}
              repliesMap={repliesMap}
              user={user}
              onToggleUpvote={onToggleUpvote}
              onDelete={onDelete}
              onEdit={onEdit}
              onPostReply={onPostReply}
              onTogglePin={onTogglePin}
              onReport={onReport}
              onRequireAuth={onRequireAuth}
              isAdmin={isAdmin}
              level={visualLevel + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentCard;

