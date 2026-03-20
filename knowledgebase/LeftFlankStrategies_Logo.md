# Left Flank Strategies – Official Logo Specification

## Architecture & Typography
The Left Flank Strategies logo is fundamentally typographic, constructed with precise geometric spacing and fully justified tracking to create a strong, stable geometric block.

- **Primary Font:** `var(--font-sans)` (Inter or similar heavy sans)
- **Primary Color:** `var(--text-white)` (#FFFFFF)
- **Secondary Color:** `var(--text-grey)` (#A0A0A0)

## Layout Constraints
The logo consists of three vertically stacked elements. 
1. **"LEFT FLANK"** (Top Name)
   - Font Weight: 900 (Black)
   - Letter Spacing: `-0.04em`
   - Line Height: `0.85`
2. **"STRATEGIES"** (Bottom Name)
   - Font Weight: 700 (Bold)
   - Tracking: Fully justified via `display: flex; justify-content: space-between;` to perfectly match the width of the top name.
3. **Underline**
   - Height: `1px`
   - Width: `100%`
   - Color: `var(--text-grey)`

## Equidistant Spacing Rule
The hallmark of the logo design is the perfect symmetry in its vertical whitespace.
The vertical gap between the baseline of "LEFT FLANK" and the cap-height of "STRATEGIES" must be mathematically identical to the vertical gap between the baseline of "STRATEGIES" and the underline.

In the scalable React component `Logo.jsx`, this is achieved by applying `margin-top: 8px` to both the `.bottomName` and the `.underline` relative to a font scale of `28px` for the top name. 

## Component Usage
The official logo is a React component located at `app/src/components/Logo.jsx`.
It accepts a `scale` prop to resize the logo universally without breaking the mathematical spacing or justification logic.

```jsx
import Logo from './components/Logo';

// Nav usage (small)
<Logo scale={0.65} />

// Footer usage (giant)
<Logo scale={3.5} />
```

## Loader Animation Logo
In the initial `LoadingScreen.jsx` sequence, the logo acts as an independent animated hero piece rather than the pre-compiled `Logo.jsx` component. However, the exact same mathematical properties (10px margins) are enforced physically in `LoadingScreen.module.css` to match the official spec.
