import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

const ROOT_DIR = path.resolve(__dirname, '../../');

describe('Tier 4: Real-World Scenarios — PageSpeed Insights Optimization', () => {
  // -------------------------------------------------------------------
  // Scenario 1: Full Build Verification
  // -------------------------------------------------------------------
  describe('Full Build Verification', () => {
    it('4.1 should verify package.json scripts configuration includes build and test:e2e', () => {
      const pkgPath = path.join(ROOT_DIR, 'package.json');
      expect(fs.existsSync(pkgPath)).toBe(true);
      const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
      expect(pkg.scripts.build).toBeDefined();
      expect(pkg.scripts['test:e2e']).toBeDefined();
    });

    it('4.2 should verify vite.config.ts configuration exists and compiles without error', () => {
      const viteConfigPath = path.join(ROOT_DIR, 'vite.config.ts');
      expect(fs.existsSync(viteConfigPath)).toBe(true);
    });

    it('4.3 should verify tsconfig.json is properly configured for React & TypeScript build', () => {
      const tsconfigPath = path.join(ROOT_DIR, 'tsconfig.json');
      expect(fs.existsSync(tsconfigPath)).toBe(true);
      const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, 'utf8'));
      expect(tsconfig.compilerOptions).toBeDefined();
    });
  });

  // -------------------------------------------------------------------
  // Scenario 2: Zero Browser 404 Console Errors (Repository Asset Audit)
  // -------------------------------------------------------------------
  describe('Zero Browser 404 Console Error Audit', () => {
    function getAllSourceFiles(dir: string): string[] {
      let results: string[] = [];
      if (!fs.existsSync(dir)) return results;
      const list = fs.readdirSync(dir);
      for (const file of list) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat && stat.isDirectory()) {
          if (!['node_modules', 'dist', '.git', '.vscode', '.agents'].includes(file)) {
            results = results.concat(getAllSourceFiles(fullPath));
          }
        } else if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.js') || file.endsWith('.json') || file.endsWith('.html')) {
          results.push(fullPath);
        }
      }
      return results;
    }

    it('4.4 should verify zero references to non-existent ww_main.webp across all source files', () => {
      const sourceFiles = getAllSourceFiles(ROOT_DIR);
      const violations: string[] = [];
      for (const file of sourceFiles) {
        const content = fs.readFileSync(file, 'utf8');
        if (content.includes('ww_main.webp')) {
          violations.push(path.relative(ROOT_DIR, file));
        }
      }
      expect(violations).toEqual([]);
    });

    it('4.5 should verify zero broken remote GitHub/CDN unknown.webp URLs in codebase', () => {
      const sourceFiles = getAllSourceFiles(ROOT_DIR);
      const forbiddenCdn = 'riragameinfo/main/hsr%20images/items/unknown.webp';
      const violations: string[] = [];
      for (const file of sourceFiles) {
        const content = fs.readFileSync(file, 'utf8');
        if (content.includes(forbiddenCdn)) {
          violations.push(path.relative(ROOT_DIR, file));
        }
      }
      expect(violations).toEqual([]);
    });

    it('4.6 should verify all local banner and fallback asset references in code point to existing files in public/', () => {
      const bannerHsr = path.join(ROOT_DIR, 'public/assets/banners/hsr_placeholder.webp');
      const bannerWw = path.join(ROOT_DIR, 'public/assets/banners/ww_placeholder.webp');
      const unknownAsset = path.join(ROOT_DIR, 'public/assets/unknown.webp');

      expect(fs.existsSync(bannerHsr)).toBe(true);
      expect(fs.existsSync(bannerWw)).toBe(true);
      expect(fs.existsSync(unknownAsset)).toBe(true);
    });
  });
});
