# Project Context — Jack Cheung Resume Website

## Project Snapshot

This repository is a single-page resume and portfolio site for Jack Cheung built with React, TypeScript, Vite, and MUI.

Project-specific constraints:
- The primary resume content is bilingual and switches between English and Japanese through `LanguageContext` in `src/App.tsx`.
- Resume copy should stay data-driven from `src/data/resume-en.ts` and `src/data/resume-jp.ts`.
- The header includes both a language toggle and a download dropdown.
- The download dropdown is intentionally language-independent; its labels and URLs stay fixed regardless of the active language.

## Tech Stack

| Layer | Technology |
|---|---|
| UI Framework | React 19 |
| Language | TypeScript |
| Build Tool | Vite 7 |
| Component Library | Material UI (MUI) v7 + Emotion |
| Icons | `@mui/icons-material` |
| Timeline Component | `@mui/lab` |
| Testing | Vitest 4 + React Testing Library + jsdom |
| Deployment | GitHub Pages via GitHub Actions |

## Working Commands

- `npm run dev` — start the Vite dev server
- `npm run build` — type-check and build for production
- `npm run lint` — run ESLint
- `npm test` — run Vitest in watch mode
- `npm run test:run` — run the test suite once
- `npm run test:coverage` — run tests with coverage output

## Architecture Rules

- Keep localized resume content in the data files, not in presentational components.
- Exception: fixed-label UI that is intentionally language-independent may use hardcoded text.
- Keep `src/types.ts` as the source of truth for the resume data shape.
- Preserve the current section order in `src/App.tsx` unless the task explicitly changes page structure.
- Use the existing `@` path alias for source imports.
- Prefer theme tokens from `src/theme.ts` over hardcoded colors.
- For component tests, use `renderWithProviders` from `src/__tests__/test-utils.tsx`.

## Key Project Files

- `src/App.tsx` — owns language state and chooses between `resumeEN` and `resumeJP`
- `src/components/` — presentational UI components
- `src/data/` — bilingual resume content
- `src/theme.ts` — custom MUI palette and typography tokens
- `.github/instructions/tests.instructions.md` — detailed testing conventions

## Boundaries

Always:
- Preserve the bilingual architecture and the data-driven content model.
- Keep changes consistent with the existing MUI, TypeScript, and testing patterns.
- Run relevant tests after code changes when a related test suite exists.

Ask first:
- Changing the `Resume` data shape in `src/types.ts`
- Adding new dependencies
- Major visual redesigns or typography changes
- Build, deployment, or GitHub Actions changes

Never:
- Hardcode bilingual resume content into presentational components unless the UI is intentionally language-independent
- Rework unrelated files as part of a focused task

## Related Customization

For a reusable plan-first workflow for non-trivial code changes, see `.github/skills/non-trivial-code-change/SKILL.md`.