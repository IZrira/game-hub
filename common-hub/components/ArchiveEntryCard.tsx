import React from 'react';
import { ArrowRight } from 'lucide-react';

interface ArchiveEntryCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: 'magenta' | 'cyan';
  link: string;
}

const ArchiveEntryCard: React.FC<ArchiveEntryCardProps> = ({ title, description, icon, color, link }) => {
  const theme = {
    magenta: {
      text: 'text-magenta-400',
      border: 'border-magenta-500/50',
      glow: 'hover:shadow-[0_0_40px_-5px_rgba(255,0,234,0.3)] hover:border-magenta-400',
      iconBg: 'group-hover:bg-magenta-950',
      iconColor: 'group-hover:text-magenta-300',
      dot: 'bg-magenta-500'
    },
    cyan: {
      text: 'text-cyan-400',
      border: 'border-cyan-500/50',
      glow: 'hover:shadow-[0_0_40px_-5px_rgba(0,242,255,0.3)] hover:border-cyan-400',
      iconBg: 'group-hover:bg-cyan-950',
      iconColor: 'group-hover:text-cyan-300',
      dot: 'bg-cyan-500'
    }
  };

  const currentTheme = theme[color];

  return (
    <a href={link} className={`group relative w-full p-8 rounded-3xl border-2 ${currentTheme.border} ${currentTheme.glow} transition-all duration-500 ease-out cursor-pointer overflow-hidden bg-black/40 backdrop-blur-xl flex flex-col justify-between min-h-[320px]`}>
      <div>
        <div className="flex justify-between items-start mb-10">
          <div className={`p-4 rounded-2xl bg-gray-950 border border-white/5 ${currentTheme.text} transition-all duration-500 group-hover:scale-110 shadow-inner`}>
            {icon}
          </div>
          <span className="text-[9px] text-gray-600 font-mono tracking-[0.3em] uppercase opacity-50">
            SECURED // ACCESS
          </span>
        </div>

        <div className="mb-8">
          <h3 className="text-2xl font-black text-white tracking-tighter mb-3 flex items-center gap-3">
            {title}
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${currentTheme.dot} opacity-40`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${currentTheme.dot}`}></span>
            </span>
          </h3>
          <p className="text-gray-500 text-sm leading-relaxed font-bold">
            {description}
          </p>
        </div>
      </div>

      <div className="flex justify-end items-center gap-3 text-[10px] text-gray-600 font-black tracking-widest uppercase">
        <span className="group-hover:text-white transition-colors duration-300">Enter Archive</span>
        <div className={`p-3 rounded-full bg-gray-950 border border-white/5 transition-all duration-500 ${currentTheme.iconBg}`}>
          <ArrowRight className={`transition-colors duration-500 ${currentTheme.iconColor}`} size={16} />
        </div>
      </div>

      {/* Decorative background glow */}
      <div className={`absolute -bottom-16 -left-16 w-48 h-48 ${color === 'magenta' ? 'bg-magenta-500' : 'bg-cyan-500'} rounded-full opacity-0 blur-[100px] group-hover:opacity-10 transition-opacity duration-1000`} />
    </a>
  );
};

export default ArchiveEntryCard;
