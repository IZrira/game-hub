/**
 * @fileoverview 다국어(i18n) 설정 및 언어별 지연 로딩 모듈
 * @description 현재 선택한 언어의 기본 번역과 게임별 언어팩만 불러옵니다.
 */

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

export type SupportedLanguage = 'ko' | 'en' | 'ja';

type TranslationModule = {
  default?: Record<string, unknown>;
} & Record<string, unknown>;

type TranslationLoader = () => Promise<TranslationModule>;
type GameLanguageScope = 'hsr' | 'ww';

const baseTranslationLoaders: Record<SupportedLanguage, TranslationLoader> = {
  ko: () => import('./ko.json'),
  en: () => import('./en.json'),
  ja: () => import('./ja.json'),
};

const gameTranslationLoaders: Record<SupportedLanguage, Record<string, TranslationLoader>> = {
  ko: import.meta.glob<TranslationModule>('./**/*_ko.json'),
  en: import.meta.glob<TranslationModule>('./**/*_en.json'),
  ja: import.meta.glob<TranslationModule>('./**/*_ja.json'),
};

const baseLanguageLoadPromises = new Map<SupportedLanguage, Promise<void>>();
const gameLanguageLoadPromises = new Map<string, Promise<void>>();

const isSupportedLanguage = (value: string | null): value is SupportedLanguage =>
  value === 'ko' || value === 'en' || value === 'ja';

export const getGameLanguageScope = (pathname?: string): GameLanguageScope | null => {
  const currentPath = pathname ?? (typeof window === 'undefined' ? '' : window.location.pathname);
  const gameId = currentPath.match(/^\/gallery\/(hsr|ww)(?:\/|$)/)?.[1];
  return gameId === 'hsr' || gameId === 'ww' ? gameId : null;
};

export const getInitialLanguage = (): SupportedLanguage => {
  if (typeof window === 'undefined') return 'ko';

  const queryLanguage = new URLSearchParams(window.location.search).get('lng');
  if (isSupportedLanguage(queryLanguage)) return queryLanguage;

  const savedLanguage = localStorage.getItem('rira_lang');
  return isSupportedLanguage(savedLanguage) ? savedLanguage : 'ko';
};

const i18nReady = i18n
  .use(initReactI18next)
  .init({
    resources: {},
    lng: getInitialLanguage(),
    fallbackLng: false,
    keySeparator: false,
    nsSeparator: false,
    interpolation: {
      escapeValue: false,
    },
  });

/** 선택한 언어의 공통 번역만 한 번 불러와 i18next에 등록합니다. */
const loadBaseLanguageResources = (language: SupportedLanguage): Promise<void> => {
  const cachedPromise = baseLanguageLoadPromises.get(language);
  if (cachedPromise) return cachedPromise;

  const loadPromise = (async () => {
    await i18nReady;
    const baseModule = await baseTranslationLoaders[language]();
    i18n.addResourceBundle(language, 'translation', baseModule.default || baseModule, true, true);
  })().catch((error) => {
    baseLanguageLoadPromises.delete(language);
    throw error;
  });

  baseLanguageLoadPromises.set(language, loadPromise);
  return loadPromise;
};

/** 현재 게임에 필요한 번역 팩만 지연 로딩합니다. */
export const loadGameLanguageResources = async (
  language: SupportedLanguage,
  scope: GameLanguageScope | null,
): Promise<void> => {
  await loadBaseLanguageResources(language);
  if (!scope) return;

  const cacheKey = `${language}:${scope}`;
  const cachedPromise = gameLanguageLoadPromises.get(cacheKey);
  if (cachedPromise) return cachedPromise;

  const loadPromise = (async () => {
    const scopedLoaders = Object.entries(gameTranslationLoaders[language])
      .filter(([path]) => path.includes(`/locales/${scope}/`))
      .map(([, loader]) => loader);

    const gameModules = await Promise.all(scopedLoaders.map((loader) => loader()));
    const mergedTranslation = gameModules.reduce<Record<string, unknown>>(
      (combined, module) => ({ ...combined, ...(module.default || module) }),
      {},
    );

    if (gameModules.length > 0) {
      i18n.addResourceBundle(language, 'translation', mergedTranslation, true, true);
    }
  })().catch((error) => {
    gameLanguageLoadPromises.delete(cacheKey);
    throw error;
  });

  gameLanguageLoadPromises.set(cacheKey, loadPromise);
  return loadPromise;
};

/** 선택한 언어와 현재 게임 범위에 필요한 번역만 불러옵니다. */
export const loadLanguageResources = (
  language: SupportedLanguage,
  scope: GameLanguageScope | null = getGameLanguageScope(),
): Promise<void> => loadGameLanguageResources(language, scope);

export const changeAppLanguage = async (language: SupportedLanguage): Promise<void> => {
  await loadLanguageResources(language, getGameLanguageScope());
  await i18n.changeLanguage(language);
};

export default i18n;
