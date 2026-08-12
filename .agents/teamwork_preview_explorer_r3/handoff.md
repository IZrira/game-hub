# Handoff Report — Requirement R3: Resolve 404 Resource Errors

## 1. Observation

Direct investigation of the codebase revealed the precise file locations, line numbers, and URLs causing 404 Not Found resource errors in the browser console:

### A. `ww_main.webp` 404 Error Source
- **`common-hub/data/games.ts`**:
  - Line 34: `bannerImage: 'https://cdn.jsdelivr.net/gh/IZrira/riragameinfo@main/hsr images/banners/ww_main.webp'` (for game ID `'ww'`)
  - Line 41: `bannerImage: 'https://cdn.jsdelivr.net/gh/IZrira/riragameinfo@main/hsr images/banners/ww_main.webp'` (for game ID `'nte'`)
- **`common-hub/components/GameDashboard.tsx`**:
  - Line 150: `<img src={game.bannerImage} alt={game.title} className="w-full h-[400px] object-cover opacity-20 mask-image-b-0" />`
- **`common-hub/components/GameCard.tsx`**:
  - Line 20: `<LazyImage src={game.bannerImage} alt={game.title} ... />`
- **`common-hub/pages/Home.tsx`**:
  - Line 198: `<LazyImage src={game.id === 'hsr' ? '/assets/banners/hsr_placeholder.png' : game.id === 'ww' ? '/assets/banners/ww_placeholder.png' : game.bannerImage} ... />`
- **Local Filesystem Audit**:
  - Running `find_by_name` on `public/assets/banners` confirmed existing local banner files: `hsr_placeholder.png` and `ww_placeholder.png` (which are being converted to WebP under Requirement R1).
  - No `ww_main.webp` file exists in `/public/` or in the remote CDN repository `IZrira/riragameinfo`.

### B. `unknown.webp` 404 Error Source
- **`common-hub/components/LazyImage.tsx`**:
  - Line 16: `fallbackSrc = 'https://raw.githubusercontent.com/IZrira/riragameinfo/main/hsr%20images/items/unknown.webp'`
- **`common-hub/components/GameDashboard.tsx`**:
  - Line 221: `onError={(e) => { (e.target as HTMLImageElement).src = \`${CDN_URL}/hsr%20images/items/unknown.webp\`; }}`
  - Line 268: `onError={(e) => { (e.target as HTMLImageElement).src = \`${CDN_URL}/hsr%20images/items/unknown.webp\`; }}`
- **`common-hub/components/GalleryModals.tsx`**:
  - Line 150: `e.currentTarget.src = "https://cdn.jsdelivr.net/gh/IZrira/riragameinfo@main/hsr%20images/items/unknown.webp";`
- **Local Filesystem Audit**:
  - No `unknown.webp` file exists in `/public/` or in the remote CDN repository `IZrira/riragameinfo`.

---

## 2. Logic Chain

1. **`ww_main.webp` 404 Origin**:
   - `ARCHIVE_DATA` in `common-hub/data/games.ts` sets `bannerImage` for Wuthering Waves (`ww`) and NTE (`nte`) to `'https://cdn.jsdelivr.net/gh/IZrira/riragameinfo@main/hsr images/banners/ww_main.webp'`.
   - This URL has a path error (`hsr images/banners/ww_main.webp` misgroups WW under HSR) and points to a non-existent remote file on the CDN.
   - When a user views the WW or NTE dashboard or game cards, components (`GameDashboard.tsx:150` and `GameCard.tsx:20`) attempt to fetch this image over HTTP.
   - The CDN responds with `404 Not Found`, generating a 404 error in the browser console.

2. **`unknown.webp` 404 Origin**:
   - `LazyImage.tsx:16` sets default `fallbackSrc` to `'https://raw.githubusercontent.com/IZrira/riragameinfo/main/hsr%20images/items/unknown.webp'`.
   - `GameDashboard.tsx:221,268` and `GalleryModals.tsx:150` use `${CDN_URL}/hsr%20images/items/unknown.webp` as their `onError` error fallback.
   - When any primary image fails to load (such as `ww_main.webp` in `LazyImage`, or missing character/item art), the component triggers its `onError` handler and updates `src` to `unknown.webp`.
   - Because `unknown.webp` does not exist on CDN or locally, the browser issues a second HTTP request for `unknown.webp`, which fails with `404 Not Found`.

3. **Cascading Failure**:
   - Loading a card with broken `ww_main.webp` triggers a primary 404 (`ww_main.webp`), followed immediately by `LazyImage`'s `onError` triggering a secondary 404 (`unknown.webp`).

---

## 3. Caveats

