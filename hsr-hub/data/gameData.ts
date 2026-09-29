import { HSR_DATA_ALL } from './index';
import { ashveil_en } from './ashveil';
import castorice_en from '../../common-hub/castorice';
import i18n from '../../common-hub/i18n';

const ENGLISH_CHARACTERS = [ashveil_en, castorice_en];

export const getHsrGameData = (language = 'ko'): any => {
  if (language !== 'en') {
    return {
      ...HSR_DATA_ALL,
      HSR_INVENTORY: HSR_DATA_ALL.INVENTORY_DB
    };
  }

  const translatedCharacters = HSR_DATA_ALL.CHARACTER_DB.map(character => {
    const englishCharacter = ENGLISH_CHARACTERS.find(item => item.id === character.id);
    if (englishCharacter) {
      return { ...englishCharacter, originalName: character.name };
    }

    return {
      ...character,
      originalName: character.name,
      name: i18n.t(character.name),
      path: character.path ? i18n.t(character.path) : undefined,
      attribute: character.attribute ? i18n.t(character.attribute) : undefined,
      materials_v2: {
        ascension: character.materials_v2?.ascension?.map(material => ({ ...material, name: i18n.t(material.name) })) || [],
        traces: character.materials_v2?.traces?.map(material => ({ ...material, name: i18n.t(material.name) })) || []
      }
    };
  });

  return {
    ...HSR_DATA_ALL,
    CHARACTER_DB: translatedCharacters,
    HSR_INVENTORY: HSR_DATA_ALL.INVENTORY_DB
  };
};
