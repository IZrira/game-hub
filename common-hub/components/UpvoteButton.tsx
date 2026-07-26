import React from 'react';
import { ThumbsUp } from 'lucide-react';

interface UpvoteButtonProps {
  commentId: string;
  upvotesCount: number;
  userHasUpvoted: boolean;
  onToggleUpvote: (commentId: string) => void;
  disabled?: boolean;
}

export const UpvoteButton: React.FC<UpvoteButtonProps> = ({
  commentId,
  upvotesCount,
  userHasUpvoted,
  onToggleUpvote,
  disabled = false,
}) => {
  return (
    <button
      onClick={() => onToggleUpvote(commentId)}
      disabled={disabled}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all active:scale-95 border ${
        userHasUpvoted
          ? 'bg-brand-primary/20 text-brand-primary border-brand-primary/40 shadow-sm shadow-brand-primary/20'
          : 'bg-white/5 text-gray-400 border-white/10 hover:text-white hover:bg-white/10'
      }`}
      title={userHasUpvoted ? 'Remove upvote' : 'Upvote comment'}
    >
      <ThumbsUp
        size={14}
        className={`transition-transform ${userHasUpvoted ? 'fill-brand-primary scale-110' : ''}`}
      />
      <span>{upvotesCount}</span>
    </button>
  );
};

export default UpvoteButton;
