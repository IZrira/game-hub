# Rira Game Hub Design System

This document serves as the **Source of Truth** for the visual language and component architecture of the Rira Game Hub. AI agents and developers must strictly adhere to these standards to ensure consistency across all game hubs.

## 1. Design Tokens

### Colors
- **Global Background**: `#0a0a0a` (Solid), `#121212` (Card surfaces)
- **HSR Theme**: `#7E30E1` (Primary), `#E26EE5` (Secondary)
- **WW Theme**: `#EAB308` (Primary), `#FDE047` (Secondary)
- **NTE Theme**: `#00D287` (Primary), `#34D399` (Secondary)
- **System**: `#FFD600` (Accent/Numbers), `#00E676` (Success/Aero), `#FF5252` (Error/Havoc)

### Glassmorphism (Glass Card)
Standard definition for `glass-card`:
- **Background**: `bg-white/[0.03]` or `bg-[#0f0f0f]/40`
- **Blur**: `backdrop-blur-md` or `backdrop-blur-xl`
- **Border**: `border-white/5` or `border-white/10`
- **Shadow**: `shadow-2xl`

### Typography
- **Primary Font**: `font-sans` (Inter/Outfit preferred)
- **Headings**: `font-black`, `italic`, `tracking-tighter`, `uppercase`
- **Data/Numbers**: `font-black`, `tabular-nums`

---

## 2. Layout & Grid Standards

### Main Container
- **Max Width**: `max-w-[1600px]`
- **Alignment**: `mx-auto`
- **Responsive Padding**: `px-4 md:px-8`

### Image Asset Standards (CDN)
- **GitHub CDN Integration**: All images are loaded from the official GitHub repository via `raw.githubusercontent.com` or `cdn.jsdelivr.net`.
- **Game Directories**: `hsr images/`, `ww images/`, `nte images/`
- **Naming Conventions**: 
  - Standard formatting: `[Korean Folder Name]/[Image Type].webp` (e.g., `portrait.png`, `art01.webp`).
  - **NTE Compliance Rule**: If a Neverness to Everness (NTE) asset contains a colon (`:`) in its name, it **must** be replaced with an underscore (`_`) in the URL path to ensure GitHub and Windows file system compatibility.

### Standard Grid Patterns
- **Detail Pages**: 
  - Left Column: `lg:grid-cols-[550px_1fr]` or `[500px_1fr]` for large image cards.
  - Aspect Ratio: `aspect-[3/4.2]` or `aspect-[3/4.5]` for character/item cards.
- **Gallery Pages**:
  - Sidebar: `lg:grid-cols-[240px_1fr]`
  - Grid: `grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6`

---

## 3. Standard Components

### PageHeader (Breadcrumbs)
- **Height**: `h-14`
- **Sticky Position**: `sticky top-16` (toggleable via `isSticky` state)
- **Z-Index**: `z-[40]` (must stay below Navbar's `z-50`)
- **Shadow**: `shadow-2xl`
- **Padding**: `px-4 md:px-8`

### Section Headers
- **Pattern**: `[Number Index] [Title Text] [Toggle Icon]`
- **Index Style**: Large italic number (e.g., `text-4xl opacity-10`)
- **Title Style**: `text-2xl md:text-3xl font-black italic uppercase`

---

## 4. Special Character Patterns

### Dual-Gender Characters (Rover, Trailblazer)
- **Gallery**: Automatically alternate between male and female illustrations in the grid view using the `index` prop (`index % 2 === 0 ? female : male`).
- **Detail Page**: Implement a gender toggle UI. The `isRover` (WW) or `isTrailblazer` (HSR) flag triggers this behavior.
- **Assets**: Standardize naming suffixes as `(남).webp` and `(여).webp` for WW, or `art01-01.webp` vs `art01.webp` for HSR.

---

## 5. Interaction Patterns

### Hover Effects
- **Scale**: `hover:scale-105` (Standard), `hover:scale-110` (Icon buttons)
- **Transition**: `transition-all duration-300 ease-in-out`
- **Brightness**: `hover:bg-white/5` or `hover:bg-white/10`
- **Image Quality**: Use `image-rendering: -webkit-optimize-contrast` and `transform: translateZ(0)` for high-resolution assets to prevent aliasing/jaggedness during scaling.

### Scroll Behavior
- **Smooth Scroll**: Enabled globally.
- **Header Stickiness**: Default `ON` (Persisted in `localStorage` as `rira_header_sticky`).
- **Icon Placeholders**: Supported in skill/item descriptions using `{icon:icon_name}` format.

---

## 6. Icon Placeholder System

To maintain clean database strings while supporting rich UI icons (mouse buttons, keyboard keys, etc.), use the placeholder system:

### Pattern
`"Text before {icon:mouse_left} Text after"`

### Implementation Details
- **Base Path**: `/assets/icons/[icon_name].png`
- **Styling**: Automatically applies `.inline-icon` class.
- **Handling**: 
  - Regex based replacement in `renderRichText` and `renderTextWithHighlights`.
  - Automatically hides the icon if the image file is missing (`onError`).

---

## 7. Implementation Rules (For AI)

1. **Benchmarking**: When creating new pages, use `hsr-hub/pages/CharacterDetail.tsx` as the master template for layout and `common-hub/components/PageHeader.tsx` for navigation.
2. **No Placeholders**: Use `generate_image` for realistic demonstrations or fetch from verified CDN paths.
3. **Hierarchy**: Always maintain the `01/02/03` numerical indexing for major page sections.
4. **Z-Indexing**: 
   - Navbar: `z-50`
   - PageHeader: `z-40`
   - Modals/Tooltips: `z-[100]+`
5. **Language**: Always write implementation plans and project documentation in **Korean (한글)**.
6. **Optimization**: Minimize browser (Chrome) testing to reduce token waste. Rely on code analysis and targeted curl/status checks unless visual verification is strictly necessary.
