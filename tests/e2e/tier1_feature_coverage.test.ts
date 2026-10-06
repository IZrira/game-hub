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
  // Requirement R2: Core navigation contrast
  // -------------------------------------------------------------------
  describe('Global WCAG Color Contrast Optimization', () => {
    const homePath = path.join(ROOT_DIR, 'common-hub/pages/Home.tsx');
    const footerPath = path.join(ROOT_DIR, 'common-hub/components/Footer.tsx');

    it('1.9 should use readable neutral text colors in primary navigation surfaces', () => {
      const content = `${fs.readFileSync(homePath, 'utf8')}\n${fs.readFileSync(footerPath, 'utf8')}`;
      expect(content).toContain('text-gray-400');
      expect(content).not.toContain('text-gray-700');
      expect(content).not.toContain('text-gray-800');
    });

    it('1.10 should keep homepage supporting copy at gray-400 or brighter', () => {
      const content = fs.readFileSync(homePath, 'utf8');
      expect(content).toContain('text-gray-400');
      expect(content).not.toContain('text-gray-600');
    });
  });

  // -------------------------------------------------------------------
  // Requirement R3: 404 Resource Paths & Fallback Configuration
  // -------------------------------------------------------------------
  describe('404 Resource Paths & Fallback Asset Configuration', () => {
    const gamesPath = path.join(ROOT_DIR, 'common-hub/data/archive.ts');
    const unknownWebpPath = path.join(ROOT_DIR, 'public/assets/unknown.webp');

    it('1.11 should verify archive data sets bannerImage to local assets', () => {
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
