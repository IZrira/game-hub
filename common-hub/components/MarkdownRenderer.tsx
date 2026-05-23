import React from 'react';

interface MarkdownRendererProps {
  content: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  if (!content) return null;

  // Simple, robust markdown parsing and JSX transformation
  const lines = content.split('\n');
  const renderedElements: React.ReactNode[] = [];
  let inList = false;
  let listItems: string[] = [];

  const renderText = (text: string) => {
    // **bold** parser
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={index} className="text-yellow-400 font-extrabold drop-shadow-[0_0_8px_rgba(234,179,8,0.2)]">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

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
        <h1 key={`h1-${i}`} className="text-2xl md:text-3xl font-black text-white italic tracking-tighter mt-8 mb-4 border-l-4 border-brand-accent pl-4 py-1 bg-gradient-to-r from-white/[0.02] to-transparent rounded-r-xl">
          {renderText(line.substring(2))}
        </h1>
      );
    } else if (line.startsWith('## ')) {
      renderedElements.push(
        <h2 key={`h2-${i}`} className="text-xl md:text-2xl font-black text-white italic tracking-tighter mt-6 mb-3 border-l-3 border-purple-500 pl-3 py-0.5 bg-gradient-to-r from-purple-500/5 to-transparent rounded-r-lg">
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
