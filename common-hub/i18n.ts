/**
 * @fileoverview 다국어(i18n) 설정 및 데이터 자동 병합 모듈
 * @description 파일 위치(경로)와 상관없이 common-hub 폴더 내의 모든 *_en.json 언어팩을 수집하여 i18next 인스턴스를 초기화합니다.
 */

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import koTranslation from './ko.json';
import enTranslation from './en.json';
import jaTranslation from './ja.json';

/**
 * 파일 경로와 무관하게 모든 폴더 내의 `*_en.json`, `*_ko.json`, `*_ja.json` 언어팩 데이터를 가져옵니다.
 */
const gameEnModules = import.meta.glob('./**/*_en.json', { eager: true });
const gameKoModules = import.meta.glob('./**/*_ko.json', { eager: true });
const gameJaModules = import.meta.glob('./**/*_ja.json', { eager: true });

let combinedEnTranslation = { ...enTranslation };
let combinedKoTranslation = { ...koTranslation };
let combinedJaTranslation = { ...jaTranslation };

/**
 * 수집된 모든 언어팩 데이터를 하나의 통합된 객체로 자동 병합합니다.
 */
for (const path in gameEnModules) {
  const mod = gameEnModules[path] as any;
  combinedEnTranslation = { ...combinedEnTranslation, ...(mod.default || mod) };
}

for (const path in gameKoModules) {
  const mod = gameKoModules[path] as any;
  combinedKoTranslation = { ...combinedKoTranslation, ...(mod.default || mod) };
}

for (const path in gameJaModules) {
  const mod = gameJaModules[path] as any;
  combinedJaTranslation = { ...combinedJaTranslation, ...(mod.default || mod) };
}

const resources = {
  ko: {
    translation: combinedKoTranslation
  },
  en: {
    translation: combinedEnTranslation
  },
  ja: {
    translation: combinedJaTranslation
  }
};

const getInitialLang = () => {
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    const lng = params.get('lng');
    if (lng === 'en' || lng === 'ko' || lng === 'ja') return lng;
    return localStorage.getItem('rira_lang') || 'ko';
  }
  return 'ko';
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getInitialLang(),
    fallbackLng: 'ko', // 번역이 누락된 경우 기본값
    keySeparator: false, // 전역 설정: 마침표(.)를 하위 객체 탐색으로 오인하지 않음
    nsSeparator: false,  // 전역 설정: 콜론(:)을 네임스페이스 탐색으로 오인하지 않음
    interpolation: {
      escapeValue: false // 리액트에서는 자체적으로 XSS 방어가 되므로 false로 둡니다.
    }
  });

export default i18n;