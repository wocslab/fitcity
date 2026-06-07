# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

Fit City Gym — a React 18 marketing website (single-page, no backend) for a premium gym brand. Submits leads to an external CRM and uses WhatsApp for contact. No TypeScript, no tests, no ESLint configured.

## Commands

```bash
npm start        # dev server at localhost:3000
npm run build    # production build → /build
```

No lint or test scripts exist.

## Tech Stack

- **React 18** via Create React App (react-scripts 5)
- **Tailwind CSS 3.4** with custom theme in `tailwind.config.js`
- **Framer Motion** + CSS keyframe animations for transitions
- **lucide-react** + **react-icons** for icons
- **No React Router** — navigation is anchor/hash-based

## Architecture

### Scroll Reveal
`App.jsx` registers a single `IntersectionObserver` (threshold: 0.08) on mount. Elements with `.reveal`, `.reveal-left`, or `.reveal-right` classes get `.visible` added when they enter the viewport, triggering CSS transitions defined in `index.css`. Stagger timing uses `.delay-{100–500}` utility classes. The `useScrollReveal` hook in `src/hooks/` exists but is unused — the App-level observer handles everything.

### Sliders (Programs, Gallery)
Both components implement custom pointer/touch drag with inertial momentum scrolling. Desktop uses pointer events with velocity ×4 multiplier; mobile uses touch events with rAF decay loop (×0.92 per frame). Neither uses a slider library.

### Membership Tab → Hash Routing
`MembershipSection` has a `useEffect` that watches `window.location.hash`. Navigating to `#pt-plans` from the Programs section automatically switches the active tab to "Personal Training".

### Contact Form → CRM
`ContactSection.jsx` POSTs to `https://www.yourdigitallift.com/api/v1/website-customer-register/` using `URLSearchParams` with a hardcoded `Authorization` header. Fields: `FirstName`, `CustomerEmail`, `CustomerMobile`, `Notes`, `EntryPoint='WEB'`. Success/error state resets after 4 seconds.

### WhatsApp Integration
`WhatsAppButton.jsx` is a sticky floating button. `MembershipSection` builds per-plan deep-link messages via `getWhatsappURL()`. The number is hardcoded in both files (`+971501695989`).

## Key Config Locations

| What | Where |
|---|---|
| Brand colors (`brand-red`, `brand-dark`) | `tailwind.config.js` → `theme.extend.colors` |
| Custom animations & scroll reveal CSS | `src/index.css` |
| CRM endpoint + auth token | `ContactSection.jsx` (hardcoded) |
| WhatsApp number | `MembershipSection.jsx` + `WhatsAppButton.jsx` |
| Fonts (Barlow Condensed, Gotham) | `src/index.css` @import + `tailwind.config.js` fontFamily |

## Adding a New Section

1. Create component in `src/components/sections/`
2. Give the root element an `id` for nav linking
3. Apply `.reveal` (or `.reveal-left` / `.reveal-right`) to animatable children
4. Import and mount in `App.jsx`
5. Add entry to `navLinks` array in `Navbar.jsx`
