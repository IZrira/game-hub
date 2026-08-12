# Handoff Report — Survey Explorer 1 (R1 Investigation)

## 1. Observation

### Asset Location, File Size & Format Analysis
- **File 1**: `c:\Users\User\Desktop\rira game hub\game-hub\public\assets\banners\hsr_placeholder.png`
  - Exact Byte Size: `964,719` bytes (~964.7 KB / 942.1 KiB)
  - Dimensions: `1024 x 1024` pixels
  - Internal File Format: JPEG (JFIF header `0xFF 0xD8 0xFF 0xE0`, despite `.png` file extension)
- **File 2**: `c:\Users\User\Desktop\rira game hub\game-hub\public\assets\banners\ww_placeholder.png`
  - Exact Byte Size: `948,251` bytes (~948.3 KB / 926.0 KiB)
  - Dimensions: `1024 x 1024` pixels
  - Internal File Format: JPEG (JFIF header `0xFF 0xD8 0xFF 0xE0`, despite `.png` file extension)
- **Total Banner Size**: `1,912,970` bytes (~1.91 MB)

### Codebase Search & References
- **`common-hub/pages/Home.tsx`** (Lines 197–204):
```tsx
<LazyImage 
  src={game.id === 'hsr' ? '/assets/banners/hsr_placeholder.png' : game.id === 'ww' ? '/assets/banners/ww_placeholder.png' : game.bannerImage} 
  alt={`${game.title} - ${t('리라 아카이브 게임 데이터베이스 탐색')}`}
  loading="eager"
  fetchPriority={index === 0 ? "high" : "auto"}
  containerClassName="absolute inset-0 w-full h-full"
  className="w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
/>
```
- **`common-hub/data/games.ts`** (Lines 27, 34, 41):
  - Defines remote fallback `bannerImage` URLs: `https://cdn.jsdelivr.net/gh/IZrira/riragameinfo@main/hsr images/banners/hsr_main.webp` and `ww_main.webp`.
- **`common-hub/components/LazyImage.tsx`** (Lines 34–51):
  - Renders an `<img>` tag and passes through `...props` (e.g. `width`, `height`, `style`).

### CLS (Cumulative Layout Shift) Assessment
- The `<LazyImage />` invocation in `common-hub/pages/Home.tsx` (lines 197-204) currently **does not** specify `width`, `height`, or `style={{ aspectRatio: '...' }}` props.
- Although the parent `<Link>` container uses Tailwind CSS class `h-[480px]`, the underlying HTML `<img>` tag rendered by `LazyImage` has no intrinsic `width`/`height` attributes, leading PageSpeed Insights to flag potential Cumulative Layout Shift (CLS) during initial page load.

---

## 2. Logic Chain

1. **Observation**: `public/assets/banners/hsr_placeholder.png` (964,719 bytes) and `ww_placeholder.png` (948,251 bytes) total ~1.91 MB in uncompressed JPEG format disguised as PNG files.
2. **Logic Step 1**: Uncompressed JPEG images disguised as `.png` served as LCP banner assets consume significant network bandwidth, slowing down LCP (Largest Contentful Paint) metrics.
3. **Logic Step 2**: Converting these assets to compressed WebP format (e.g. at 80% quality or resized to display targets) will reduce asset sizes from ~960 KB down to ~30–70 KB (~90%+ file size reduction), directly resolving the LCP performance bottleneck.
4. **Observation**: `common-hub/pages/Home.tsx` line 198 explicitly hardcodes paths `/assets/banners/hsr_placeholder.png` and `/assets/banners/ww_placeholder.png`.
5. **Logic Step 3**: Converting the assets to WebP format (`hsr_placeholder.webp` and `ww_placeholder.webp`) requires updating the `src` paths in `common-hub/pages/Home.tsx` to match.
6. **Observation**: `<LazyImage>` in `Home.tsx` lacks explicit `width` and `height` attributes or CSS `aspect-ratio`.
7. **Logic Step 4**: Adding `width={1024}` and `height={1024}` (or explicit width/height and `aspect-ratio` styles) to the `<LazyImage />` component in `Home.tsx` will emit `<img width="1024" height="1024" ... />`, allowing modern browsers to reserve proper aspect ratio space prior to image loading, thereby eliminating CLS (Cumulative Layout Shift).

---

## 3. Caveats

- **Existing PNG files**: Replacing or removing `.png` files in favor of `.webp` files is recommended. If legacy references exist outside the repo (e.g., external links), keeping redirected or fallback files might be considered, though within this codebase no other references to `hsr_placeholder.png` or `ww_placeholder.png` exist outside `Home.tsx`.
- **Remote CDN Banners**: `ARCHIVE_DATA.games` in `common-hub/data/games.ts` contains remote fallback URLs (`bannerImage`). In `Home.tsx`, `hsr` and `ww` override `game.bannerImage` with local `/assets/banners/*` placeholders. `nte` game uses `game.bannerImage`.

---

## 4. Conclusion

To achieve PageSpeed Insights Optimization for Requirement R1:
1. **Convert Image Assets**:
   - `public/assets/banners/hsr_placeholder.png` (964.7 KB) → `public/assets/banners/hsr_placeholder.webp` (<70 KB).
   - `public/assets/banners/ww_placeholder.png` (948.3 KB) → `public/assets/banners/ww_placeholder.webp` (<70 KB).
2. **Update Code References**:
   - `common-hub/pages/Home.tsx` (Line 198): Change `.png` extensions to `.webp`.
   - `common-hub/pages/Home.tsx` (Lines 197–204): Add `width={1024}` and `height={1024}` props (and/or explicit `aspect-ratio` styling) to `<LazyImage />` to prevent CLS.

---

## 5. Verification Method

### Command Verification
- Check exact file sizes of converted WebP assets:
  ```bash
  node -e "const fs = require('fs'); console.log('HSR WebP:', fs.statSync('public/assets/banners/hsr_placeholder.webp').size, 'bytes'); console.log('WW WebP:', fs.statSync('public/assets/banners/ww_placeholder.webp').size, 'bytes');"
  ```
- Search for any remaining `.png` banner references:
  ```bash
  npx rimraf node_modules/.cache && git grep "hsr_placeholder.png"
  ```

### File Inspection
- Confirm `common-hub/pages/Home.tsx` uses `/assets/banners/hsr_placeholder.webp` and `/assets/banners/ww_placeholder.webp`.
- Confirm `<LazyImage />` in `Home.tsx` includes `width` and `height` attributes.

### Build Verification
- Execute project build check:
  ```bash
  npm run build
  ```
