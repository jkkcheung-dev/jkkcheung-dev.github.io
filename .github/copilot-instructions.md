# Project Context — Jack Cheung Resume Website

## What Is This Project?

This is a **personal resume / portfolio website** for Jack Cheung, a senior software engineer based in Hong Kong. The site is a single-page application (SPA) that presents his professional profile in a clean, interactive format. The most notable feature is **bilingual support**: visitors can switch between an English version and a Japanese version of the entire resume at any time via a toggle button fixed to the top-right corner. All content—headings, bullet points, skill category names, and section labels—updates instantly to the selected language without any page reload.

---

## Tech Stack

| Layer | Technology |
|---|---|
| UI Framework | React 19 |
| Language | TypeScript |
| Build Tool | Vite 6 |
| Component Library | Material UI (MUI) v7 + Emotion |
| Icons | `@mui/icons-material` |
| Timeline Component | `@mui/lab` (MUI Lab) |
| Fonts | Google Fonts — DynaPuff, Indie Flower, Noto Sans JP, Roboto |
| Linting | ESLint 9 with react-hooks and react-refresh plugins |
| Testing | Vitest 4 + React Testing Library + jsdom + `@vitest/coverage-v8` |
| Deployment | GitHub Pages via GitHub Actions |

---
## Repository Structure

```
jackCheungResume/
├── index.html                  # HTML entry point; loads Google Fonts and mounts #root
├── vite.config.ts              # Vite config: path alias @→src, code splitting, esbuild minify
├── tsconfig.json / tsconfig.app.json / tsconfig.node.json
├── eslint.config.js
├── package.json
├── public/
│   ├── site.webmanifest        # PWA manifest
│   ├── favicon-16x16.png
│   └── favicon-32x32.png
├── .github/
└── src/
    ├── main.tsx                # React entry point — mounts <App /> into #root
    ├── App.tsx                 # Root component: LanguageContext provider, layout shell
    ├── types.ts                # TypeScript interfaces: Resume, ExperienceItem, Education
    ├── theme.ts                # Custom MUI theme (palette, typography)
    ├── assets/                 # Static images / media
    ├── components/             # UI components
    └── data/
```
---

## How the Application Works

### Language Switching (`App.tsx`)
`App` holds a `language` state (`'en' | 'jp'`) and exposes it through `LanguageContext` (React Context API). The active language determines which data object is passed down as props to all section components:

```
language === 'en'  →  resumeEN  (from resume-en.ts)
language === 'jp'  →  resumeJP  (from resume-jp.ts)
```

The `LanguageToggle` component reads and updates this context. Because all text content is data-driven, **no component contains hardcoded strings**—the language change propagates automatically.

### Data Model (`types.ts`)
```
Resume
  ├── greetings / cantonName / cantonDesc / role / location
  ├── email / github / linkedin
  ├── about: string[]
  ├── education: Education   { school, degree, location, period }
  ├── experiences: ExperienceItem[]   { company, role, employmentType, period, location, highlights[] }
  ├── skills: Record<string, string[]>        (category → list of items)
  ├── languages: Record<string, string[]>     (proficiency level → list of languages)
  └── certifications?: Record<string, string> (name → Credly URL)
```

### Layout Order (rendered in `App.tsx`)
1. `<Header>` — name, role, location, about summary, GitHub / LinkedIn / email icon buttons
2. `<Skills>` — tech skill chips grouped by category
3. `<Languages>` — spoken language chips grouped by proficiency
4. `<Experience>` — vertical MUI Timeline; cards lift on hover; responsive (mobile hides the opposite-side date column)
5. `<Education>` — degree and school
6. `<Certifications>` — clickable links with external-link icon; hidden if empty

### Theme (`theme.ts`)
The MUI theme uses a warm, earthy colour palette via module augmentation to add custom tokens:

| Token | Colour (hex) | Usage |
|---|---|---|
| `primary.main` | `#b48334` | Timeline dots, borders, button highlight |
| `primary.textColor1` | `#69607d` | Greeting heading, skill category labels |
| `primary.textColor2` | `#487c63` | Section headings (h4) |
| `primary.textColor3` | `#d4cec1` | About paragraph text |
| `background.default` | `#729dcb` | Page background (mid-blue) |
| `background.paper` | `#c6c9c6` | Card surfaces |
| `background.exphighlight` | `#bdae93` | Alternating highlight rows inside experience cards, skill chips |

Typography uses **DynaPuff** for headings and **Noto Sans JP** as the CJK fallback, ensuring Japanese text renders correctly without layout shifts.

---

## CI/CD Pipeline (`.github/workflows/release.yaml`)

Triggered on every push to the `master` branch (or manually via `workflow_dispatch`):

1. **Build job**: checkout → Node 22 setup → `npm ci` → `npm run build` → upload `./dist` as a Pages artifact
2. **Deploy job**: deploy the uploaded artifact to GitHub Pages

Only one deployment runs at a time (`concurrency: group: "pages"`).

---

## Vite Build Configuration

- **Path alias**: `@` maps to `./src` — used throughout the codebase for clean imports (`@/components/...`, `@/data/...`)
- **Code splitting**: `vendor` chunk (React, react-dom) and `mui` chunk (MUI + Emotion) are separated from application code for better browser caching
- **Minification**: esbuild (fast, no Terser dependency)
- **Source maps**: disabled in production
- **Output**: `dist/`
- **Test environment**: `jsdom` — declared in the `test` block of `vite.config.ts`; Vitest reads this same config so no separate `vitest.config.ts` is needed

---

## Key Design Decisions

1. **Data-driven content** — all text lives in `resume-en.ts` and `resume-jp.ts`. Adding a new language only requires creating a new data file and a new toggle option; no component changes needed.
2. **TypeScript-first** — the `Resume`, `ExperienceItem`, and `Education` interfaces enforce consistency between both language data files at compile time. The `certifications` field is optional (`?:`), allowing it to be omitted without breaking the layout.
3. **Responsive Experience timeline** — `useMediaQuery` detects mobile (`< md` breakpoint); below that, the opposite-content panel (date/employment type/location) is hidden and the same info is rendered inline inside the card instead.
4. **Custom MUI theme tokens** — rather than scattering hardcoded colour strings, all colours are registered as named tokens in the theme and consumed via `color="primary.textColor2"` etc., making global colour changes a one-line edit in `theme.ts`.
5. **Google Fonts preconnect** — `index.html` uses `<link rel="preconnect">` for both `fonts.googleapis.com` and `fonts.gstatic.com` to reduce font loading latency, particularly important for the Japanese Noto Sans JP font.
6. **Single Vite config for build and test** — the `test` block lives inside `vite.config.ts` rather than a separate `vitest.config.ts`. This keeps the path alias (`@`) and plugin list in one place, so tests resolve imports identically to the production build.
7. **`renderWithProviders` wrapper** — every component test uses this helper instead of bare `render()`. It ensures `ThemeProvider` and `LanguageContext.Provider` are always present, preventing silent colour-token fallbacks and uncaught context errors. Supplying a mock `toggleLanguage: vi.fn()` as the default also makes spy assertions ergonomic in any test that needs them.
