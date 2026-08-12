import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

const ROOT_DIR = path.resolve(__dirname, '../../');

describe('Tier 1: Feature Coverage — PageSpeed Insights Optimization', () => {
  // -------------------------------------------------------------------
  // Requirement R1: WebP Banner Asset Existence & Compression
  // -------------------------------------------------------------------
  describe('WebP Banner Asset Existence & Compression', () => {
    const hsrWebpPath = path.join(ROOT_DIR, 'public/assets/banners/hsr_placeholder.webp');
    const wwWebpPath = path.join(ROOT_DIR, 'public/assets/banners/ww_placeholder.webp');

    it('1.1 should verify hsr_placeholder.webp exists in public/assets/banners/', () => {
      expect(fs.existsSync(hsrWebpPath)).toBe(true);
    });

    it('1.2 should verify ww_placeholder.webp exists in public/assets/banners/', () => {
      expect(fs.existsSync(wwWebpPath)).toBe(true);
    });

    it('1.3 should verify hsr_placeholder.webp file size is under 70KB (71,680 bytes)', () => {
      if (fs.existsSync(hsrWebpPath)) {
        const stats = fs.statSync(hsrWebpPath);
        expect(stats.size).toBeLessThan(71680);
        expect(stats.size).toBeGreaterThan(0);
      }
    });

    it('1.4 should verify ww_placeholder.webp file size is under 70KB (71,680 bytes)', () => {
      if (fs.existsSync(wwWebpPath)) {
        const stats = fs.statSync(wwWebpPath);
        expect(stats.size).toBeLessThan(71680);
        expect(stats.size).toBeGreaterThan(0);
      }
    });

    it('1.5 should verify banner assets contain valid RIFF/WEBP magic headers', () => {
      if (fs.existsSync(hsrWebpPath)) {
        const buffer = fs.readFileSync(hsrWebpPath);
        const header = buffer.toString('utf8', 0, 4);
        const format = buffer.toString('utf8', 8, 12);
        expect(header).toBe('RIFF');
        expect(format).toBe('WEBP');
      }
      if (fs.existsSync(wwWebpPath)) {
        const buffer = fs.readFileSync(wwWebpPath);
        const header = buffer.toString('utf8', 0, 4);
        const format = buffer.toString('utf8', 8, 12);
        expect(header).toBe('RIFF');
        expect(format).toBe('WEBP');
      }
    });
  });

  // -------------------------------------------------------------------
  // Requirement R1: Home Page WebP Asset References
  // -------------------------------------------------------------------
  describe('Home Page WebP Asset References', () => {
    const homePath = path.join(ROOT_DIR, 'common-hub/pages/Home.tsx');

    it('1.6 should verify Home.tsx exists', () => {
      expect(fs.existsSync(homePath)).toBe(true);
    });

    it('1.7 should verify Home.tsx references WebP banner assets', () => {
      const content = fs.readFileSync(homePath, 'utf8');
      expect(content).toContain('/assets/banners/hsr_placeholder.webp');
      expect(content).toContain('/assets/banners/ww_placeholder.webp');
    });

    it('1.8 should verify zero legacy .png banner references in Home.tsx', () => {
      const content = fs.readFileSync(homePath, 'utf8');
      expect(content).not.toContain('hsr_placeholder.png');
      expect(content).not.toContain('ww_placeholder.png');
    });
  });

  // -------------------------------------------------------------------
  // Requirement R2: Global WCAG AA/AAA Color Contrast Optimization
  // -------------------------------------------------------------------
  describe('Global WCAG Color Contrast Optimization', () => {
    const modules = ['common-hub', 'hsr-hub', 'ww-hub', 'nte-hub'];
    const forbiddenClasses = [
      'text-gray-500',
      'text-gray-600',
      'text-gray-700',
      'text-gray-800',
      'text-gray-900',
      'placeholder:text-gray-600',
      'placeholder:text-gray-800',
    ];

    function getSourceFiles(dir: string): string[] {
      let results: string[] = [];
      if (!fs.existsSync(dir)) return results;
      const list = fs.readdirSync(dir);
      for (const file of list) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat && stat.isDirectory()) {
          if (file !== 'node_modules' && file !== 'dist' && !file.startsWith('.')) {
            results = results.concat(getSourceFiles(fullPath));
          }
        } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
          results.push(fullPath);
        }
      }
      return results;
    }

    it('1.9 should verify zero low-contrast text classes across all hub modules', () => {
      const violations: { file: string; forbidden: string }[] = [];
      for (const mod of modules) {
        const dirPath = path.join(ROOT_DIR, mod);
        const files = getSourceFiles(dirPath);
        for (const file of files) {
          const content = fs.readFileSync(file, 'utf8');
          for (const forbidden of forbiddenClasses) {
            // Regex match for class usage word boundary
            const regex = new RegExp(`\\b${forbidden.replace(':', '\\:')}\\b`, 'g');
            if (regex.test(content)) {
              violations.push({ file: path.relative(ROOT_DIR, file), forbidden });
            }
          }
        }
      }
      expect(violations).toEqual([]);
    });

    it('1.10 should verify higher-contrast text-gray-400 and text-gray-300 are actively used', () => {
      let textGray400Count = 0;
      let textGray300Count = 0;
      for (const mod of modules) {
        const dirPath = path.join(ROOT_DIR, mod);
        const files = getSourceFiles(dirPath);
        for (const file of files) {
          const content = fs.readFileSync(file, 'utf8');
          if (content.includes('text-gray-400')) textGray400Count++;
          if (content.includes('text-gray-300')) textGray300Count++;
        }
      }
      expect(textGray400Count).toBeGreaterThan(10);
      expect(textGray300Count).toBeGreaterThan(10);
    });
  });

  // -------------------------------------------------------------------
  // Requirement R3: 404 Resource Paths & Fallback Configuration
  // -------------------------------------------------------------------
  describe('404 Resource Paths & Fallback Asset Configuration', () => {
    const gamesPath = path.join(ROOT_DIR, 'common-hub/data/games.ts');
    const unknownWebpPath = path.join(ROOT_DIR, 'public/assets/unknown.webp');

    it('1.11 should verify games.ts sets bannerImage to local valid WebP assets', () => {
      const content = fs.readFileSync(gamesPath, 'utf8');
      expect(content).toContain('/assets/banners/hsr_placeholder.webp');
      expect(content).toContain('/assets/banners/ww_placeholder.webp');
      expect(content).not.toContain('ww_main.webp');
    });

    it('1.12 should verify fallback asset public/assets/unknown.webp exists locally', () => {
      expect(fs.existsSync(unknownWebpPath)).toBe(true);
      if (fs.existsSync(unknownWebpPath)) {
        const stats = fs.statSync(unknownWebpPath);
        expect(stats.size).toBeGreaterThan(0);
      }
    });
  });
});
