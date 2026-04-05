import React from 'react';
import { CHANGELOG_DATA } from '../data/changelog';
import { Sparkles } from 'lucide-react';

const SystemChangelog = () => {
  // 최신 3개만 노출
  const recentLogs = CHANGELOG_DATA.slice(0, 3);

  return (
    <div className="space-y-8 pl-2">
      {recentLogs.map((log, index) => (
        <div key={log.date + log.title} className="relative pl-8 border-l border-white/10 group">
          {/* 타임라인 점 */}
          <div className={`absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full transition-all 
            ${index === 0 ? 'bg-brand-primary animate-pulse shadow-[0_0_10px_rgba(234,179,8,0.5)]' : 'bg-gray-700'}`} 
          />
          
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-black text-gray-500 font-mono">{log.date}</span>
              <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest border
                ${log.category === 'Update' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 
                  log.category === 'System' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' : 
                  'bg-orange-500/10 text-orange-400 border-orange-500/20'}`}>
                {log.category}
              </span>
              {log.isHot && <Sparkles size={12} className="text-yellow-500 animate-bounce" />}
            </div>
            
            <h4 className="text-base font-black text-white group-hover:text-brand-primary transition-colors">{log.title}</h4>
            
            <ul className="space-y-1.5 mt-2">
              {log.content.map((item, i) => (
                <li key={i} className="text-xs text-gray-400 flex gap-2 leading-relaxed">
                  <span className="text-brand-primary opacity-50">-</span> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SystemChangelog;