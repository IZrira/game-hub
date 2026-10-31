import React, { useMemo } from 'react';
import { Link } from 'react-router';
import { ChevronRight, GitBranch } from 'lucide-react';
import type { AniimoEntry, AniimoEvolutionNode, AniimoForm } from '../types';
import aniimoSummary from '../data/aniimo-summary.json';
import { findAniimoEvolutionEntry } from '../utils/identity';

type AniimoTreeEntry = Pick<AniimoEntry, 'id' | 'regionId' | 'number' | 'name' | 'elements' | 'positions'> & {
  forms: Array<Pick<AniimoForm, 'key' | 'label' | 'elements' | 'positions'>>;
};

const allAniimos = aniimoSummary as AniimoTreeEntry[];

interface AniimoEvolutionTreeProps {
  currentName: string;
  currentFormKey?: string;
  regionId?: string;
  nodes: AniimoEvolutionNode[];
}

export const AniimoEvolutionTree: React.FC<AniimoEvolutionTreeProps> = ({
  currentName,
  currentFormKey = 'basic-form',
  regionId,
  nodes
}) => {
  // Stage sequence definition
  const STAGE_ORDER = ['유년기', '성장기', '성숙기'];

  // Group nodes by stage
  const stages = useMemo(() => {
    const stageMap = new Map<string, Array<{ node: AniimoEvolutionNode; entry?: AniimoTreeEntry }>>();
    
    nodes.forEach(node => {
      const stageName = node.stage || '기타';
      if (!stageMap.has(stageName)) {
        stageMap.set(stageName, []);
      }
      const entry = findAniimoEvolutionEntry(allAniimos, node, regionId);
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
  }, [nodes, regionId]);

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
                  <li key={`${node.id || node.number}-${node.formKey}-${node.imageUrl}`}>
                    <a href={node.name ? `/gallery/aniimo/character/${encodeURIComponent(node.name)}${node.formKey && node.formKey !== 'basic-form' ? `?form=${encodeURIComponent(node.formKey)}` : ''}` : undefined}>
                      {node.number ? `NO.${node.number}` : '공식 정보 미제공'} {node.name || '미확인'} ({entry?.elements?.join('/') || ''})
                    </a>
                    {entry?.forms && entry.forms.length > 1 && (
                      <ul>
                        {entry.forms.map(f => (
                          <li key={f.key}>
                            <a href={`/gallery/aniimo/character/${encodeURIComponent(node.name || '')}?form=${encodeURIComponent(f.key)}`}>
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
                    const isCurrentChar = node.name === currentName && (!regionId || node.formKey === currentFormKey);
                    const allForms = entry?.forms && entry.forms.length > 0 ? (regionId ? entry.forms.filter(form => form.key === node.formKey) : entry.forms) : [];
                    const nodeForm = regionId ? entry?.forms.find(form => form.key === node.formKey) : undefined;
                    const displayElements = nodeForm?.elements || entry?.elements || [];
                    const displayPositions = nodeForm?.positions || entry?.positions || [];

                    return (
                      <div
                        key={`${node.id || node.number}-${node.formKey}-${node.imageUrl}`}
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
                        <EvolutionNodeLink
                          node={node}
                          className="flex items-center gap-3"
                        >
                          <div className="relative h-14 w-14 shrink-0 rounded-xl bg-white/5 border border-white/10 p-1 overflow-hidden group-hover:scale-105 transition-transform">
                            {node.imageUrl ? (
                              <img
                                src={node.imageUrl}
                                alt={`${node.name || '미확인'} 아이콘`}
                                loading="lazy"
                                referrerPolicy="no-referrer"
                                className="h-full w-full object-contain"
                              />
                            ) : (
                              <div className="h-full w-full flex items-center justify-center text-[10px] text-gray-600">
                                {node.number ? `NO.${node.number}` : '공식 정보 미제공'}
                              </div>
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <span className="text-[9px] font-bold text-gray-500 tracking-wider">
                              {node.number ? `NO.${node.number}` : '공식 정보 미제공'}
                            </span>
                            <h4 className={`text-sm font-black truncate transition-colors ${
                              isCurrentChar ? 'text-violet-300' : 'text-white group-hover:text-violet-300'
                            }`}>
                              {node.name || '미확인'}
                            </h4>
                            {regionId && node.formLabel && <span className="text-[10px] text-violet-300">{node.formLabel}</span>}
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
                        </EvolutionNodeLink>

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
                                    to={`/gallery/aniimo/character/${encodeURIComponent(node.name || '')}${
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
                  const isCurrentChar = node.name === currentName && (!regionId || node.formKey === currentFormKey);
                  const allForms = entry?.forms && entry.forms.length > 0 ? (regionId ? entry.forms.filter(form => form.key === node.formKey) : entry.forms) : [];
                  const nodeForm = regionId ? entry?.forms.find(form => form.key === node.formKey) : undefined;
                  const displayElements = nodeForm?.elements || entry?.elements || [];

                  return (
                    <div
                      key={`${node.id || node.number}-${node.formKey}-${node.imageUrl}`}
                      className={`rounded-2xl border p-3.5 transition-all ${
                        isCurrentChar
                          ? 'border-violet-400/80 bg-violet-500/10'
                          : 'border-white/10 bg-white/[0.02]'
                      }`}
                    >
                      <EvolutionNodeLink
                        node={node}
                        className="flex items-center gap-3"
                      >
                        <div className="h-12 w-12 shrink-0 rounded-xl bg-white/5 border border-white/10 p-1">
                          {node.imageUrl && (
                            <img
                              src={node.imageUrl}
                              alt={node.name || '미확인'}
                              loading="lazy"
                              referrerPolicy="no-referrer"
                              className="h-full w-full object-contain"
                            />
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-[9px] font-bold text-gray-500">{node.number ? `NO.${node.number}` : '공식 정보 미제공'}</span>
                            {isCurrentChar && (
                              <span className="text-[9px] font-black text-violet-300 bg-violet-400/20 px-1.5 py-0.5 rounded">
                                현재 선택
                              </span>
                            )}
                          </div>
                          <strong className={`block text-sm font-black ${isCurrentChar ? 'text-violet-300' : 'text-white'}`}>
                            {node.name || '미확인'}
                          </strong>
                          {regionId && node.formLabel && <span className="block text-[10px] text-violet-300">{node.formLabel}</span>}
                          <span className="text-[10px] text-gray-400 font-semibold">
                            {displayElements.join('/')}
                          </span>
                        </div>
                      </EvolutionNodeLink>

                      {allForms.length > 1 && (
                        <div className="mt-2.5 pt-2.5 border-t border-white/5">
                          <div className="flex flex-wrap gap-1">
                            {allForms.map(form => {
                              const isFormActive = isCurrentChar && form.key === currentFormKey;
                              return (
                                <Link
                                  key={form.key}
                                  to={`/gallery/aniimo/character/${encodeURIComponent(node.name || '')}${
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

const EvolutionNodeLink = ({ node, className, children }: { node: AniimoEvolutionNode; className?: string; children: React.ReactNode }) =>
  node.name
    ? <Link className={className} to={`/gallery/aniimo/character/${encodeURIComponent(node.name)}${node.formKey && node.formKey !== 'basic-form' ? `?form=${encodeURIComponent(node.formKey)}` : ''}`}>{children}</Link>
    : <div className={className}>{children}</div>;

export default AniimoEvolutionTree;
