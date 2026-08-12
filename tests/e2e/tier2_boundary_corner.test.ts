import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

const ROOT_DIR = path.resolve(__dirname, '../../');

describe('Tier 2: Boundary & Corner Cases — PageSpeed Insights Optimization', () => {
  // -------------------------------------------------------------------
  // Missing Asset Fallback Handling
  // -------------------------------------------------------------------
  describe('Missing Asset Fallback Handling', () => {
    const lazyImagePath = path.join(ROOT_DIR, 'common-hub/components/LazyImage.tsx');
    const gameDashboardPath = path.join(ROOT_DIR, 'common-hub/components/GameDashboard.tsx');
    const galleryModalsPath = path.join(ROOT_DIR, 'common-hub/components/GalleryModals.tsx');

    it('2.1 should verify LazyImage.tsx fallbackSrc defaults to /assets/unknown.webp', () => {
      expect(fs.existsSync(lazyImagePath)).toBe(true);
      const content = fs.readFileSync(lazyImagePath, 'utf8');
      expect(content).toContain("fallbackSrc = '/assets/unknown.webp'");
    });

    it('2.2 should verify GameDashboard.tsx onError fallback points to /assets/unknown.webp', () => {
      expect(fs.existsSync(gameDashboardPath)).toBe(true);
      const content = fs.readFileSync(gameDashboardPath, 'utf8');
      expect(content).toContain('/assets/unknown.webp');
    });

    it('2.3 should verify GalleryModals.tsx onError fallback points to /assets/unknown.webp', () => {
      expect(fs.existsSync(galleryModalsPath)).toBe(true);
      const content = fs.readFileSync(galleryModalsPath, 'utf8');
      expect(content).toContain('/assets/unknown.webp');
    });

    it('2.4 should verify zero remote CDN unknown.webp fallback URLs remain in codebase', () => {
      const forbiddenRemoteUrls = [
        'raw.githubusercontent.com/IZrira/riragameinfo/main/hsr%20images/items/unknown.webp',
        'cdn.jsdelivr.net/gh/IZrira/riragameinfo@main/hsr%20images/items/unknown.webp',
      ];
      const filesToCheck = [lazyImagePath, gameDashboardPath, galleryModalsPath];
      for (const file of filesToCheck) {
        if (fs.existsSync(file)) {
          const content = fs.readFileSync(file, 'utf8');
          for (const forbidden of forbiddenRemoteUrls) {
            expect(content).not.toContain(forbidden);
          }
        }
      }
    });
  });

  // -------------------------------------------------------------------
  // Layout Shift (CLS) Prevention
  // -------------------------------------------------------------------
  describe('Layout Shift (CLS) Prevention', () => {
    const homePath = path.join(ROOT_DIR, 'common-hub/pages/Home.tsx');

    it('2.5 should verify Home.tsx includes explicit width attribute on LazyImage', () => {
      const content = fs.readFileSync(homePath, 'utf8');
      expect(content).toMatch(/<LazyImage[\s\S]*?width=\{1024\}/);
    });

    it('2.6 should verify Home.tsx includes explicit height attribute on LazyImage', () => {
      const content = fs.readFileSync(homePath, 'utf8');
      expect(content).toMatch(/<LazyImage[\s\S]*?height=\{1024\}/);
    });

    it('2.7 should verify LazyImage component passes width and height through ...props to underlying <img> tag', () => {
      const lazyImagePath = path.join(ROOT_DIR, 'common-hub/components/LazyImage.tsx');
      const content = fs.readFileSync(lazyImagePath, 'utf8');
      expect(content).toContain('{...props}');
    });
  });

  // -------------------------------------------------------------------
  // Image Error Fallback Loop Prevention
  // -------------------------------------------------------------------
  describe('Image Error Fallback Loop Prevention', () => {
    const lazyImagePath = path.join(ROOT_DIR, 'common-hub/components/LazyImage.tsx');

    it('2.8 should verify LazyImage.tsx contains hasError state protection', () => {
      const content = fs.readFileSync(lazyImagePath, 'utf8');
      expect(content).toContain('hasError');
      expect(content).toContain('setHasError');
    });

    it('2.9 should verify onError handler prevents infinite loop by checking hasError state', () => {
      const content = fs.readFileSync(lazyImagePath, 'utf8');
      // Verify setHasError is conditional or image src uses hasError state
      expect(content).toMatch(/src=\{hasError\s*\?\s*fallbackSrc\s*:\s*src\}/);
      expect(content).toMatch(/onError=\{[\s\S]*?if\s*\(!hasError\)\s*\{\s*setHasError\(true\);?\s*\}/);
    });

    it('2.10 should verify skeleton pulse animation stops when image load fails', () => {
      const content = fs.readFileSync(lazyImagePath, 'utf8');
      expect(content).toContain('!isLoaded && !hasError');
    });
  });
});
