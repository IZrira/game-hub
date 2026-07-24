import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Trash2, Star, User, MessageSquare } from 'lucide-react';

interface Review {
  id: string;
  created_at: string;
  nickname: string;
  rating: number;
  comment_text: string;
}

interface Props {
  characterId: string;
  gameId: string;
}

export const CharacterReviewBoard: React.FC<Props> = ({ characterId, gameId }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [nickname, setNickname] = useState('');
  const [rating, setRating] = useState(5);
  const [commentText, setCommentText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || commentText.length > 500) return;
    
    setIsSubmitting(true);
    try {
      if (!supabase) throw new Error("Supabase not initialized");
      
      const newReview = {
        game_id: gameId,
        character_id: characterId,
        nickname: nickname.trim() || 'Anonymous',
        rating,
        comment_text: commentText.trim()
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
      setNickname('');
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
      if (!supabase) throw new Error("Supabase not initialized");
      
      const { error } = await supabase
        .from('character_reviews')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setReviews(reviews.filter(r => r.id !== id));
    } catch (err) {
      console.error("Failed to delete review:", err);
      alert("Failed to delete review.");
    }
  };

  if (error) {
    return (
      <div className="mt-12 p-6 rounded-[35px] bg-red-500/10 border border-red-500/20 text-center">
        <p className="text-red-400 font-medium">{error}</p>
      </div>
    );
  }

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
              <label className="block text-[11px] font-black text-gray-500 uppercase tracking-widest mb-2">Nickname</label>
              <input 
                type="text" 
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="Anonymous"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-primary/50 transition-colors placeholder:text-gray-600"
                maxLength={30}
              />
            </div>
            <div className="w-full md:w-32">
              <label className="block text-[11px] font-black text-gray-500 uppercase tracking-widest mb-2">Rating</label>
              <select 
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-primary/50 transition-colors appearance-none"
              >
                {[5, 4, 3, 2, 1].map(num => (
                  <option key={num} value={num} className="bg-gray-900 text-white">{num} Stars</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-[11px] font-black text-gray-500 uppercase tracking-widest mb-2">Your Review</label>
            <textarea 
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Share your thoughts about this character... (max 500 characters)"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-primary/50 transition-colors min-h-[100px] resize-y placeholder:text-gray-600"
              maxLength={500}
              required
            />
            <div className="flex justify-between items-center mt-2">
              <span className={`text-xs ${commentText.length > 500 ? 'text-red-400' : 'text-gray-500'}`}>
                {commentText.length} / 500
              </span>
              <button 
                type="submit" 
                disabled={isSubmitting || !commentText.trim() || commentText.length > 500}
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
          reviews.map(review => (
            <div key={review.id} className="glass-card p-6 rounded-[30px] border border-white/5 group hover:bg-white/[0.04] transition-colors relative bg-white/[0.01]">
              <button 
                onClick={() => handleDelete(review.id)}
                className="absolute top-6 right-6 p-2 text-gray-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all rounded-lg hover:bg-red-400/10"
                title="Delete comment"
              >
                <Trash2 size={16} />
              </button>
              
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center border border-white/10">
                  <User size={16} className="text-gray-400" />
                </div>
                <div>
                  <div className="font-bold text-white flex items-center gap-2">
                    {review.nickname}
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} className={i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-600"} />
                      ))}
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(review.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                  </div>
                </div>
              </div>
              <p className="text-gray-300 whitespace-pre-wrap leading-relaxed text-sm pl-1">
                {review.comment_text}
              </p>
            </div>
          ))
        )}
      </div>
    </section>
  );
};
