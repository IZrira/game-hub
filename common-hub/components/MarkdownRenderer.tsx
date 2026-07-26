import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Lock } from 'lucide-react';

interface MarkdownRendererProps {
  content: string;
}

const SpoilerSpan: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <span
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsRevealed(!isRevealed);
      }}
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 mx-1 rounded cursor-pointer transition-all duration-200 text-sm ${
        isRevealed
          ? 'bg-white/10 text-white border border-white/20'
          : 'bg-gray-800 text-gray-400 border border-gray-700/50 hover:bg-gray-700/80 hover:text-gray-300 select-none'
      }`}
      title={isRevealed ? 'Click to hide spoiler' : 'Click to reveal spoiler'}
    >
      {!isRevealed && <Lock size={12} className="shrink-0" />}
      <span>{isRevealed ? children : '미리 보기 차단'}</span>
    </span>
  );
};

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  if (!content) return null;

  // Preprocess custom spoilers (||text|| or <span data-spoiler="true">...</span>)
  // Convert them into standard markdown links pointing to #spoiler
  const processedContent = content
    .replace(/<span data-spoiler="true"[^>]*>([\s\S]+?)<\/span>/g, '||$1||')
    .replace(/\|\|([\s\S]+?)\|\|/g, '[$1](#spoiler)');

  return (
    <div className="markdown-body font-sans text-gray-300 selection:bg-brand-primary selection:text-white [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ node, href, children, ...props }) => {
            if (href === '#spoiler') {
              return <SpoilerSpan>{children}</SpoilerSpan>;
            }
            return (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-primary underline hover:opacity-80 break-all transition-opacity"
                onClick={(e) => e.stopPropagation()}
                {...props}
              >
                {children}
              </a>
            );
          },
          h1: ({ node, children, ...props }) => (
            <h1
              className="text-2xl md:text-3xl font-black text-white italic tracking-tighter mt-8 mb-4 border-l-4 border-brand-accent pl-4 py-1 bg-gradient-to-r from-white/[0.02] to-transparent rounded-r-xl"
              {...props}
            >
              {children}
            </h1>
          ),
          h2: ({ node, children, ...props }) => (
            <h2
              className="text-xl md:text-2xl font-black text-white italic tracking-tighter mt-6 mb-3 border-l-3 border-purple-500 pl-3 py-0.5 bg-gradient-to-r from-purple-500/5 to-transparent rounded-r-lg"
              {...props}
            >
              {children}
            </h2>
          ),
          h3: ({ node, children, ...props }) => (
            <h3 className="text-lg md:text-xl font-black text-yellow-400 mt-5 mb-2 pl-1" {...props}>
              {children}
            </h3>
          ),
          blockquote: ({ node, children, ...props }) => (
            <blockquote
              className="border-l-4 border-brand-primary/60 bg-white/[0.03] pl-4 py-2 my-2 italic text-gray-300 rounded-r-lg"
              {...props}
            >
              {children}
            </blockquote>
          ),
          p: ({ node, children, ...props }) => (
            <p className="leading-relaxed text-sm md:text-base mb-3 whitespace-pre-wrap" {...props}>
              {children}
            </p>
          ),
          ul: ({ node, children, ...props }) => (
            <ul className="my-4 space-y-2" {...props}>
              {children}
            </ul>
          ),
          ol: ({ node, children, ...props }) => (
            <ol className="my-4 space-y-2" {...props}>
              {children}
            </ol>
          ),
          li: ({ node, children, ...props }) => (
            <li className="leading-relaxed text-sm md:text-base" {...props}>
              {children}
            </li>
          ),
          strong: ({ node, children, ...props }) => (
            <strong className="font-bold text-white" {...props}>
              {children}
            </strong>
          ),
          em: ({ node, children, ...props }) => (
            <em className="italic text-gray-200" {...props}>
              {children}
            </em>
          ),
          img: ({ node, ...props }) => (
            <img className="max-w-full h-auto rounded-xl my-4 border border-white/10" {...props} />
          ),
        }}
      >
        {processedContent}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
