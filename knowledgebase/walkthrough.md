# Left Flank Strategies — Landing Page Walkthrough

## What Was Built

A single-page landing page for Left Flank Strategies, a boutique political video production firm. Static HTML/CSS/JS build — no framework, no build step. Ready for Netlify deploy.

## Screenshots

````carousel
![Hero section — dark cinematic background, Syne typography, burnt sienna accent on "work", staggered entrance animation](/Users/jeffkerr/.gemini/antigravity/brain/752e4656-a576-4913-8357-53ad20cedf1a/hero_section_1773271567902.png)
<!-- slide -->
![Full page — hero, work tiles, about, services, contact form, footer](/Users/jeffkerr/.gemini/antigravity/brain/752e4656-a576-4913-8357-53ad20cedf1a/full_page_final_audit_1773271616433.png)
````

## Browser Demo

![Landing page scroll-through recording](/Users/jeffkerr/.gemini/antigravity/brain/752e4656-a576-4913-8357-53ad20cedf1a/leftflank_landing_page_1773271551189.webp)

## Files Created

| File | Purpose |
|------|---------|
| [index.html](file:///Volumes/WORK%202TB/WORK%202026/LeftFlank/index.html) | Single-page landing: nav, hero, work, about, services, contact, footer |
| [styles.css](file:///Volumes/WORK%202TB/WORK%202026/LeftFlank/styles.css) | Full design system with CSS custom properties, responsive grid, animations |
| [main.js](file:///Volumes/WORK%202TB/WORK%202026/LeftFlank/main.js) | IntersectionObserver scroll reveals, nav transition, form handler |

## Design Decisions

- **Typography:** Syne (display, 800 weight) + Outfit (body, 300 weight)
- **Palette:** Dark `#0C0C0E` background, burnt sienna `#C45A3C` accent
- **Layout:** Asymmetric work tile grid, generous negative space
- **Motion:** Staggered hero entrance, scroll-triggered fade-ups, nav blur on scroll
- **Logo:** CSS wordmark — LEFT FLANK bold + STRATEGIES tracked-out beneath

## Verification Results

| Check | Result |
|-------|--------|
| Hero loads with animation | ✅ |
| Work tiles with shimmer placeholders | ✅ |
| About section (15+ stat + copy) | ✅ |
| 4 service cards in grid | ✅ |
| Contact form with all fields | ✅ |
| Nav turns solid/blurred on scroll | ✅ |
| Scroll-triggered reveal animations | ✅ |
| Responsive layout | ✅ |

## Still Needed

- **Placeholder video** — hero is video-ready, just uncomment the `<video>` tag and add `reel.mp4`
- **Work tile content** — real video thumbnails/Vimeo embeds
- **Form backend** — currently uses mailto fallback, can swap to Formspree or Netlify Forms
- **Social proof** — client logos if/when available
