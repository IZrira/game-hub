import { WuwaCharacter } from '../types';
import jiyan from './characters/ww/jiyan';
import yinlin from './characters/ww/yinlin';
import jinhsi from './characters/ww/jinhsi';
import changli from './characters/ww/changli';
import zhezhi from './characters/ww/zhezhi';

export const WW_CHARACTERS: WuwaCharacter[] = [
  zhezhi,
  changli,
  jinhsi,
  yinlin,
  jiyan
];
