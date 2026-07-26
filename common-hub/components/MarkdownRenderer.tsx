import React, { useState } from 'react';
import { Lock } from 'lucide-react';

interface MarkdownRendererProps {
  content: string;
}

const SpoilerSpan: React.FC<{ content: string }> = ({ content }) => {
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <span
      onClick={(e) => {
        e.stopPropagation();
        setIsRevealed(!isRevealed);
      }}
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 mx-1 rounded cursor-pointer transition-all duration-200 font-mono text-xs md:text-sm ${
        isRevealed
          ? 'bg-white/10 text-white border border-white/20'
          : 'bg-gray-800 text-gray-400 border border-gray-700/50 hover:bg-gray-700/80 hover:text-gray-300 select-none'
      }`}
      title={isRevealed ? 'Click to hide spoiler' : 'Click to reveal spoiler'}
    >
      {!isRevealed && <Lock size={12} className="shrink-0" />}
      <span>{isRevealed ? content : '미리 보기 차단'}</span>
    </span>
  );
};

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  if (!content) return null;

  const renderItalic = (text: string): React.ReactNode[] => {
    const parts = text.split(/(\*(?:[^\*\s][\s\S]*?[^\*\s]|\S)\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
        return (
          <em key={`italic-${index}`} className="italic text-gray-200">
            {part.slice(1, -1)}
          </em>
        );
      }
      return part;
    });
  };

  const renderBold = (text: string): React.ReactNode[] => {
    const parts = text.split(/(\*\*[\s\S]+?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
        return (
          <strong
            key={`bold-${index}`}
            className="font-bold text-white"
          >
            {renderItalic(part.slice(2, -2))}
          </strong>
        );
      }
      return renderItalic(part);
    });
  };

  const renderLinks = (text: string): React.ReactNode[] => {
    const urlRegex = /(https?:\/\/[^\s<]+)/g;
    const parts = text.split(urlRegex);
    return parts.map((part, index) => {
      if (urlRegex.test(part)) {
        return (
          <a
            key={`link-${index}`}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-primary underline hover:opacity-80 break-all transition-opacity"
            onClick={(e) => e.stopPropagation()}
          >
            {part}
          </a>
        );
      }
      return renderBold(part);
    });
  };

  const renderText = (text: string): React.ReactNode[] => {
    // Parse Spoilers first: ||spoiler|| or <span data-spoiler="true"...>spoiler</span>
    const spoilerRegex = /(\|\|[\s\S]+?\|\||<span data-spoiler="true"[^>]*>[\s\S]+?<\/span>)/g;
    const parts = text.split(spoilerRegex);

    return parts.map((part, index) => {
      if (part.startsWith('||') && part.endsWith('||') && part.length > 4) {
        return <SpoilerSpan key={`spoiler-${index}`} content={part.slice(2, -2)} />;
      }
      if (part.startsWith('<span data-spoiler="true"')) {
        // Extract content between > and </span>
        const contentMatch = part.match(/>([\s\S]+?)<\/span>$/);
        if (contentMatch) {
          return <SpoilerSpan key={`spoiler-${index}`} content={contentMatch[1]} />;
        }
      }
      return renderLinks(part);
    });
  };

  const lines = content.split('\n');
  const renderedElements: React.ReactNode[] = [];
  let inList = false;
  let listItems: string[] = [];

  const flushList = (key: number) => {
    if (listItems.length > 0) {
      const listElement = (
        <ul key={`list-${key}`} className="list-disc pl-6 my-4 space-y-2 text-gray-300">
          {listItems.map((item, idx) => (
            <li key={idx} className="leading-relaxed text-sm md:text-base">
              {renderText(item)}
            </li>
          ))}
        </ul>
      );
      listItems = [];
      inList = false;
      return listElement;
    }
    return null;
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Blockquote parsing
    const bqMatch = line.match(/^> (.*)$/) || line.match(/^>(.*)$/);
    if (bqMatch) {
      if (inList) {
        const list = flushList(i);
        if (list) renderedElements.push(list);
      }
      const quoteText = bqMatch[1];
      renderedElements.push(
        <blockquote
          key={`quote-${i}`}
          className="border-l-4 border-brand-primary/60 bg-white/[0.03] pl-4 py-2 my-2 italic text-gray-300 rounded-r-lg"
        >
          {renderText(quoteText)}
        </blockquote>
      );
      continue;
    }

    // List item parsing
    if (line.startsWith('- ') || line.startsWith('* ')) {
      inList = true;
      listItems.push(line.substring(2));
      continue;
    }

    // Flush active list if line is not a list item anymore
    if (inList && !line.startsWith('- ') && !line.startsWith('* ')) {
      const list = flushList(i);
      if (list) renderedElements.push(list);
    }

    // Empty line
    if (!line) {
      renderedElements.push(<div key={`br-${i}`} className="h-3" />);
      continue;
    }

    // Headers parsing
    if (line.startsWith('# ')) {
      renderedElements.push(
        <h1
          key={`h1-${i}`}
          className="text-2xl md:text-3xl font-black text-white italic tracking-tighter mt-8 mb-4 border-l-4 border-brand-accent pl-4 py-1 bg-gradient-to-r from-white/[0.02] to-transparent rounded-r-xl"
        >
          {renderText(line.substring(2))}
        </h1>
      );
    } else if (line.startsWith('## ')) {
      renderedElements.push(
        <h2
          key={`h2-${i}`}
          className="text-xl md:text-2xl font-black text-white italic tracking-tighter mt-6 mb-3 border-l-3 border-purple-500 pl-3 py-0.5 bg-gradient-to-r from-purple-500/5 to-transparent rounded-r-lg"
        >
          {renderText(line.substring(3))}
        </h2>
      );
    } else if (line.startsWith('### ')) {
      renderedElements.push(
        <h3 key={`h3-${i}`} className="text-lg md:text-xl font-black text-yellow-400 mt-5 mb-2 pl-1">
          {renderText(line.substring(4))}
        </h3>
      );
    } else {
      // Normal Paragraph
      renderedElements.push(
        <p key={`p-${i}`} className="text-gray-300 leading-relaxed text-sm md:text-base mb-3 whitespace-pre-wrap">
          {renderText(line)}
        </p>
      );
    }
  }

  // Flush remaining lists at EOF
  if (inList) {
    const list = flushList(lines.length);
    if (list) renderedElements.push(list);
  }

  return (
    <div className="markdown-body space-y-1 selection:bg-brand-primary selection:text-white font-sans text-gray-300">
      {renderedElements}
    </div>
  );
};

export default MarkdownRenderer;

