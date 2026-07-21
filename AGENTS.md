# TimeVerse – AGENTS.md

## Stack

- **HTML5** — semantics, ARIA labels, Open Graph meta tags
- **CSS** (Tailwind v3 via CDN + archivos modulares en `css/`) — brand palette, animations, dark/light mode, responsive
- **Vanilla JavaScript** (ES6+ en `js/`) — theme toggle, scroll effects, Intersection Observer animations, Formspree, mobile menu

No frameworks, no build step. Open `index.html` directly or serve with any static server.

## Quick start

```bash
npx serve .          # or python -m http.server 8000, or any static server
# Open http://localhost:3000 or http://localhost:8000
```

## Brand identity

| Item | Value |
|---|---|
| Tagline | **Más allá del tiempo** (Spanish everywhere) |
| Logo | `TIMEVERSE` (top-left) with tagline below |
| WhatsApp | `+51 970 660 178` — link: `https://wa.me/51970660178` |
| Email (hidden) | `Bracson2002@outlook.com` — sent via Formspree, never in DOM |

## Color palette

| Role | Hex |
|---|---|
| Background primary (dark) | `#0D0D0D` (Negro Mate) |
| Background secondary (dark) | `#171717` (Negro Grafito) |
| Background tertiary (dark) | `#2B2B2B` (Titanio Oscuro) |
| Accent gold | `#C8A96A` (Oro Champagne) |
| Accent silver | `#B8BCC2` (Plata Cepillada) |
| Text | white / gray-light |

Dark mode is default. Stored in `localStorage` key `timeverse-theme`. Light mode uses white/gray backgrounds.

## Fonts

**Manrope** via Google Fonts. Fallbacks: Montserrat, Poppins, sans-serif.

## Product data (exact names & prices)

| Name | Price | Stock note |
|---|---|---|
| Casio G-Shock | S/ 599.00 | Stock limitado — Solo queda 1 unidad disponible |
| Invicta Huracan Blue Dial | S/ 519.00 | Same |
| Invicta Pro Diver Chronograph | S/ 569.00 | Same |
| Invicta Pro Diver Quartz | S/ 389.00 | Same |

Images are split between `assets/images/` (cards) and `imgs/` (hero/extras). Optimized files are in `imgs/optimized/images` (`.avif`) and `imgs/optimized/videos` (`.mp4`).

## Sections (in order)

1. **Header** — transparent at top, `#0D0D0D` + `backdrop-blur` on scroll (class `.scrolled`). Nav: Inicio, Colección, Nosotros, Garantía, Contacto. Right: "Escríbenos" WhatsApp button + theme toggle.
2. **Hero** — full viewport, dark bg, large watch image with floating CSS animation. Title, tagline, paragraph, two CTAs.
3. **¿Por qué elegir TimeVerse?** — 6 cards with SVG icons, scroll-triggered via Intersection Observer.
4. **Colección** — 4 product cards with stock badge, shimmer overlay on hover, luxury lighting effects.
5. **Garantía** — "Compra con tranquilidad" + 12-month warranty text.
6. **Nuestra historia** — brand story paragraph.
7. **Contacto** — WhatsApp number + button. Contact form (Name, WhatsApp, Message) via EmailJS. Success message on submit.
8. **Footer** — logo, tagline, WhatsApp, `© 2026 TimeVerse. Todos los derechos reservados.`

## File structure

```
/
  index.html
  css/
    base.css
    components.css
    animations.css
    background-effects.css
  js/
    products.js
    theme.js
    menu.js
    scroll.js
    modal.js
    form.js
    background-effects.js
    main.js
  assets/
    images/        # Product images used in cards (AVIF preferred)
  imgs/            # Hero, gallery, source photos/videos and extra assets
    optimized/
      images/      # Converted AVIF images
      videos/      # Converted MP4 videos
  AGENTS.md
```

## Key implementation rules

- **Not a store** — luxury brand experience. Exclusive, limited stock messaging.
- **Animations** — CSS `@keyframes float` for hero image, `shimmer` overlay for product cards. Scroll reveal via JS Intersection Observer with staggered delays.
- **Dark/light toggle** — class `dark` on `<html>`, persisted in localStorage. Anti-flash inline script in `<head>`.
- **Responsive** — Tailwind breakpoints (sm, md, lg). Mobile hamburger menu.
- **SEO** — meta tags, Open Graph, lang="es", semantic HTML.
- **Accessibility** — ARIA labels, semantic elements, keyboard nav.
- **Formspree** — Form action points to `https://formspree.io/f/xlgqrlop`. No keys needed. Email hidden from DOM.
