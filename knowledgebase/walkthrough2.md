# Left Flank Strategies — Landing Page Walkthrough (v2)

## The Problem
v1 looked too similar to Jeff's personal site (jefferykerr.com) — same dark background, warm red-orange accent, same section order, full-screen video hero.

## What Changed

| Element | jefferykerr.com | Left Flank v2 |
|---------|----------------|---------------|
| Background | All dark `#0A0A0A` | Split-tone: cream `#F2F0EB` + dark sections |
| Accent | Red-orange `#E85533` | Electric blue `#2D5BFF` |
| Hero | Full-screen video behind text | Split layout: text left, video right |
| Layout | Portfolio reel flow | Editorial magazine (BPI/Fipra inspired) |
| Services | Not present | Numbered cards (01–04) on cream |
| Nav CTA | "Contact" | "Let's Talk" (Fipra-inspired) |

## v2 Screenshots

![Hero — split layout with cream background and bold Syne typography on left, video loop on right, electric blue CTA](/Users/jeffkerr/.gemini/antigravity/brain/752e4656-a576-4913-8357-53ad20cedf1a/hero_section_1773274024887.png)

![Browser recording of the v2 redesign scroll-through](/Users/jeffkerr/.gemini/antigravity/brain/752e4656-a576-4913-8357-53ad20cedf1a/leftflank_v2_redesign_1773273992715.webp)

## Files Modified

| File | Changes |
|------|---------|
| [index.html](file:///Volumes/WORK%202TB/WORK%202026/LeftFlank/index.html) | Split hero, reordered sections, alternating light/dark, 4-tile work grid |
| [styles.css](file:///Volumes/WORK%202TB/WORK%202026/LeftFlank/styles.css) | New color system, split-tone tokens, editorial layout, cream backgrounds |
| [main.js](file:///Volumes/WORK%202TB/WORK%202026/LeftFlank/main.js) | Nav auto-detects dark/light sections for color switching |

## Verification

| Check | Result |
|-------|--------|
| Split hero layout | ✅ |
| Cream background (not all dark) | ✅ |
| Blue accent (not red-orange) | ✅ |
| Alternating light/dark sections | ✅ |
| 4 video tiles with autoplay | ✅ |
| Numbered service cards | ✅ |
| Contact form on dark section | ✅ |
| Nav adapts to section color | ✅ |
| Clearly different from jefferykerr.com | ✅ |
