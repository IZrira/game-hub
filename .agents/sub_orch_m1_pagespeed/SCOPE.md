# Scope: Milestone 1 - R1 WebP Image Size & CLS Optimization

## Architecture
- Image Assets: `public/assets/banners/hsr_placeholder.webp`, `public/assets/banners/ww_placeholder.webp`
- Page Component: `common-hub/pages/Home.tsx`
- Image Component: `common-hub/components/LazyImage.tsx`

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | WebP Banner Conversion | Convert `hsr_placeholder.png` and `ww_placeholder.png` (~900KB each) to compressed WebP format (`hsr_placeholder.webp`, `ww_placeholder.webp`) aiming for ~30-70KB file sizes | M1 | Survey Explorer 1 |
| 2 | Home Page WebP References & CLS Prevention | Update `common-hub/pages/Home.tsx` to reference `.webp` banner assets and pass explicit `width={1024}` and `height={1024}` props to `<LazyImage />` | M1 | Survey Explorer 1 |

## Code Layout
- `public/assets/banners/hsr_placeholder.webp`: Converted WebP asset
- `public/assets/banners/ww_placeholder.webp`: Converted WebP asset
- `common-hub/pages/Home.tsx`: References `.webp` assets and passes `width={1024}` / `height={1024}` to `<LazyImage />`
