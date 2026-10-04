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

const languageLoadPromises = new Map<SupportedLanguage, Promise<void>>();

const isSupportedLanguage = (value: string | null): value is SupportedLanguage =>
  value === 'ko' || value === 'en' || value === 'ja';

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

/** 선택한 언어의 번역만 한 번 불러와 i18next에 등록합니다. */
export const loadLanguageResources = (language: SupportedLanguage): Promise<void> => {
  const cachedPromise = languageLoadPromises.get(language);
  if (cachedPromise) return cachedPromise;

  const loadPromise = (async () => {
    await i18nReady;

    const gameLoaders = Object.values(gameTranslationLoaders[language]);
    const [baseModule, ...gameModules] = await Promise.all([
      baseTranslationLoaders[language](),
      ...gameLoaders.map((loader) => loader()),
    ]);

    const mergedTranslation = [baseModule, ...gameModules].reduce<Record<string, unknown>>(
      (combined, module) => ({ ...combined, ...(module.default || module) }),
      {},
    );

    i18n.addResourceBundle(language, 'translation', mergedTranslation, true, true);
  })().catch((error) => {
    languageLoadPromises.delete(language);
    throw error;
  });

  languageLoadPromises.set(language, loadPromise);
  return loadPromise;
};

export const changeAppLanguage = async (language: SupportedLanguage): Promise<void> => {
  await loadLanguageResources(language);
  await i18n.changeLanguage(language);
};

export default i18n;
