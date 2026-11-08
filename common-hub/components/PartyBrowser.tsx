import React, { memo, useMemo, useState } from 'react';
import { Link } from 'react-router';
import { Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import RecoverableImage from './RecoverableImage';

/** One character shown in a party slot or as a substitute. Pages build these from their own data. */
export interface PartyCardCharacter {
  name: string;
  imageUrl: string;
  /** Image to show when every source of imageUrl fails. Without it the image is dimmed. */
  fallbackUrl?: string;
  href: string;
  role?: string;
  breakthrough?: string;
  attribute?: string;
}

export interface PartyCardMember extends PartyCardCharacter {
  substitutes?: PartyCardCharacter[];
}

export interface PartyCardData {
  id: string;
  name: string;
  category?: string;
  mainDPS?: string;
  description?: string;
  pros?: string[];
  cons?: string[];
  tags?: string[];
  members: PartyCardMember[];
}

interface PartyBrowserProps {
  parties: PartyCardData[];
  /** 3 for WW, 4 for HSR and NTE. Keeps every card on the same column grid. */
  slots: 3 | 4;
  /** Game accent colour from DESIGN.md, used only for the current selection and focus. */
  accent: string;
  /** Category chips in display order. Categories that no party uses are hidden. Omit for no chips. */
  categoryOrder?: string[];
  searchPlaceholder?: string;
}

const BASE_BREAKTHROUGHS = new Set(['명함', '명함 (E0)', '명함 (S0)']);
const shownBreakthrough = (value?: string) => (value && !BASE_BREAKTHROUGHS.has(value) ? value : undefined);
const cleanDescription = (text: string) =>
  text.replace(/\s*\([^)]*대체:[^)]*\)/g, '').replace(/\s*[^)]*대체:[^)]*/g, '').trim();
const normalize = (text: string) => text.normalize('NFC').replace(/[\s•·]/g, '').toLowerCase();

function CharacterImage({ character, className }: { character: PartyCardCharacter; className: string }) {
  const [failed, setFailed] = useState(false);
  const src = failed && character.fallbackUrl ? character.fallbackUrl : character.imageUrl;
  return (
    <RecoverableImage
      src={src}
      alt=""
      loading="lazy"
      decoding="async"
      className={`${className} ${failed && !character.fallbackUrl ? 'opacity-30' : ''}`}
      onError={() => setFailed(true)}
    />
  );
}

function SubstituteChip({ character }: { character: PartyCardCharacter }) {
  const { t } = useTranslation();
  const breakthrough = shownBreakthrough(character.breakthrough);
  return (
    <Link
      to={character.href}
      className="inline-flex max-w-full items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 py-0.5 pl-0.5 pr-2 text-[11px] leading-5 text-gray-300 transition-colors hover:border-white/30 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-(--party-accent)"
    >
      <CharacterImage character={character} className="h-5 w-5 shrink-0 rounded-full bg-[#171717] object-cover" />
      <span className="break-keep">{t(character.name)}</span>
      {breakthrough && <span className="shrink-0 text-amber-300">{breakthrough}</span>}
    </Link>
  );
}

function MemberSlot({ member }: { member: PartyCardMember }) {
  const { t } = useTranslation();
  const breakthrough = shownBreakthrough(member.breakthrough);
  const detail = [member.role && t(member.role), member.attribute && `${t(member.attribute)} ${t('속성')}`].filter(Boolean).join(' · ');
  return (
    <li className="min-w-0">
      <Link
        to={member.href}
        className="group block rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--party-accent)"
      >
        <div className="aspect-square overflow-hidden rounded-xl border border-white/10 bg-[#171717] transition-colors group-hover:border-white/30">
          <CharacterImage character={member} className="h-full w-full object-cover" />
        </div>
        <p className="mt-2 break-keep text-xs font-bold leading-snug text-white sm:text-sm">{t(member.name)}</p>
      </Link>
      {(detail || breakthrough) && (
        <p className="mt-0.5 break-keep text-[11px] leading-snug text-gray-400">
          {detail}
          {breakthrough && <span className="text-amber-300">{detail ? ' · ' : ''}{breakthrough}</span>}
        </p>
      )}
      {member.substitutes && member.substitutes.length > 0 && (
        <div className="mt-2 hidden flex-wrap gap-1 sm:flex">
          <span className="sr-only">{t('대체 캐릭터')}</span>
          {member.substitutes.map((sub, index) => <SubstituteChip key={`${sub.name}-${index}`} character={sub} />)}
        </div>
      )}
    </li>
  );
}

