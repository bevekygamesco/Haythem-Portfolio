# Haythem Ben Haddada — Cinematic Portfolio

Next.js App Router + React + TypeScript + Tailwind CSS. Reference-inspired futuristic portrait banner, real project screenshots, sticky navigation with active section highlighting, project filters and dialogs, a changing geometric process visualizer, responsive layouts and reduced-motion support.

## Run

Node.js 22.13 or newer.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Production

```bash
npm run build
npm start
```

Deploy to a Next.js-compatible host such as Vercel. No environment variables required. Google Fonts load through CSS with system fallbacks.

## Customize

- app/page.tsx: projects, links, biography, workflow, contact.
- app/globals.css: design and mobile styles.
- app/ChromeScene.tsx: WebGL scene and SVG fallback.
- app/layout.tsx: metadata; update metadataBase for your own domain.
- public/haythem.jpg: portrait.
- public/Haythem-Ben-Haddada-CV.pdf: CV.

Project thumbnails are screenshots captured from the five live project URLs in app/page.tsx. The banner uses RIGAT and Store 2000 project captures. Assets are stored in public/projects/. Contact buttons open the visitor's email app; no backend contact form is configured.

The hosted version uses the Sites runtime adapter. This source project uses standard Next.js.

## Cinematic portrait and entry

The banner uses 23 static WebP frames extracted from the supplied video’s left-to-right eye sweep. Desktop assets preserve 720×1280 source resolution; mobile uses 360×640 frames. The source does not contain a vertical eye sweep, so tracking follows the horizontal mouse position. Frame interpolation smooths the transition.

- app/CinematicPortrait.tsx: eased canvas frame selection, loading progress and off-screen pause.
- app/CinematicIntro.tsx: loading progress, 3D CSS assembly, keyboard skip and timed release.
- app/CinematicHero.tsx: reversible scroll-linked hero transition using native scrolling.
- public/hero/: sequence assets and fallback poster.

Reduced-motion preferences disable gaze movement and scroll transforms and bypass the animated intro.

## Interactive refinement

- Supplied cinematic thumbnails for all five live projects.
- Smooth pointer-driven 3D tilt and moving light on project cards.
- Mouse guidance appears after the intro and fades after horizontal movement.
- Centered project details, with compact layouts for smaller screens.
- Process stages react to pointer hover, keyboard focus, and taps.
- Reversible scroll-assembled CSS 3D section with reduced-motion support.

## Creative toolkit and cursor

Six toolkit chapters use native vertical scrolling to move a pinned horizontal rail, then release into the next section. Scroll up to reverse. Chapter arrows provide direct navigation. The cursor reticle and short canvas trail run only on fine pointers without reduced motion; native cursors remain in project dialogs and form fields. Reduced motion shows all toolkit chapters vertically.

## Mobile gaze

Swipe horizontally over the hero portrait or drag the labeled gaze slider on a phone. Vertical gestures continue normal scrolling; the gaze recenters after release. Reduced-motion visitors receive a still portrait. This uses the original optimized horizontal gaze frames, not device sensors or a camera.
