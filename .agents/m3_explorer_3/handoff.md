# Handoff Report: Static DiscussionForumPosting JSON-LD Schema Integration in Prerender Pipeline

**Author**: m3_explorer_3  
**Target Path**: `c:\Users\User\Desktop\rira game hub\game-hub\.agents\m3_explorer_3\handoff.md`  
**Parent Conversation ID**: `c72d60a7-b23d-4fdf-9dad-93959e2bdb7f`  
**Milestone**: Milestone 3 (R3: DiscussionForumPosting Schema Integration)  

---

## 1. Observation

1. **Prerender Script Location & Execution**:
   - File: `scripts/prerender-meta.js` (869 lines)
   - Command in `package.json`: `"prerender": "node scripts/prerender-meta.js"` (Line 11), invoked during `"build": "node scripts/generate-sitemap.js && vite build && node scripts/prerender-meta.js"` (Line 9).
   - `scripts/prerender-meta.js` reads `dist/index.html` and generates static HTML files for character routes (`/gallery/ww/character/:id`, `/gallery/hsr/character/:id`, `/gallery/nte/character/:name`).

2. **Current Meta Tag Injection Mechanism**:
   - Functions `createPrerenderedPage` (lines 491–497) and `injectMetaAndContent` (lines 456–489) handle meta tag and DOM content injection.
   - Lines 472–481 in `injectMetaAndContent`:
     ```javascript
     const extraTags = `
       <meta property="og:image" content="${escapeHtml(imageUrl)}" />
       <meta property="og:url" content="${escapeHtml(BASE_URL)}${escapeHtml(urlPath)}" />
       <meta name="twitter:card" content="summary_large_image" />
       <meta name="twitter:title" content="${escapeHtml(title)} | RIRA ARCHIVE" />
       <meta name="twitter:description" content="${escapeHtml(description)}" />
       <meta name="twitter:image" content="${escapeHtml(imageUrl)}" />
     `;
     injected = injected.replace('</head>', `${extraTags}\n  </head>`);
     ```
   - Currently, `injectMetaAndContent` **does NOT** inject any `<script type="application/ld+json">` tag into `<head>`. Static prerendered character HTML pages currently lack static `DiscussionForumPosting` JSON-LD schema.

3. **Baseline Community Reviews Alignment**:
   - File: `common-hub/components/CharacterReviewBoard.tsx` (lines 99–130)
   - Offline default sample reviews in `CharacterReviewBoard`:
     - Review 1: Author `"Archive Explorer"`, Upvotes `5`, Rating `5`, Content `"Outstanding character design and synergy! Highly recommended for end-game content."`
     - Review 2: Author `"Tactical Analyst"`, Upvotes `2`, Rating `5`, Content `"Totally agree! Pairing with top-tier supports yields massive damage output."`

---

## 2. Logic Chain

1. **Observation 1 & 2** -> When Googlebot or search crawlers request static prerendered HTML character pages (e.g. `/gallery/hsr/character/acheron`), they receive the static `index.html` outputted by `scripts/prerender-meta.js`.
2. **Observation 2** -> Because `injectMetaAndContent` does not currently output JSON-LD script tags, search crawlers that parse raw static HTML before JavaScript execution will fail to discover UGC structured data (`DiscussionForumPosting`).
3. **Observation 3** -> To achieve consistency between dynamic hydration (rendered by `SEO.tsx` & `CharacterReviewBoard.tsx`) and static prerendering (built by `scripts/prerender-meta.js`), `scripts/prerender-meta.js` must be updated to inject valid baseline `DiscussionForumPosting` JSON-LD schema containing sample/baseline reviews into the `<head>` of all prerendered character pages.

---

## 3. Caveats

- **Scope Boundary**: This investigation is read-only. Implementer agent (`m3_implementer`) will perform actual edits to `scripts/prerender-meta.js`.
- **Target Routes**: Only character detail routes (`/gallery/ww/character/:id`, `/gallery/hsr/character/:id`, `/gallery/:game/character/:name`) require `DiscussionForumPosting` schema injection. Weapon routes, policy pages, and blog posts do not mount `CharacterReviewBoard` and should be excluded from `DiscussionForumPosting` schema injection.
- **Offline / Static Baseline**: Static prerendered HTML uses standard baseline sample community reviews so search crawlers always see valid JSON-LD structure regardless of live database status at build time.

---

## 4. Conclusion & Proposed Fix Plan

`scripts/prerender-meta.js` should be updated with the following modifications:

### Step 1: Add `generateDiscussionForumPostingSchema` Helper
Add helper function in `scripts/prerender-meta.js`:

