# Latte Theory

Latte Theory is a polished React + Vite landing page for a fictional coffee brand. The interface combines editorial-style typography, warm tonal gradients, glassy surfaces, scroll-triggered reveals, parallax motion, and a cursor-following droplet to create a calm but memorable cafe experience.

## Overview

The app is a single-page experience built in React 19 and powered by Vite. It showcases:

- A sticky navigation bar with a mobile menu.
- A cinematic hero section with layered imagery and calls to action.
- A philosophy/about area that introduces the brand language.
- A featured menu grid with animated cards.
- A photo gallery section using local and remote imagery.
- A closing visit/footer panel with operating hours and location.

The experience is intentionally visual first, but it still includes responsive layout behavior and reduced-motion support for accessibility.

## Tech Stack

- React 19
- Vite 8
- Anime.js for cursor and scroll animation helpers
- Vanilla CSS for layout, motion, and responsive styling
- ESLint for code quality

## Features

- Smooth scroll-based reveals using `IntersectionObserver`.
- Parallax movement on selected copy blocks and the footer.
- A custom cursor droplet that follows pointer movement.
- Responsive navigation that switches to a toggle menu on small screens.
- Responsive image grids and fluid section layout.
- Reduced-motion handling for users who prefer less animation.

## Getting Started

### Prerequisites

- Node.js 20 or newer is recommended.
- npm is assumed in the commands below.

### Install

```bash
npm install
```

### Run the dev server

```bash
npm run dev
```

Vite will print a local URL in the terminal. Open it in your browser to view the site.

### Build for production

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

### Lint the project

```bash
npm run lint
```

## Project Structure

```text
src/
	App.jsx              Main page composition and section content
	App.css              Page-specific visual system and responsive layout
	index.css            Global reset, base typography, and document defaults
	main.jsx             React entry point
	WelcomePage.jsx      Intro section with scroll-driven title treatment
	useCursorDroplet.js  Cursor-following decorative animation hook
	useInView.js         IntersectionObserver reveal hook
	useParallax.js       Scroll-based parallax hook
public/
	favicon.svg          Browser tab icon
	icons.svg            Public icon asset
	*.jpg                Local image assets used by the page
```

## Implementation Notes

The page content is assembled in [src/App.jsx](src/App.jsx) and rendered from [src/main.jsx](src/main.jsx). Motion is split across a few small hooks so the UI stays easy to extend:

- [src/useInView.js](src/useInView.js) adds an `in-view` class when sections enter the viewport.
- [src/useParallax.js](src/useParallax.js) nudges selected elements vertically based on scroll position.
- [src/useCursorDroplet.js](src/useCursorDroplet.js) keeps the decorative droplet aligned with the cursor.

The intro panel in [src/WelcomePage.jsx](src/WelcomePage.jsx) uses Anime.js to create a subtle scroll response for the title, subtitle, and scroll indicator.

## Assets

The app uses a mix of remote Unsplash images and local files from `public/`:

- `public/jocelyn-morales-JJeb7OHQ7a8-unsplash.jpg`
- `public/breakslow-E6RTpqvOasU-unsplash.jpg`
- Remote hero and gallery imagery loaded from Unsplash URLs in the component code

If you want the site to work fully offline, replace the remote image URLs in [src/App.jsx](src/App.jsx) with locally hosted assets.

## Accessibility And Motion

- Navigation uses semantic anchors and button controls.
- Decorative motion is reduced automatically when `prefers-reduced-motion` is enabled.
- The layout stays readable on narrow screens with a dedicated mobile navigation state.

## Customization Ideas

- Replace the branding, menu items, and address with a real cafe identity.
- Swap the imagery in `public/` to match your own art direction.
- Adjust the accent palette and typography in [src/index.css](src/index.css) and [src/App.css](src/App.css).
- Extend the menu, gallery, or visit sections with real content, booking links, or operating details.

## Notes

This project is currently a front-end showcase only. There is no backend, state store, or API integration yet.
