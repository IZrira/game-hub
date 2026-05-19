import axios from 'axios';
import fs from 'fs';
import path from 'path';

const API_URL = 'https://honkai-star-rail.fandom.com/api.php';

function cleanWikitext(text: string) {
  if (!text) return '';
  return text.replace(/<br\s*\/?>/gi, '\n').replace(/&nbsp;/gi, ' ').replace(/&mdash;?/gi, ' ')
    .replace(/\|\s*description\s*=\s*/gi, '').replace(/\[\[(?:[^|\]]+\|)?([^\]]+)\]\]/g, '$1')
    .replace(/\{\{(?:[^|}]+\|)?([^}]+)\}\}/g, '$1').replace(/(?:h|highlight)\|([A-Za-z]+)(?:\|[A-Za-z0-9=\s]+)?/gi, '$1')
    .replace(/<[^>]+>/g, '').replace(/\s{2,}/g, ' ').trim();
}

async function fetchCommonDropMaterialsAPI() {
  try {
    console.log('[Scraper] Fandom API를 통해 공통 드랍 재료(행적/승급) 34종 데이터를 추출합니다...');

    const titles = [
      "Tears of Souls", "Extinguished Core", "Glimmering Core", "Squirming Core",
      "Thief's Instinct", "Usurper's Scheme", "Conqueror's Will", "Silvermane Badge", "Silvermane Insignia", "Silvermane Medal",
      "Ancient Part", "Ancient Spindle", "Ancient Engine", "Immortal Scion", "Immortal Aeroblossom", "Immortal Lumintwig",
      "Artifex's Module", "Artifex's Cogwheel", "Artifex's Gyreheart", "Dream Collection Component", "Dream Flow Valve", "Dream Making Engine",
      "Tatters of Thought", "Fragments of Impression", "Shards of Desires", "Tatters of Terror", "Fragments of Courage", "Shards of Glory",
      "Fleeting Sign", "Approaching Howl", "Endless Sigh", "Whimsy Wax", "Dreamweave Steel", "Lucid Awl"
    ];

    const materials: Record<string, any> = {};
    const chunkSize = 20;

    for (let i = 0; i < titles.length; i += chunkSize) {
      const chunk = titles.slice(i, i + chunkSize);
      const langRes = await axios.get(API_URL, {
        params: { action: 'query', prop: 'revisions', rvprop: 'content', rvslots: 'main', titles: chunk.join('|'), format: 'json' }
      });

      const pages = langRes.data.query.pages;
      for (const pageId in pages) {
        const page = pages[pageId];
        if (page.missing === undefined && page.revisions && page.revisions.length > 0) {
          const content = page.revisions[0].slots.main['*'];
          const nameEn = page.title;
          let nameKo = nameEn;
          const koMatch = content.match(/\|\s*ko\s*=\s*([^|\n}]+)/);
          if (koMatch && koMatch[1]) nameKo = cleanWikitext(koMatch[1]);

          let effect = "";
          const effectMatch = content.match(/\|\s*(?:effect|description)\s*=\s*(.+?)(?=\n\||\n\}\})/s);
          if (effectMatch) effect = cleanWikitext(effectMatch[1]);

          const sources: string[] = [];
          for (let j = 1; j <= 15; j++) {
            const sourceMatch = content.match(new RegExp(`\\|\\s*source${j}\\s*=\\s*([^\\n]+)`, 'i'));
            if (sourceMatch) { let cleanedSource = cleanWikitext(sourceMatch[1]).split('}}')[0].trim(); if (cleanedSource) sources.push(cleanedSource); }
          }
          if (sources.length === 0) sources.push("게임 내 확인 필요");
          materials[nameEn] = { nameEn, nameKo, enDesc: effect, sources };
        }
      }
    }
    const outputPath = path.resolve(process.cwd(), 'common-hub/data/common_drop_materials_api_result.json');
    fs.writeFileSync(outputPath, JSON.stringify(materials, null, 2), 'utf-8');
    console.log(`\n✅ [Success] ${Object.keys(materials).length}개의 공통 드랍 재료 추출 완료!`);
  } catch (error: any) { console.error('❌ Error:', error.message); }
}
fetchCommonDropMaterialsAPI();