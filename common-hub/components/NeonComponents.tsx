import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

// 네온 디바이더 컴포넌트
export const NeonDivider: React.FC = () => (
  <div className="neon-divider animate-pulse" />
);

interface GlowStatsProps {
  data: any[];
  type: 'attribute' | 'path' | 'element';
  title: string;
}

// 속성/운명의길 분포 시각화 컴포넌트 (Glow-Stats Distribution)
export const GlowStatsDistribution: React.FC<GlowStatsProps> = ({ data, type, title }) => {
  const { t } = useTranslation();

  const stats = useMemo(() => {
    const counts: Record<string, number> = {};
    const safeData = data || [];
    
    safeData.forEach(item => {
      const val = item[type];
      if (val) counts[val] = (counts[val] || 0) + 1;
    });

    const total = safeData.length || 1;
    return Object.entries(counts)
      .map(([name, count]) => ({
        name,
        count,
        percentage: (count / total) * 100
      }))
      .sort((a, b) => b.count - a.count);
  }, [data, type]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-1 h-4 bg-brand-primary neon-cyan shadow-[0_0_10px_#00f2ff]" />
        <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">{t(title)}</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="space-y-1.5 group cursor-default">
            <div className="flex justify-between items-end px-1">
              <span className="text-[10px] font-black text-gray-300 group-hover:neon-cyan transition-all">{t(stat.name)}</span>
              <span className="text-[10px] font-black text-gray-500 italic">{stat.count}</span>
            </div>
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${stat.percentage}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeOut", delay: idx * 0.1 }}
                className={`h-full ${idx % 2 === 0 ? 'bg-gradient-to-r from-cyan-600 to-[#00f2ff]' : 'bg-gradient-to-r from-magenta-600 to-[#ff00ea]'} shadow-[0_0_8px_currentColor]`}
                style={{ color: idx % 2 === 0 ? '#00f2ff' : '#ff00ea' }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
