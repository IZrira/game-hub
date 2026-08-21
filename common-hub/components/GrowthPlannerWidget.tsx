import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import { 
  Sparkles, 
  CheckCircle2, 
  Circle, 
  Trash2, 
  Plus, 
  ExternalLink, 
  ChevronRight, 
  Layers, 
  TrendingUp, 
  CheckCheck
} from 'lucide-react';
import { Character, Game } from '../types';
import { safeEncodeURIComponent } from '../utils/assetManager';

export interface PlannedCharacter {
  id: string;
  name: string;
  gameId: string;
  element?: string;
  path?: string;
  folderName?: string;
  avatarUrl?: string;
  targetLevel: number;
  completedTasks: Record<string, boolean>; // e.g. { "ascension_1": true, "trace_max": false }
}

interface GrowthPlannerWidgetProps {
  game: Game;
  availableCharacters: Character[];
}

export const GrowthPlannerWidget: React.FC<GrowthPlannerWidgetProps> = ({ game, availableCharacters }) => {
  const { t } = useTranslation();
  const [planner, setPlanner] = useState<PlannedCharacter[]>([]);
  const [selectedCharId, setSelectedCharId] = useState<string>('');
  const [isAdding, setIsAdding] = useState(false);

  const STORAGE_KEY = `rira_planner_${game.id}`;

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setPlanner(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load growth planner:', e);
    }
  }, [game.id]);

  const savePlanner = (updated: PlannedCharacter[]) => {
    setPlanner(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save growth planner:', e);
    }
  };

  const handleAddCharacter = (charId: string) => {
    const targetChar = availableCharacters.find(c => c.id === charId);
    if (!targetChar) return;

    if (planner.some(p => p.id === charId)) {
      setIsAdding(false);
      return;
    }

    const newEntry: PlannedCharacter = {
      id: targetChar.id,
      name: targetChar.name,
      gameId: game.id,
      element: targetChar.attribute,
      path: targetChar.arc,
      folderName: targetChar.folderName,
      targetLevel: 80,
      completedTasks: {
        'level_80': false,
        'ascension_max': false,
        'skills_priority': false,
        'relics_main_stats': false
      }
    };

    savePlanner([newEntry, ...planner]);
    setIsAdding(false);
    setSelectedCharId('');
  };

  const handleRemove = (charId: string) => {
    savePlanner(planner.filter(p => p.id !== charId));
  };

  const toggleTask = (charId: string, taskKey: string) => {
    const updated = planner.map(p => {
      if (p.id === charId) {
        return {
          ...p,
          completedTasks: {
            ...p.completedTasks,
            [taskKey]: !p.completedTasks[taskKey]
          }
        };
      }
      return p;
    });
    savePlanner(updated);
  };

  const getTaskLabels = (): { key: string; label: string }[] => {
    if (game.id === 'ww') {
      return [
        { key: 'level_80', label: '공명자 90/90레벨 달성' },
        { key: 'ascension_max', label: '돌파 재료 및 주간 토벌 완료' },
        { key: 'skills_priority', label: '핵심 공명 스킬/회로 레벨업' },
        { key: 'relics_main_stats', label: '4-3-3-1-1 에코 주옵션 파밍' }
      ];
    }
    return [
      { key: 'level_80', label: '캐릭터 80/80레벨 달성' },
      { key: 'ascension_max', label: '승급 재료 및 행적 재료 파밍' },
      { key: 'skills_priority', label: '필살기 / 전투 스킬 행적 개방' },
      { key: 'relics_main_stats', label: '종결 유물 및 차원 장신구 세팅' }
    ];
  };

  const tasks = getTaskLabels();

  const getAvatarUrl = (char: PlannedCharacter) => {
    const CDN_URL = 'https://cdn.jsdelivr.net/gh/IZrira/riragameinfo@main';
    if (char.gameId === 'ww') {
      const folder = char.folderName || char.name;
      return `${CDN_URL}/ww%20images/skills/${safeEncodeURIComponent(folder)}/${safeEncodeURIComponent(folder)}.webp`;
    }
    return `${CDN_URL}/character_arts/${safeEncodeURIComponent(char.folderName || char.name)}/art01.webp`;
  };

  return (
    <div className="w-full bg-[#121216]/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-5 md:p-6 shadow-2xl relative overflow-hidden my-8">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-brand-primary/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-brand-primary/20 border border-brand-primary/40 flex items-center justify-center text-brand-primary">
            <TrendingUp size={20} />
          </div>
          <div>
            <h3 className="text-lg md:text-xl font-black text-white tracking-tight flex items-center gap-2">
              {t('나만의 육성 플래너')}
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-brand-primary/20 text-brand-accent border border-brand-primary/30">
                {planner.length}개 캐릭터 육성 중
              </span>
            </h3>
            <p className="text-xs text-gray-400 font-medium">
              로그인 없이 브라우저에 자동 저장되는 실시간 목표 육성 체크리스트
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-primary hover:bg-brand-primary/80 text-white text-xs font-black uppercase tracking-wider transition-all active:scale-95 shadow-lg shadow-brand-primary/20"
        >
          <Plus size={16} />
          <span>{isAdding ? t('접기') : t('목표 캐릭터 추가')}</span>
        </button>
      </div>

      {/* Add Drawer */}
      {isAdding && (
        <div className="mb-6 p-4 rounded-2xl bg-white/[0.03] border border-white/10 animate-fade-in">
          <label className="block text-xs font-bold text-gray-300 mb-2">
            육성할 캐릭터를 선택하세요:
          </label>
          <div className="flex flex-wrap gap-2">
            <select
              value={selectedCharId}
              onChange={(e) => setSelectedCharId(e.target.value)}
              className="bg-[#18181c] text-white border border-white/20 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-brand-primary min-w-[200px]"
            >
              <option value="">-- 캐릭터 선택 --</option>
              {availableCharacters
                .filter(c => !planner.some(p => p.id === c.id))
                .map(c => (
                  <option key={c.id} value={c.id}>
                    {t(c.name)} ({t(c.attribute || '')} · {t(c.arc || '')})
                  </option>
                ))}
            </select>
            <button
              disabled={!selectedCharId}
              onClick={() => handleAddCharacter(selectedCharId)}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors disabled:opacity-40"
            >
              플래너에 등록
            </button>
          </div>
        </div>
      )}

      {/* Planner Card Grid */}
      {planner.length === 0 ? (
        <div className="py-10 text-center flex flex-col items-center justify-center gap-3">
          <Layers size={36} className="text-gray-600" />
          <p className="text-sm font-bold text-gray-400">
            {t('등록된 육성 캐릭터가 없습니다.')}
          </p>
          <p className="text-xs text-gray-500">
            상단의 '목표 캐릭터 추가' 버튼을 눌러 육성할 캐릭터를 등록해 보세요!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {planner.map((char) => {
            const completedCount = Object.values(char.completedTasks).filter(Boolean).length;
            const progressPercent = Math.round((completedCount / tasks.length) * 100);
            const isAllDone = progressPercent === 100;

            return (
              <div 
                key={char.id}
                className={`p-4 rounded-2xl border transition-all relative overflow-hidden flex flex-col justify-between ${
                  isAllDone 
                    ? 'bg-emerald-950/20 border-emerald-500/30' 
                    : 'bg-white/[0.02] hover:bg-white/[0.04] border-white/10'
                }`}
              >
                <div>
                  {/* Top Bar: Avatar, Name, Progress, Delete */}
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-[#1a1a20] border border-white/10 overflow-hidden shrink-0 flex items-center justify-center">
                        <img 
                          src={getAvatarUrl(char)} 
                          alt={char.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://cdn.jsdelivr.net/gh/IZrira/riragameinfo@main/ww%20images/common/skill_placeholder.webp';
                          }}
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-black text-white text-base leading-none">
                            {t(char.name)}
                          </h4>
                          {char.element && (
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-white/10 text-gray-300">
                              {t(char.element)}
                            </span>
                          )}
                        </div>
                        <span className="text-xs font-bold text-gray-400">
                          {t('목표 레벨')} {char.targetLevel}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <Link
                        to={`/gallery/${game.id}/character/${char.id}`}
                        title="캐릭터 가이드 바로가기"
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                      >
                        <ExternalLink size={14} />
                      </Link>
                      <button
                        onClick={() => handleRemove(char.id)}
                        title="플래너에서 제거"
                        className="p-2 rounded-lg bg-white/5 hover:bg-rose-500/20 text-gray-400 hover:text-rose-400 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden mb-4 border border-white/5">
                    <div 
                      className={`h-full transition-all duration-500 ${
                        isAllDone ? 'bg-emerald-400' : 'bg-brand-primary'
                      }`}
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>

                  {/* Task Checklist */}
                  <div className="space-y-2">
                    {tasks.map(task => {
                      const isDone = !!char.completedTasks[task.key];
                      return (
                        <button
                          key={task.key}
                          onClick={() => toggleTask(char.id, task.key)}
                          className={`w-full flex items-center gap-2.5 p-2 rounded-xl text-left text-xs transition-colors ${
                            isDone 
                              ? 'bg-emerald-500/10 text-emerald-300 font-medium' 
                              : 'bg-white/[0.02] hover:bg-white/5 text-gray-300'
                          }`}
                        >
                          {isDone ? (
                            <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
                          ) : (
                            <Circle size={15} className="text-gray-500 shrink-0" />
                          )}
                          <span className={isDone ? 'line-through opacity-80' : ''}>
                            {task.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {isAllDone && (
                  <div className="mt-3 pt-3 border-t border-emerald-500/20 flex items-center justify-center gap-1.5 text-xs font-black text-emerald-400">
                    <CheckCheck size={16} />
                    <span>{t('육성 완료')}! 모든 목표를 달성했습니다.</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
