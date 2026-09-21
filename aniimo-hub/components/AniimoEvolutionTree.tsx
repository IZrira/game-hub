import React, { useMemo } from 'react';
import { Link } from 'react-router';
import { ChevronRight, GitBranch } from 'lucide-react';
import type { AniimoEntry, AniimoEvolutionNode } from '../types';
import aniimoData from '../data/aniimo.json';

const allAniimos = aniimoData as AniimoEntry[];
const aniimoMap = new Map<string, AniimoEntry>();
allAniimos.forEach(a => {
  aniimoMap.set(a.name, a);
  aniimoMap.set(a.number, a);
});

interface AniimoEvolutionTreeProps {
  currentName: string;
  currentFormKey?: string;
  nodes: AniimoEvolutionNode[];
}

export const AniimoEvolutionTree: React.FC<AniimoEvolutionTreeProps> = ({
  currentName,
  currentFormKey = 'basic-form',
  nodes
}) => {
  // Stage sequence definition
  const STAGE_ORDER = ['유년기', '성장기', '성숙기'];

  // Group nodes by stage
  const stages = useMemo(() => {
    const stageMap = new Map<string, Array<{ node: AniimoEvolutionNode; entry?: AniimoEntry }>>();
    
    nodes.forEach(node => {
      const stageName = node.stage || '기타';
      if (!stageMap.has(stageName)) {
        stageMap.set(stageName, []);
      }
      const entry = aniimoMap.get(node.name) || (node.number ? aniimoMap.get(node.number) : undefined);
      stageMap.get(stageName)!.push({ node, entry });
    });

    // Sort by canonical stage order
    return Array.from(stageMap.entries()).sort((a, b) => {
      const idxA = STAGE_ORDER.indexOf(a[0]);
      const idxB = STAGE_ORDER.indexOf(b[0]);
      if (idxA !== -1 && idxB !== -1) return idxA - idxB;
      if (idxA !== -1) return -1;
      if (idxB !== -1) return 1;
      return 0;
    });
  }, [nodes]);

  if (!nodes || nodes.length === 0) return null;

  return (
    <div className="w-full">
      {/* 1. Crawlable Screen-Reader / SEO Semantic Hierarchy */}
      <nav aria-label="진화 계보 트리" className="sr-only">
        <ul>
          {stages.map(([stageName, items]) => (
            <li key={stageName}>
              <span>{stageName}</span>
              <ul>
                {items.map(({ node, entry }) => (
                  <li key={`${node.number}-${node.name}`}>
                    <a href={`/gallery/aniimo/character/${encodeURIComponent(node.name)}`}>
                      NO.{node.number} {node.name} ({entry?.elements?.join('/') || ''})
                    </a>
                    {entry?.forms && entry.forms.length > 1 && (
                      <ul>
                        {entry.forms.map(f => (
                          <li key={f.key}>
                            <a href={`/gallery/aniimo/character/${encodeURIComponent(node.name)}?form=${encodeURIComponent(f.key)}`}>
                              {f.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </nav>

      {/* 2. Desktop Horizontal Branch Tree */}
      <div className="hidden md:flex items-center justify-center gap-2 overflow-x-auto py-6 px-2 custom-scrollbar">
        {stages.map(([stageName, items], stageIdx) => {
          const isLastStage = stageIdx === stages.length - 1;
          const nextStageItems = !isLastStage ? stages[stageIdx + 1][1] : [];
          const hasBranching = nextStageItems.length > 1;

          return (
            <React.Fragment key={stageName}>
              {/* Stage Column */}
              <div className="flex flex-col items-center gap-4 shrink-0">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-black text-violet-300">
                  <span>{stageName}</span>
                  {items.length > 1 && (
                    <span className="text-[9px] text-gray-400">({items.length}종 분기)</span>
                  )}
                </div>

                <div className="flex flex-col gap-4">
                  {items.map(({ node, entry }) => {
                    const isCurrentChar = node.name === currentName;
                    const allForms = entry?.forms && entry.forms.length > 0 ? entry.forms : [];
                    const displayElements = entry?.elements || [];
                    const displayPositions = entry?.positions || [];

                    return (
                      <div
                        key={`${node.number}-${node.name}`}
                        className={`relative group flex flex-col w-56 rounded-2xl border transition-all duration-300 p-4 ${
                          isCurrentChar
                            ? 'border-violet-400 bg-gradient-to-b from-violet-500/15 via-[#161325] to-[#111118] shadow-[0_0_28px_rgba(167,139,250,0.25)] ring-1 ring-violet-400/40'
                            : 'border-white/10 bg-white/[0.03] hover:border-violet-400/40 hover:bg-white/[0.06]'
                        }`}
                      >
                        {isCurrentChar && (
                          <div className="absolute -top-2.5 right-3 px-2 py-0.5 rounded-full bg-violet-500 text-[9px] font-black text-black tracking-wider uppercase">
                            현재 선택
                          </div>
                        )}

                        {/* Card Header & Avatar */}
                        <Link
                          to={`/gallery/aniimo/character/${encodeURIComponent(node.name)}`}
                          className="flex items-center gap-3"
                        >
                          <div className="relative h-14 w-14 shrink-0 rounded-xl bg-white/5 border border-white/10 p-1 overflow-hidden group-hover:scale-105 transition-transform">
                            {node.imageUrl ? (
                              <img
                                src={node.imageUrl}
                                alt={`${node.name} 아이콘`}
                                loading="lazy"
                                referrerPolicy="no-referrer"
                                className="h-full w-full object-contain"
                              />
                            ) : (
                              <div className="h-full w-full flex items-center justify-center text-[10px] text-gray-600">
                                NO.{node.number}
                              </div>
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <span className="text-[9px] font-bold text-gray-500 tracking-wider">
                              NO.{node.number}
                            </span>
                            <h4 className={`text-sm font-black truncate transition-colors ${
                              isCurrentChar ? 'text-violet-300' : 'text-white group-hover:text-violet-300'
                            }`}>
                              {node.name}
                            </h4>
                            <div className="mt-1 flex items-center gap-1.5 text-[10px] font-semibold text-gray-400">
                              {displayElements.length > 0 && <span>{displayElements.join('/')}</span>}
                              {displayPositions.length > 0 && (
                                <>
                                  <span className="text-gray-600">·</span>
                                  <span>{displayPositions[0]}</span>
                                </>
                              )}
                            </div>
                          </div>
                        </Link>

                        {/* Forms Pills */}
                        {allForms.length > 1 && (
                          <div className="mt-3 pt-3 border-t border-white/5">
                            <span className="block text-[9px] font-bold text-gray-500 mb-1.5">
                              보유 형태 ({allForms.length})
                            </span>
                            <div className="flex flex-wrap gap-1">
                              {allForms.map(form => {
                                const isFormActive = isCurrentChar && form.key === currentFormKey;
                                const cleanLabel = form.label.replace(' 형태', '');
                                return (
                                  <Link
                                    key={form.key}
                                    to={`/gallery/aniimo/character/${encodeURIComponent(node.name)}${
                                      form.key !== 'basic-form' ? `?form=${encodeURIComponent(form.key)}` : ''
                                    }`}
                                    className={`px-1.5 py-0.5 rounded text-[9px] font-black transition-all ${
                                      isFormActive
                                        ? 'bg-violet-400 text-black shadow-sm'
                                        : 'bg-white/5 text-gray-400 hover:bg-violet-400/20 hover:text-violet-300'
                                    }`}
                                  >
                                    {cleanLabel}
                                  </Link>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Branch Connector */}
              {!isLastStage && (
                <div className="flex flex-col items-center justify-center px-1 shrink-0">
                  <div className="flex items-center gap-1 text-violet-400/70">
                    <div className="w-6 h-px bg-gradient-to-r from-violet-500/40 to-violet-400" />
                    {hasBranching ? (
                      <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-violet-500/10 border border-violet-500/20 text-[9px] font-black text-violet-300">
                        <GitBranch size={10} className="text-violet-400" />
                        <span>분기</span>
                      </div>
                    ) : (
                      <ChevronRight size={18} className="text-violet-400" />
                    )}
                    <div className="w-6 h-px bg-gradient-to-r from-violet-400 to-violet-500/40" />
                  </div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* 3. Mobile Vertical Indented Branch Tree */}
      <div className="md:hidden space-y-4 py-2">
        {stages.map(([stageName, items], stageIdx) => {
          return (
            <div key={stageName} className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-violet-400" />
                <span className="text-xs font-black text-violet-300">{stageName}</span>
                <span className="text-[10px] text-gray-500">({items.length}종)</span>
                <div className="h-px flex-1 bg-white/10" />
              </div>

              <div className="pl-3 border-l-2 border-violet-500/20 space-y-3 ml-1">
                {items.map(({ node, entry }) => {
                  const isCurrentChar = node.name === currentName;
                  const allForms = entry?.forms && entry.forms.length > 0 ? entry.forms : [];
                  const displayElements = entry?.elements || [];

                  return (
                    <div
                      key={`${node.number}-${node.name}`}
                      className={`rounded-2xl border p-3.5 transition-all ${
                        isCurrentChar
                          ? 'border-violet-400/80 bg-violet-500/10'
                          : 'border-white/10 bg-white/[0.02]'
                      }`}
                    >
                      <Link
                        to={`/gallery/aniimo/character/${encodeURIComponent(node.name)}`}
                        className="flex items-center gap-3"
                      >
                        <div className="h-12 w-12 shrink-0 rounded-xl bg-white/5 border border-white/10 p-1">
                          {node.imageUrl && (
                            <img
                              src={node.imageUrl}
                              alt={node.name}
                              loading="lazy"
                              referrerPolicy="no-referrer"
                              className="h-full w-full object-contain"
                            />
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-[9px] font-bold text-gray-500">NO.{node.number}</span>
                            {isCurrentChar && (
                              <span className="text-[9px] font-black text-violet-300 bg-violet-400/20 px-1.5 py-0.5 rounded">
                                현재 선택
                              </span>
                            )}
                          </div>
                          <strong className={`block text-sm font-black ${isCurrentChar ? 'text-violet-300' : 'text-white'}`}>
                            {node.name}
                          </strong>
                          <span className="text-[10px] text-gray-400 font-semibold">
                            {displayElements.join('/')}
                          </span>
                        </div>
                      </Link>

                      {allForms.length > 1 && (
                        <div className="mt-2.5 pt-2.5 border-t border-white/5">
                          <div className="flex flex-wrap gap-1">
                            {allForms.map(form => {
                              const isFormActive = isCurrentChar && form.key === currentFormKey;
                              return (
                                <Link
                                  key={form.key}
                                  to={`/gallery/aniimo/character/${encodeURIComponent(node.name)}${
                                    form.key !== 'basic-form' ? `?form=${encodeURIComponent(form.key)}` : ''
                                  }`}
                                  className={`px-2 py-0.5 rounded text-[9px] font-black ${
                                    isFormActive
                                      ? 'bg-violet-400 text-black'
                                      : 'bg-white/5 text-gray-400'
                                  }`}
                                >
                                  {form.label.replace(' 형태', '')}
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AniimoEvolutionTree;
