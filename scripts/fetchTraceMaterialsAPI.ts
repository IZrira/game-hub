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

async function fetchTraceMaterialsAPI() {
  try {
    console.log('[Scraper] Fandom API를 통해 행적 및 광추 승급 재료 62종 데이터를 추출합니다...');

    const titles = [
      "Tears of Dreams", "Shattered Blade", "Lifeless Blade", "Worldbreaker Blade", "Borisin Teeth", "Lupitoxin Sawteeth", "Moon Rage Fang",
      "Arrow of the Beast Hunter", "Arrow of the Demon Slayer", "Arrow of the Starchaser", "Meteoric Bullet", "Destined Expiration", "Countertemporal Shot",
      "Grit of Strife", "Resin of Valor", "Lance of Retribution", "Key of Inspiration", "Key of Knowledge", "Key of Wisdom",
      "Rough Sketch", "Dynamic Outlining", "Exquisite Colored Draft", "Endurance of Bronze", "Oath of Steel", "Safeguard of Amber",
      "Scattered Star Sand", "Meteorite Crystal", "Divine Amber", "Obsidian of Dread", "Obsidian of Desolation", "Obsidian of Obsession",
      "Fiery Spirit", "Starfire Essence", "Heaven Incinerator", "Harmonic Tune", "Ancestral Hymn", "Stellaris Symphony",
      "Firmament Note", "Celestial Section", "Heavenly Melody", "Seed of Abundance", "Sprout of Life", "Flower of Eternity",
      "Alien Tree Seed", "Nourishing Honey", "Myriad Fruit", "Bīja of Consciousness", "Seedling of Manas", "Flower of Ālaya",
      "The Fluffy Hand-drawn Storyboards", "The Fluffy Serialization Memorial Issue", "The Fluffy Collector's Edition",
      "Tracks of Destiny", "Destroyer's Final Road", "Guardian's Lament", "Regret of Infinite Ochema", "Past Evils of the Borehole Planet Disaster",
      "Lost Echo of the Shared Wish", "Auspice Sliver", "Daythunder Anamnesis", "Vanquished Flow's Reticence"
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
            if (sourceMatch) {
              let cleanedSource = cleanWikitext(sourceMatch[1]).split('}}')[0].trim();
              if (cleanedSource) sources.push(cleanedSource);
            }
          }
          if (sources.length === 0) sources.push("게임 내 확인 필요");

          materials[nameEn] = { nameEn, nameKo, enDesc: effect, sources };
        }
      }
    }

    const outputPath = path.resolve(process.cwd(), 'common-hub/data/trace_materials_api_result.json');
    fs.writeFileSync(outputPath, JSON.stringify(materials, null, 2), 'utf-8');
    console.log(`\n✅ [Success] ${Object.keys(materials).length}개의 행적 재료 추출 완료!`);
  } catch (error: any) { console.error('❌ Error:', error.message); }
}

fetchTraceMaterialsAPI();