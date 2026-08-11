import React, { useState, useRef, useEffect } from 'react';
import { User as UserIcon, Bold, Italic, Quote, EyeOff, Image as ImageIcon, X, Plus, Upload } from 'lucide-react';
import { User } from '@supabase/supabase-js';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { Markdown } from 'tiptap-markdown';
import { Mark, mergeAttributes } from '@tiptap/core';
import imageCompression from 'browser-image-compression';
import { supabase } from '../lib/supabase';

const SpoilerMark = Mark.create({
  name: 'spoiler',
  parseHTML() {
    return [{ tag: 'span[data-spoiler]' }];
  },
  renderHTML({ HTMLAttributes }) {
    return [
      'span',
      mergeAttributes(HTMLAttributes, {
        'data-spoiler': 'true',
        class: 'bg-gray-800 text-transparent select-none blur-[3px]',
      }),
      0,
    ];
  },
  addKeyboardShortcuts() {
    return {
      'Mod-Shift-s': () => this.editor.commands.toggleMark(this.name),
      'Mod-Shift-S': () => this.editor.commands.toggleMark(this.name),
    };
  },
});

interface CommentFormProps {
  onSubmit: (text: string, rating: number, mediaUrls?: string[]) => Promise<void>;
  isSubmitting: boolean;
  user: User | null;
  onRequireAuth: () => void;
  placeholder?: string;
  buttonLabel?: string;
  showRating?: boolean;
  initialRating?: number;
  initialText?: string;
  initialMediaUrls?: string[];
  draftKey?: string;
  onCancel?: () => void;
}

