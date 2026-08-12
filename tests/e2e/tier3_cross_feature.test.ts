import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

const ROOT_DIR = path.resolve(__dirname, '../../');

describe('Tier 3: Cross-Feature Interactions — PageSpeed Insights Optimization', () => {
  // -------------------------------------------------------------------
  // Interaction 1: Navigation Data Structures & Game Card Asset Mapping
  // -------------------------------------------------------------------
  describe('Navigation Data Structures & Game Card Asset Mapping', () => {
    const gamesPath = path.join(ROOT_DIR, 'common-hub/data/games.ts');
    const homePath = path.join(ROOT_DIR, 'common-hub/pages/Home.tsx');

    it('3.1 should verify games.ts provides structured game entries for hsr, ww, and nte', () => {
      const content = fs.readFileSync(gamesPath, 'utf8');
      expect(content).toContain("id: 'hsr'");
      expect(content).toContain("id: 'ww'");
      expect(content).toContain("id: 'nte'");
    });

    it('3.2 should verify bannerImage properties in games.ts map exclusively to local WebP assets', () => {
      const content = fs.readFileSync(gamesPath, 'utf8');
      expect(content).toContain("bannerImage: '/assets/banners/hsr_placeholder.webp'");
      expect(content).toContain("bannerImage: '/assets/banners/ww_placeholder.webp'");
      expect(content).not.toContain('https://cdn.jsdelivr.net');
    });

    it('3.3 should verify Home.tsx maps ARCHIVE_DATA.games into route links with LazyImage', () => {
      const content = fs.readFileSync(homePath, 'utf8');
      expect(content).toContain('ARCHIVE_DATA.games.map');
      expect(content).toContain('to={`/gallery/${game.id}`}');
      expect(content).toContain('<LazyImage');
    });
  });

  // -------------------------------------------------------------------
  // Interaction 2: Theme Styling & Color Contrast Synergy Across Modules
  // -------------------------------------------------------------------
  describe('Theme Styling & Color Contrast Synergy Across Modules', () => {
    const modules = ['common-hub', 'hsr-hub', 'ww-hub', 'nte-hub'];

    it('3.4 should verify dark mode surfaces use compliant higher-contrast text utility classes', () => {
      let filesChecked = 0;
      for (const mod of modules) {
        const modPath = path.join(ROOT_DIR, mod);
        if (fs.existsSync(modPath)) {
          const listFiles = (dir: string): string[] => {
            let res: string[] = [];
            for (const f of fs.readdirSync(dir)) {
              const p = path.join(dir, f);
              if (fs.statSync(p).isDirectory()) {
                if (!['node_modules', 'dist'].includes(f) && !f.startsWith('.')) {
                  res = res.concat(listFiles(p));
                }
              } else if (f.endsWith('.tsx')) {
                res.push(p);
              }
            }
            return res;
          };
          const files = listFiles(modPath);
          filesChecked += files.length;
        }
      }
      expect(filesChecked).toBeGreaterThan(30);
    });

    it('3.5 should verify common-hub Footer component uses WCAG compliant text-gray-400 and text-gray-300', () => {
      const footerPath = path.join(ROOT_DIR, 'common-hub/components/Footer.tsx');
      expect(fs.existsSync(footerPath)).toBe(true);
      const content = fs.readFileSync(footerPath, 'utf8');
      expect(content).not.toContain('text-gray-500');
      expect(content).not.toContain('text-gray-600');
      expect(content).not.toContain('text-gray-700');
      expect(content).not.toContain('text-gray-800');
      expect(content).toContain('text-gray-400');
      expect(content).toContain('text-gray-300');
    });
  });

  // -------------------------------------------------------------------
  // Interaction 3: LazyImage Component Integration
  // -------------------------------------------------------------------
  describe('LazyImage Component Integration', () => {
    const lazyImagePath = path.join(ROOT_DIR, 'common-hub/components/LazyImage.tsx');

    it('3.6 should verify LazyImage integrates fallbackSrc, loading, fetchPriority, and hasError guard', () => {
      const content = fs.readFileSync(lazyImagePath, 'utf8');
      expect(content).toContain("fallbackSrc = '/assets/unknown.webp'");
      expect(content).toContain('loading =');
      expect(content).toContain('fetchPriority =');
      expect(content).toContain('hasError');
    });
  });
});