```javascript
function generateDiscussionForumPostingSchema(charName, routePath) {
  const canonicalUrl = `${BASE_URL}${routePath}`;
  return {
    "@context": "https://schema.org",
    "@type": "DiscussionForumPosting",
    "headline": `${charName} 유저 평가 및 리뷰`,
    "url": canonicalUrl,
    "datePublished": "2024-05-01T00:00:00Z",
    "author": {
      "@type": "Organization",
      "name": "RIRA ARCHIVE Community"
    },
    "comment": [
      {
        "@type": "Comment",
        "author": {
          "@type": "Person",
          "name": "Archive Explorer"
        },
        "datePublished": "2024-05-01T00:00:00Z",
        "text": "Outstanding character design and synergy! Highly recommended for end-game content.",
        "upvoteCount": 5,
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": 5,
          "bestRating": "5",
          "worstRating": "1"
        },
        "interactionStatistic": {
          "@type": "InteractionCounter",
          "interactionType": "https://schema.org/LikeAction",
          "userInteractionCount": 5
        }
      },
      {
        "@type": "Comment",
        "author": {
          "@type": "Person",
          "name": "Tactical Analyst"
        },
        "datePublished": "2024-05-01T12:00:00Z",
        "text": "Totally agree! Pairing with top-tier supports yields massive damage output.",
        "upvoteCount": 2,
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": 5,
          "bestRating": "5",
          "worstRating": "1"
        },
        "interactionStatistic": {
          "@type": "InteractionCounter",
          "interactionType": "https://schema.org/LikeAction",
          "userInteractionCount": 2
        }
      }
    ]
  };
}
```

### Step 2: Update `injectMetaAndContent` & `createPrerenderedPage`
Update `injectMetaAndContent` and `createPrerenderedPage` signatures to accept an optional `jsonLdSchema` parameter:

```javascript
function injectMetaAndContent(html, title, description, imageUrl, urlPath, innerContent = '', jsonLdSchema = null) {
  let injected = html;
  
  // Replace Title
  injected = injected.replace(/<title>.*?<\/title>/s, `<title>${escapeHtml(title)} | RIRA ARCHIVE</title>`);
  
  // Replace og:title
  injected = injected.replace(/<meta property="og:title" content=".*?"\s*\/>/, `<meta property="og:title" content="${escapeHtml(title)} | RIRA ARCHIVE" />`);
  
  // Replace description
  injected = injected.replace(/<meta name="description" content=".*?"\s*\/>/, `<meta name="description" content="${escapeHtml(description)}" />`);
  
  // Replace og:description
  injected = injected.replace(/<meta property="og:description" content=".*?"\s*\/>/, `<meta property="og:description" content="${escapeHtml(description)}" />`);
  
  // Inject missing og/twitter tags and JSON-LD schema into <head>
  let extraTags = `
    <meta property="og:image" content="${escapeHtml(imageUrl)}" />
    <meta property="og:url" content="${escapeHtml(BASE_URL)}${escapeHtml(urlPath)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(title)} | RIRA ARCHIVE" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    <meta name="twitter:image" content="${escapeHtml(imageUrl)}" />
  `;

  if (jsonLdSchema) {
    extraTags += `\n    <script type="application/ld+json">\n${JSON.stringify(jsonLdSchema, null, 2)}\n    </script>`;
  }
  
  injected = injected.replace('</head>', `${extraTags}\n  </head>`);
  
  // Inject DOM Content for AdSense Bot using safe function-based replacer
  if (innerContent) {
    injected = injected.replace(/<div\s+id=["']root["'][^>]*>([\s\S]*?)<\/div>/i, () => `<div id="root">${innerContent}</div>`);
  }
  
  return injected;
}

function createPrerenderedPage(routePath, title, description, imageUrl, baseHtml, innerContent = '', jsonLdSchema = null) {
  const targetDir = path.join(DIST_DIR, ...routePath.split('/').filter(Boolean));
  fs.mkdirSync(targetDir, { recursive: true });
  
  const finalHtml = injectMetaAndContent(baseHtml, title, description, imageUrl, routePath, innerContent, jsonLdSchema);
  fs.writeFileSync(path.join(targetDir, 'index.html'), finalHtml, 'utf8');
}
```

### Step 3: Pass JSON-LD Schema to Prerendered Character Pages
In `runPrerender()`:
- Pass `generateDiscussionForumPostingSchema(name, `/gallery/ww/character/${id}`)` when calling `createPrerenderedPage` for WW characters.
- Pass `generateDiscussionForumPostingSchema(name, `/gallery/hsr/character/${id}`)` when calling `createPrerenderedPage` for HSR characters.
- Pass `generateDiscussionForumPostingSchema(item.name, `/gallery/${gamePath}/character/${encodeURIComponent(item.name)}`)` when calling `createPrerenderedPage` for Notion character items (`cleanType === '캐릭터'`).

---

## 5. Verification Method

1. **Build Execution**:
   Run `npm run build` or `npm run prerender` (after `vite build`).
2. **Prerendered HTML File Inspection**:
   Inspect `dist/gallery/hsr/character/acheron/index.html` (or any WW/HSR character file) to verify:
   - `<script type="application/ld+json">` is present in `<head>`.
   - Contains valid JSON parsing matching `@type: "DiscussionForumPosting"`.
   - `headline`, `author`, `url`, `datePublished`, and `comment` array are correctly populated.
3. **No Index / Weapon Pages Check**:
   Inspect `dist/gallery/ww/weapon/.../index.html` and `dist/about/index.html` to confirm that `DiscussionForumPosting` schema is **not** injected where inappropriate.
