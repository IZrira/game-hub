import React from 'react';
import { Boxes, ChevronRight, Info } from 'lucide-react';
import { Link } from 'react-router';
import {
  getNTEConsoleLayoutImageUrl,
  getNTEConsoleLayoutType,
} from '../data/consoleLayouts';

interface NTEConsoleLayoutSectionProps {
  characterName?: string;
  consoleLayoutType?: number | null;
  theme: { primary: string };
}

const NTEConsoleLayoutSection: React.FC<NTEConsoleLayoutSectionProps> = ({ characterName, consoleLayoutType, theme }) => {
  const notionLayoutType = [1, 2, 3, 4].includes(Number(consoleLayoutType))
    ? Number(consoleLayoutType) as 1 | 2 | 3 | 4
    : null;
  const layoutType = notionLayoutType ?? getNTEConsoleLayoutType(characterName);

  return (
    <section className="w-full space-y-5">
      <div className="flex items-center gap-4">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border-2"
          style={{
            backgroundColor: `${theme.primary}20`,
            borderColor: `${theme.primary}60`,
            color: theme.primary,
          }}
        >
          <Boxes size={22} />
        </div>
        <div>
          <h2 className="text-2xl font-black text-white">콘솔 배치</h2>
          <p className="mt-1 text-sm text-gray-400">캐릭터의 콘솔 판 유형과 블록 배치 영역을 확인합니다.</p>
        </div>
      </div>

      {layoutType ? (
        <div className="grid gap-5 rounded-3xl border border-white/10 bg-[#121212] p-4 sm:p-6 lg:grid-cols-[minmax(0,540px)_260px] lg:items-center lg:justify-center">
          <div className="overflow-hidden rounded-2xl border border-violet-400/20 bg-black/25 p-3 sm:p-4">
            <img
              src={getNTEConsoleLayoutImageUrl(layoutType)}
              alt={`${characterName} 콘솔 배치 유형 ${layoutType}`}
              loading="lazy"
              className="mx-auto h-auto max-h-[400px] w-full max-w-[500px] object-contain"
            />
          </div>
          <div className="space-y-4">
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-violet-400">CONSOLE LAYOUT</span>
              <h3 className="mt-2 text-xl font-black text-white">콘솔 배치 유형 {layoutType}</h3>
            </div>
            <div className="flex items-start gap-3 rounded-2xl border border-white/5 bg-white/[0.03] p-4 text-xs leading-5 text-gray-400">
              <Info size={16} className="mt-0.5 shrink-0 text-violet-300" />
              <p>추천 배치는 보유 카트리지와 목표 세트에 따라 달라집니다. 먼저 판 유형을 확인한 뒤 카트리지 효과와 블록 모양을 비교하세요.</p>
            </div>
            <Link
              to="/gallery/nte?menu=콘솔"
              className="inline-flex items-center gap-2 rounded-xl border border-violet-400/25 bg-violet-400/10 px-4 py-3 text-xs font-black text-violet-200 transition hover:border-violet-400/50 hover:bg-violet-400/15"
            >
              콘솔 카트리지 확인
              <ChevronRight size={15} />
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex items-start gap-3 rounded-3xl border border-white/10 bg-[#121212] p-6 text-sm text-gray-400">
          <Info size={18} className="mt-0.5 shrink-0 text-amber-300" />
          <div>
            <p className="font-black text-white">콘솔 배치 유형 확인 중</p>
            <p className="mt-1 leading-6">공개된 배치 유형에서 이 캐릭터의 판을 확인한 뒤 반영할 예정입니다.</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default NTEConsoleLayoutSection;