export const CommentForm: React.FC<CommentFormProps> = ({
  onSubmit,
  isSubmitting,
  user,
  onRequireAuth,
  placeholder = 'Share your thoughts...',
  buttonLabel = 'Post',
  showRating = true,
  initialRating = 5,
  initialText = '',
  initialMediaUrls = [],
  draftKey,
  onCancel,
}) => {
  const [rating, setRating] = useState(initialRating);
  const [commentText, setCommentText] = useState(initialText);
  const [mediaUrls, setMediaUrls] = useState<string[]>(initialMediaUrls);
  const [showImageInput, setShowImageInput] = useState(false);
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: user ? placeholder : 'Please login with Google or Discord to comment or reply.',
      }),
      Markdown.configure({
        html: true,
        transformPastedText: true,
      }),
      SpoilerMark,
    ],
    content: initialText,
    editable: !!user,
    onUpdate: ({ editor }) => {
      // @ts-expect-error markdown extension storage type is not automatically inferred
      const md = editor.storage.markdown.getMarkdown();
      setCommentText(md);
      if (draftKey && !initialText) {
        if (md.trim()) {
          localStorage.setItem(`draft-${draftKey}`, md);
        } else {
          localStorage.removeItem(`draft-${draftKey}`);
        }
      }
    },
    editorProps: {
      attributes: {
        class:
          'w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-brand-primary/50 transition-colors min-h-[90px] text-sm [&_p]:m-0 [&_p]:min-h-[1.25rem] [&_strong]:font-bold [&_strong]:text-white [&_em]:italic [&_blockquote]:border-l-4 [&_blockquote]:border-brand-primary/60 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-gray-300 [&_blockquote]:bg-white/[0.03] [&_blockquote]:py-1 [&_blockquote]:my-1',
      },
    },
  });

  // Re-run editable setting when user status changes
  useEffect(() => {
    if (editor) {
      editor.setEditable(!!user);
    }
  }, [user, editor]);

  // Restore draft on mount
  useEffect(() => {
    if (draftKey && !initialText && editor && !editor.isDestroyed) {
      const saved = localStorage.getItem(`draft-${draftKey}`);
      if (saved) {
        editor.commands.setContent(saved);
        setCommentText(saved);
      }
    }
  }, [draftKey, editor, initialText]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (mediaUrls.length >= 4) return;
    
    setIsUploading(true);
    try {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
        fileType: 'image/webp'
      };
      
      const compressedFile = await imageCompression(file, options);
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.webp`;
      const filePath = `reviews/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('review-media')
        .upload(filePath, compressedFile);

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from('review-media').getPublicUrl(filePath);

      setMediaUrls([...mediaUrls, publicUrl]);
      setShowImageInput(true);
    } catch (err) {
      console.error('Upload error:', err);
      alert('Failed to upload image. Please check if the bucket is created.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleAddMediaUrl = () => {
    const trimmed = imageUrlInput.trim();
    if (!trimmed) return;
    if (mediaUrls.length >= 4) return;
    setMediaUrls([...mediaUrls, trimmed]);
    setImageUrlInput('');
  };

  const handleRemoveMediaUrl = (index: number) => {
    setMediaUrls(mediaUrls.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      onRequireAuth();
      return;
    }
    
    // Allow empty text if there's an image
    const hasText = commentText.trim().length > 0;
    const hasMedia = mediaUrls.length > 0;
    if ((!hasText && !hasMedia) || commentText.length > 500) return;

    await onSubmit(commentText.trim(), rating, mediaUrls);
    
    if (draftKey && !initialText) {
      localStorage.removeItem(`draft-${draftKey}`);
    }

    if (!initialText && editor) {
      editor.commands.clearContent();
      setCommentText('');
      setRating(5);
      setMediaUrls([]);
      setShowImageInput(false);
      setImageUrlInput('');
    }
  };

  const userNickname = user
    ? user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0] || 'User'
    : 'Anonymous';
  const userAvatar = user?.user_metadata?.avatar_url;

  return (
    <div className="glass-card p-4 md:p-6 rounded-[28px] border border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent relative">
      {!user && (
        <div
          className="absolute inset-0 z-10 cursor-pointer"
          onClick={onRequireAuth}
          title="Click to log in"
        />
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">
              Posting as
            </label>
            <div className="flex items-center gap-3 w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm">
              {userAvatar ? (
                <img src={userAvatar} alt={userNickname} className="w-5 h-5 rounded-full" />
              ) : (
                <UserIcon size={16} className="text-gray-400" />
              )}
              <span className="font-bold">{userNickname}</span>
              {!user && (
                <span
                  className="text-xs text-brand-primary ml-auto font-bold cursor-pointer hover:underline"
                  onClick={onRequireAuth}
                >
                  Login required
                </span>
              )}
            </div>
          </div>

          {showRating && (
            <div className="w-full md:w-32">
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">
                Rating
              </label>
              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-primary/50 transition-colors text-sm appearance-none"
                disabled={!user}
              >
                {[5, 4, 3, 2, 1].map((num) => (
                  <option key={num} value={num} className="bg-gray-900 text-white">
                    {num} Stars
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        <div className="relative space-y-2">
          <div className="flex items-center justify-between">
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">
              Your Comment
            </label>
            {/* Tiptap Toolbar */}
            <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-lg p-1">
              <button
                type="button"
                onClick={() => editor?.chain().focus().toggleBold().run()}
                disabled={!user}
                className={`p-1 rounded transition-colors text-xs font-bold ${
                  editor?.isActive('bold')
                    ? 'text-brand-primary bg-brand-primary/10'
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                }`}
                title="굵게 (Bold) - Ctrl+B"
              >
                <Bold size={13} />
              </button>
              <button
                type="button"
                onClick={() => editor?.chain().focus().toggleItalic().run()}
                disabled={!user}
                className={`p-1 rounded transition-colors text-xs italic ${
                  editor?.isActive('italic')
                    ? 'text-brand-primary bg-brand-primary/10'
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                }`}
                title="기울임 (Italic) - Ctrl+I"
              >
                <Italic size={13} />
              </button>
              <button
                type="button"
                onClick={() => editor?.chain().focus().toggleBlockquote().run()}
                disabled={!user}
                className={`p-1 rounded transition-colors text-xs ${
                  editor?.isActive('blockquote')
                    ? 'text-brand-primary bg-brand-primary/10'
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                }`}
                title="인용 (Blockquote) - Ctrl+Shift+B"
              >
                <Quote size={13} />
              </button>
              <button
                type="button"
                onClick={() => editor?.chain().focus().toggleMark('spoiler').run()}
                disabled={!user}
                className={`p-1 rounded transition-colors text-xs flex items-center gap-0.5 ${
                  editor?.isActive('spoiler')
                    ? 'text-brand-primary bg-brand-primary/10'
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                }`}
                title="스포일러 (Spoiler) - Ctrl+Shift+S"
              >
                <EyeOff size={13} />
              </button>
              <div className="w-[1px] h-3 bg-white/10 mx-0.5" />
              <button
                type="button"
                onClick={() => setShowImageInput(!showImageInput)}
                disabled={!user}
                className={`p-1 rounded transition-colors text-xs ${
                  showImageInput || mediaUrls.length > 0
                    ? 'text-brand-primary bg-brand-primary/10'
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                }`}
                title="이미지 첨부 (Attach Image)"
              >
                <ImageIcon size={13} />
              </button>
            </div>
          </div>

          <EditorContent editor={editor} />

          {/* Media URL attachment section */}
          {showImageInput && user && (
            <div className="flex flex-col gap-2 bg-white/5 border border-white/10 rounded-xl p-3 animate-in fade-in mt-2">
              
              <div className="flex gap-2 items-center">
                <input
                  type="url"
                  value={imageUrlInput}
                  onChange={(e) => setImageUrlInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddMediaUrl();
                    }
                  }}
                  placeholder="Paste image URL..."
                  className="flex-1 bg-black/20 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-brand-primary/50"
                />
                <button
                  type="button"
                  onClick={handleAddMediaUrl}
                  disabled={!imageUrlInput.trim() || mediaUrls.length >= 4}
                  className="px-3 py-1.5 bg-brand-primary/20 hover:bg-brand-primary/40 text-brand-primary hover:text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1 disabled:opacity-50"
                >
                  <Plus size={13} />
                  Add URL
                </button>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-[1px] flex-1 bg-white/5"></div>
                <span className="text-[10px] text-gray-400 uppercase font-bold">OR</span>
                <div className="h-[1px] flex-1 bg-white/5"></div>
              </div>

              <div className="flex justify-center">
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading || mediaUrls.length >= 4}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 hover:bg-white/10 text-gray-300 hover:text-white rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1.5 disabled:opacity-50"
                >
                  {isUploading ? (
                    <span className="animate-pulse">Uploading...</span>
                  ) : (
                    <>
                      <Upload size={14} />
                      Upload from Computer
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Media URL Thumbnail Previews */}
          {mediaUrls.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {mediaUrls.map((url, idx) => (
                <div
                  key={idx}
                  className="relative group w-16 h-16 rounded-xl border border-white/10 overflow-hidden bg-black/40"
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
                  <button
                    type="button"
                    onClick={() => handleRemoveMediaUrl(idx)}
                    className="absolute top-1 right-1 bg-black/70 text-white rounded-full p-1 hover:bg-red-500 transition-colors"
                    title="Remove image"
                  >
                    <X size={10} />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-between items-center mt-2">
            <span
              className={`text-xs ${
                commentText.length > 500 ? 'text-red-400' : 'text-gray-400'
              }`}
            >
              {commentText.length} / 500
            </span>
            <div className="flex items-center gap-2">
              {onCancel && (
                <button
                  type="button"
                  onClick={onCancel}
                  className="px-4 py-1.5 text-gray-400 hover:text-white text-xs font-bold transition-colors rounded-xl hover:bg-white/5"
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                onClick={(e) => {
                  if (!user) {
                    e.preventDefault();
                    onRequireAuth();
                  }
                }}
                disabled={
                  isSubmitting ||
                  (user && commentText.length > 500) ||
                  (user && commentText.trim().length === 0 && mediaUrls.length === 0)
                }
                className="px-5 py-2 bg-brand-primary hover:bg-brand-primary/80 text-white font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider text-xs shadow-md shadow-brand-primary/20"
              >
                {isSubmitting ? 'Posting...' : buttonLabel}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