- Requirement R1 is converting `/public/assets/banners/hsr_placeholder.png` and `ww_placeholder.png` to `.webp` format. The proposed R3 fix assumes banner images will be referenced as `/assets/banners/hsr_placeholder.webp` and `/assets/banners/ww_placeholder.webp` (or `.png` as backward-compatible fallback if WebP conversion is pending).
- No code modifications were performed during this read-only investigation.

---

## 4. Conclusion & Fix Plan

To completely resolve all 404 resource errors in the browser console, implement the following targeted fixes:

### Step 1: Update Game Banner References (`common-hub/data/games.ts`)
Update `ARCHIVE_DATA` bannerImage paths to point to local WebP assets:
```typescript
// common-hub/data/games.ts
export const ARCHIVE_DATA: ArchiveData = {
  games: [
    {
      id: 'hsr',
      title: '붕괴: 스타레일',
      subTitle: 'Honkai: Star Rail Archive',
      bannerImage: '/assets/banners/hsr_placeholder.webp',
      posts: []
    },
    {
      id: 'ww',
      title: '명조: 워더링 웨이브',
      subTitle: 'Wuthering Waves Archive',
      bannerImage: '/assets/banners/ww_placeholder.webp',
      posts: []
    },
    {
      id: 'nte',
      title: '이환',
      subTitle: 'Neverness to Everness Archive',
      bannerImage: '/assets/banners/ww_placeholder.webp',
      posts: []
    }
  ]
};
```

### Step 2: Simplify Component Banner Usage (`common-hub/pages/Home.tsx`)
In `common-hub/pages/Home.tsx` (Line 198), remove inline ternary path overrides and use `game.bannerImage` directly:
```tsx
<LazyImage 
  src={game.bannerImage} 
  alt={`${game.title} - ${t('리라 아카이브 게임 데이터베이스 탐색')}`}
  ...
/>
```

### Step 3: Add Local Fallback Asset (`/public/assets/unknown.webp`)
Create a valid local WebP/SVG fallback file at `/public/assets/unknown.webp` (a clean neutral item/portrait placeholder image).

### Step 4: Update Fallback Handlers & Prevent Double 404 Requests
1. **`common-hub/components/LazyImage.tsx`**:
   Update `fallbackSrc` default value to point to `/assets/unknown.webp`, and prevent infinite error looping:
   ```tsx
   const LazyImage = memo(({ 
     src, 
     alt, 
     fallbackSrc = '/assets/unknown.webp',
     containerClassName = '',
     className = '',
     loading = 'lazy',
     fetchPriority = 'auto',
     ...props 
   }: LazyImageProps) => {
     const [isLoaded, setIsLoaded] = useState(false);
     const [hasError, setHasError] = useState(false);

     return (
       <div className={`relative overflow-hidden ${containerClassName}`}>
         {!isLoaded && !hasError && (
           <div className="absolute inset-0 bg-white/5 animate-pulse rounded-inherit" />
         )}
         <img
           src={hasError ? fallbackSrc : src}
           alt={alt}
           loading={loading}
           fetchPriority={fetchPriority}
           decoding="async"
           onLoad={() => setIsLoaded(true)}
           onError={() => {
             if (!hasError) {
               setHasError(true);
             }
             setIsLoaded(true);
           }}
           className={`
             transition-opacity duration-500 ease-in-out
             ${isLoaded ? 'opacity-100' : 'opacity-0'} 
             ${className}
           `}
           {...props}
         />
       </div>
     );
   });
   ```

2. **`common-hub/components/GameDashboard.tsx`**:
   Update lines 221 and 268 `onError` handlers:
   ```tsx
   onError={(e) => {
     (e.target as HTMLImageElement).src = '/assets/unknown.webp';
   }}
   ```

3. **`common-hub/components/GalleryModals.tsx`**:
   Update line 150 `onError` handler:
   ```tsx
   e.currentTarget.src = "/assets/unknown.webp";
   ```

---

## 5. Verification Method

1. **Codebase Inspection**:
   - Run `grep_search` for `ww_main.webp` and verify 0 active references remaining.
   - Run `grep_search` for `raw.githubusercontent.com/IZrira/riragameinfo/main/hsr%20images/items/unknown.webp` and verify 0 references remaining.

2. **Browser Verification**:
   - Start dev server (`npm run dev`) or preview build.
   - Open browser developer tools Console tab and Network tab.
   - Navigate to `/` (Home), `/gallery/hsr`, `/gallery/ww`, and `/gallery/nte`.
   - Verify zero HTTP 404 errors for `ww_main.webp` or `unknown.webp`.

3. **Build Check**:
   - Execute `npm run build` in root workspace and verify build completes with exit code 0.
