import React, { useState, useRef, useEffect } from 'react';
import { Bold, Italic, Quote, Image as ImageIcon, X, Plus, Upload, Heading1, Heading2, Heading3, Minus } from 'lucide-react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Image from '@tiptap/extension-image';
import { Markdown } from 'tiptap-markdown';
import imageCompression from 'browser-image-compression';
import { supabase } from '../lib/supabase';

interface AdminNoticeEditorProps {
  initialContent: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

export const AdminNoticeEditor: React.FC<AdminNoticeEditorProps> = ({
  initialContent,
  onChange,
  placeholder = '공지사항 내용을 마크다운 형식으로 작성하세요...',
}) => {
  const [showImageInput, setShowImageInput] = useState(false);
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [mediaUrls, setMediaUrls] = useState<string[]>([]);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder,
      }),
      Image,
      Markdown.configure({
        html: true,
        transformPastedText: true,
      }),
    ],
    content: initialContent,
    onUpdate: ({ editor }) => {
      // @ts-expect-error markdown extension storage type is not automatically inferred
      const md = editor.storage.markdown.getMarkdown();
      onChange(md);
    },
    editorProps: {
      attributes: {
        class:
          'w-full bg-black/40 border border-white/5 rounded-2xl p-4 text-sm font-bold text-white outline-none focus:border-amber-500/50 transition-colors min-h-[200px] ' +
          '[&_p]:m-0 [&_p]:min-h-[1.25rem] [&_strong]:font-bold [&_strong]:text-white [&_em]:italic ' +
          '[&_blockquote]:border-l-4 [&_blockquote]:border-amber-500/60 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-gray-300 [&_blockquote]:bg-amber-500/[0.03] [&_blockquote]:py-1 [&_blockquote]:my-1 ' +
          '[&_h1]:text-2xl [&_h1]:font-black [&_h1]:my-4 ' +
          '[&_h2]:text-xl [&_h2]:font-bold [&_h2]:my-3 ' +
          '[&_h3]:text-lg [&_h3]:font-bold [&_h3]:my-2 ' +
          '[&_hr]:my-4 [&_hr]:border-white/20',
      },
    },
  });

  useEffect(() => {
    // @ts-expect-error markdown extension storage type is not automatically inferred
    if (editor && initialContent !== editor.storage.markdown.getMarkdown()) {
      editor.commands.setContent(initialContent);
    }
  }, [initialContent, editor]);

  const insertImageToEditor = (url: string) => {
    if (editor) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setIsUploading(true);
    try {
      const options = {
        maxSizeMB: 2,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
        fileType: 'image/webp'
      };
      
      const compressedFile = await imageCompression(file, options);
      const fileName = `notice_${Math.random().toString(36).substring(2, 15)}_${Date.now()}.webp`;
      const filePath = `notices/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('admin-media')
        .upload(filePath, compressedFile);

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from('admin-media').getPublicUrl(filePath);

      setMediaUrls([...mediaUrls, publicUrl]);
      insertImageToEditor(publicUrl);
      setShowImageInput(false);
    } catch (err) {
      console.error('Upload error:', err);
      alert('이미지 업로드에 실패했습니다. admin-media 버킷과 권한을 확인해주세요.');
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
    setMediaUrls([...mediaUrls, trimmed]);
    insertImageToEditor(trimmed);
    setImageUrlInput('');
    setShowImageInput(false);
  };

  return (
    <div className="space-y-2 relative">
      <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-xl p-2 overflow-x-auto">
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`p-1.5 rounded-lg transition-colors text-xs font-bold ${
            editor?.isActive('heading', { level: 1 })
              ? 'text-amber-500 bg-amber-500/10'
              : 'text-gray-400 hover:text-white hover:bg-white/10'
          }`}
          title="제목 1 (H1)"
        >
          <Heading1 size={14} />
        </button>
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-1.5 rounded-lg transition-colors text-xs font-bold ${
            editor?.isActive('heading', { level: 2 })
              ? 'text-amber-500 bg-amber-500/10'
              : 'text-gray-400 hover:text-white hover:bg-white/10'
          }`}
          title="제목 2 (H2)"
        >
          <Heading2 size={14} />
        </button>
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`p-1.5 rounded-lg transition-colors text-xs font-bold ${
            editor?.isActive('heading', { level: 3 })
              ? 'text-amber-500 bg-amber-500/10'
              : 'text-gray-400 hover:text-white hover:bg-white/10'
          }`}
          title="제목 3 (H3)"
        >
          <Heading3 size={14} />
        </button>

        <div className="w-[1px] h-4 bg-white/10 mx-1" />

        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleBold().run()}
          className={`p-1.5 rounded-lg transition-colors text-xs font-bold ${
            editor?.isActive('bold')
              ? 'text-amber-500 bg-amber-500/10'
              : 'text-gray-400 hover:text-white hover:bg-white/10'
          }`}
          title="굵게 (Bold)"
        >
          <Bold size={14} />
        </button>
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          className={`p-1.5 rounded-lg transition-colors text-xs italic ${
            editor?.isActive('italic')
              ? 'text-amber-500 bg-amber-500/10'
              : 'text-gray-400 hover:text-white hover:bg-white/10'
          }`}
          title="기울임 (Italic)"
        >
          <Italic size={14} />
        </button>
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleBlockquote().run()}
          className={`p-1.5 rounded-lg transition-colors text-xs ${
            editor?.isActive('blockquote')
              ? 'text-amber-500 bg-amber-500/10'
              : 'text-gray-400 hover:text-white hover:bg-white/10'
          }`}
          title="인용 (Blockquote)"
        >
          <Quote size={14} />
        </button>

        <div className="w-[1px] h-4 bg-white/10 mx-1" />

        <button
          type="button"
          onClick={() => editor?.chain().focus().setHorizontalRule().run()}
          className="p-1.5 rounded-lg transition-colors text-xs text-gray-400 hover:text-white hover:bg-white/10"
          title="구분선 (Horizontal Rule)"
        >
          <Minus size={14} />
        </button>

        <div className="w-[1px] h-4 bg-white/10 mx-1" />

        <button
          type="button"
          onClick={() => setShowImageInput(!showImageInput)}
          className={`p-1.5 rounded-lg transition-colors text-xs ${
            showImageInput
              ? 'text-amber-500 bg-amber-500/10'
              : 'text-gray-400 hover:text-white hover:bg-white/10'
          }`}
          title="이미지 본문 삽입"
        >
          <ImageIcon size={14} />
        </button>
      </div>

      {showImageInput && (
        <div className="flex flex-col gap-3 bg-[#111] border border-white/10 rounded-xl p-4 animate-in fade-in">
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
              placeholder="외부 이미지 URL 붙여넣기..."
              className="flex-1 bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500/50"
            />
            <button
              type="button"
              onClick={handleAddMediaUrl}
              disabled={!imageUrlInput.trim()}
              className="px-3 py-2 bg-amber-500/20 hover:bg-amber-500/40 text-amber-500 hover:text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1 disabled:opacity-50"
            >
              <Plus size={14} />
              URL 추가
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-[1px] flex-1 bg-white/5"></div>
            <span className="text-[10px] text-gray-400 uppercase font-bold">또는 파일 업로드</span>
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
              disabled={isUploading}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 hover:bg-white/10 text-gray-300 hover:text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isUploading ? (
                <span className="animate-pulse flex items-center gap-2">업로드 중...</span>
              ) : (
                <>
                  <Upload size={16} />
                  내 PC에서 이미지 선택 (admin-media 업로드)
                </>
              )}
            </button>
          </div>
        </div>
      )}

      <EditorContent editor={editor} />
    </div>
  );
};

export default AdminNoticeEditor;
