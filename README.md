# Fit City Gym — React Website

A full-featured, animated gym website built with React + Tailwind CSS.
Dark red premium theme matching the Fit City brand identity.

## 🗂 Folder Structure

```
fitcity/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx          # Sticky nav with mobile menu
│   │   │   └── Footer.jsx          # Full footer with links
│   │   ├── sections/
│   │   │   ├── HeroSection.jsx     # Animated hero with parallax
│   │   │   ├── ProgramsSection.jsx # 4-column program cards
│   │   │   ├── TrainersSection.jsx # Trainer profiles grid
│   │   │   ├── MembershipSection.jsx # 3-tier pricing
│   │   │   ├── AboutSection.jsx    # Features + about content
│   │   │   └── ContactSection.jsx  # Form + contact info
│   │   └── ui/
│   │       ├── MarqueeTicker.jsx   # Scrolling red ticker
│   │       └── WhatsAppButton.jsx  # Sticky WhatsApp CTA
│   ├── hooks/
│   │   └── useScrollReveal.js      # Intersection observer hook
│   ├── App.jsx                     # Root component
│   ├── index.js                    # Entry point
│   └── index.css                   # Global styles + animations
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

## 🎨 Brand Colors

| Token             | Hex       | Usage                     |
|-------------------|-----------|---------------------------|
| brand-red         | #E8192C   | Primary accent, CTAs      |
| brand-red-dark    | #B8101E   | Hover states              |
| brand-dark        | #0A0A0A   | Page background           |
| brand-dark-2      | #111111   | Section backgrounds       |
| brand-dark-3      | #1A1A1A   | Card backgrounds          |

## 📐 Typography

Uses **Barlow Condensed** (display headings) + **Barlow** (body) from Google Fonts.

Replace with licensed fonts from the brand package:
- `Snasm W00 Heavy Italic` → display headings
- `Distancia Bold` → subheadings
- `Gotham Black` → nav, labels
- `Gotham Medium` → body text

To swap fonts, update `src/index.css` @import and `tailwind.config.js` fontFamily.

## 🖼 Images

Currently uses Unsplash placeholder images.  
Replace with real gym/trainer photos by updating the `src` props in each section component.

## ✨ Features

- Mobile-first responsive design
- Scroll-triggered reveal animations (IntersectionObserver)
- Parallax mouse tracking on hero
- Animated marquee ticker
- Sticky transparent navbar (darkens on scroll)
- Hamburger menu for mobile
- Hover micro-animations on all cards
- WhatsApp floating CTA button with pulse animation
- Contact form with validation
- SEO meta tags in index.html
- Smooth scroll navigation
- Custom scrollbar styling

## 📦 Pages / Sections

1. **Hero** — Full-screen with animated headline, CTA buttons, stats
2. **Programs** — Strength, Functional, Group Classes, Yoga
3. **Trainers** — Expert coaches with social links
4. **Membership** — Basic / Premium / VIP pricing
5. **About** — Brand story, features, stats
6. **Contact** — Form, map, free trial CTA

## 🔧 Customization

Edit `tailwind.config.js` to change brand colors.
Edit `src/index.css` for global animation timing.
Each section is self-contained — easy to add/remove/reorder in `App.jsx`.