export const PartyCard = memo(({ party, slots }: { party: PartyCardData; slots: 3 | 4 }) => {
  const { t } = useTranslation();
  const [showSubstitutes, setShowSubstitutes] = useState(false);
  const substituteCount = party.members.reduce((count, member) => count + (member.substitutes?.length || 0), 0);
  const meta = [party.category && t(party.category), party.mainDPS && `${t('메인 딜러')} ${t(party.mainDPS)}`].filter(Boolean);
  const description = party.description ? cleanDescription(t(party.description)) : '';
  const panelId = `party-subs-${party.id}`;

  return (
    <article className="flex min-w-0 flex-col gap-4 rounded-2xl border border-white/10 bg-[#121212] p-4 sm:p-5">
      <header>
        <h4 className="break-keep text-base font-bold leading-snug text-white sm:text-lg">{t(party.name)}</h4>
        {meta.length > 0 && <p className="mt-1 text-xs text-gray-400">{meta.join(' · ')}</p>}
      </header>

      <ul className={`grid gap-2 sm:gap-3 ${slots === 4 ? 'grid-cols-4' : 'grid-cols-3'}`}>
        {party.members.map((member, index) => <MemberSlot key={`${member.name}-${index}`} member={member} />)}
      </ul>

      {substituteCount > 0 && (
        <div className="sm:hidden">
          <button
            type="button"
            aria-expanded={showSubstitutes}
            aria-controls={panelId}
            onClick={() => setShowSubstitutes(open => !open)}
            className="min-h-11 w-full rounded-xl border border-white/10 px-3 text-left text-xs font-bold text-gray-300 transition-colors hover:border-white/30 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-(--party-accent)"
          >
            {showSubstitutes ? t('대체 캐릭터 접기') : `${t('대체 캐릭터')} ${substituteCount}${t('명 보기')}`}
          </button>
          {showSubstitutes && (
            <dl id={panelId} className="mt-3 space-y-2">
              {party.members.filter(member => member.substitutes?.length).map((member, index) => (
                <div key={`${member.name}-${index}`} className="flex flex-wrap items-center gap-1.5">
                  <dt className="mr-1 text-[11px] font-bold text-gray-400">{t(member.name)} {t('대신')}</dt>
                  {member.substitutes!.map((sub, subIndex) => (
                    <dd key={`${sub.name}-${subIndex}`} className="max-w-full"><SubstituteChip character={sub} /></dd>
                  ))}
                </div>
              ))}
            </dl>
          )}
        </div>
      )}

      {(description || party.pros?.length || party.cons?.length) ? (
        <div className="space-y-3 border-t border-white/5 pt-4">
          {description && <p className="whitespace-pre-line break-keep text-sm leading-relaxed text-gray-300">{description}</p>}
          {[['장점', party.pros], ['단점', party.cons]].map(([label, items]) =>
            Array.isArray(items) && items.length > 0 ? (
              <div key={label as string}>
                <p className="text-xs font-bold text-gray-400">{t(label as string)}</p>
                <ul className="mt-1 list-disc space-y-0.5 pl-4 text-sm leading-relaxed text-gray-300">
                  {items.map(item => <li key={item} className="break-keep">{t(item)}</li>)}
                </ul>
              </div>
            ) : null
          )}
        </div>
      ) : null}
    </article>
  );
});

function matchesQuery(party: PartyCardData, query: string, t: (text: string) => string) {
  if (!query) return true;
  const fields = [party.name, party.mainDPS, party.category, party.description, ...(party.tags || [])];
  party.members.forEach(member => {
    fields.push(member.name, member.attribute);
    member.substitutes?.forEach(sub => fields.push(sub.name));
  });
  return fields.some(field => field && (normalize(field).includes(query) || normalize(t(field)).includes(query)));
}

/** Search, category chips and the party card grid shared by every hub's party page. */
export default function PartyBrowser({ parties, slots, accent, categoryOrder, searchPlaceholder }: PartyBrowserProps) {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('전체');

  const categories = useMemo(() => {
    if (!categoryOrder) return [];
    const used = new Set(parties.map(party => party.category).filter(Boolean));
    const ordered = categoryOrder.filter(item => used.has(item));
    const rest = Array.from(used).filter((item): item is string => !!item && !ordered.includes(item));
    return ['전체', ...ordered, ...rest];
  }, [parties, categoryOrder]);

  const activeCategory = categories.includes(category) ? category : '전체';
  const normalizedQuery = normalize(query);
  const visible = useMemo(
    () => parties.filter(party =>
      (activeCategory === '전체' || party.category === activeCategory) && matchesQuery(party, normalizedQuery, t)),
    [parties, activeCategory, normalizedQuery, t]
  );

  const reset = () => { setQuery(''); setCategory('전체'); };

  return (
    <section style={{ '--party-accent': accent } as React.CSSProperties} className="space-y-6" aria-label={t('추천 파티 목록')}>
      <div className="space-y-3">
        <div className="relative max-w-md">
          <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={event => setQuery(event.target.value)}
            placeholder={searchPlaceholder || t('캐릭터, 파티명 검색...')}
            aria-label={t('파티 검색')}
            className="h-12 w-full rounded-xl border border-white/10 bg-[#121212] pl-11 pr-4 text-sm text-white placeholder-gray-500 transition-colors focus:border-(--party-accent) focus:outline-none"
          />
        </div>
        {categories.length > 1 && (
          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 no-scrollbar sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0" role="group" aria-label={t('분류')}>
            {categories.map(item => {
              const active = item === activeCategory;
              return (
                <button
                  key={item}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setCategory(item)}
                  className={`min-h-9 shrink-0 whitespace-nowrap rounded-full border px-4 text-xs font-bold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--party-accent) ${
                    active ? 'border-(--party-accent) bg-(--party-accent) text-black' : 'border-white/10 bg-white/5 text-gray-300 hover:border-white/30 hover:text-white'
                  }`}
                >
                  {t(item)}
                </button>
              );
            })}
          </div>
        )}
        <p className="text-xs text-gray-400" aria-live="polite">{t('파티 조합')} {visible.length}{t('개')}</p>
      </div>

      {visible.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          {visible.map(party => <PartyCard key={party.id} party={party} slots={slots} />)}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-white/10 px-6 py-16 text-center">
          <p className="text-sm font-bold text-white">{t('조건에 맞는 파티 조합이 없습니다.')}</p>
          <p className="mt-1 text-sm text-gray-400">{t('검색어나 분류를 바꿔 보세요.')}</p>
          <button
            type="button"
            onClick={reset}
            className="mt-4 min-h-11 rounded-xl border border-white/10 px-4 text-sm font-bold text-gray-200 transition-colors hover:border-white/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-(--party-accent)"
          >
            {t('전체 보기')}
          </button>
        </div>
      )}
    </section>
  );
}
