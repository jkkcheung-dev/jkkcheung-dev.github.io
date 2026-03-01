## Testing
---
applyTo: "**/__tests__/**/*.{ts,tsx}"
description: TypeScript Testing instructions.
---

### Framework & Tools

| Package | Role |
|---|---|
| `vitest` | Test runner — configured inside `vite.config.ts` under the `test` key |
| `@testing-library/react` | Component rendering + DOM queries (`render`, `screen`, `within`) |
| `@testing-library/user-event` | Realistic user-interaction simulation (`userEvent.setup()`, `await user.click()`) |
| `@testing-library/jest-dom` | Extra DOM matchers (`toBeInTheDocument`, `toHaveAttribute`, `toHaveTextContent`, …) |
| `jsdom` | Browser-like environment for Vitest (`environment: 'jsdom'` in vite.config.ts) |
| `@vitest/coverage-v8` | Coverage reports (text + HTML) via `npm run test:coverage` |

### NPM Scripts

```
npm test               # watch mode (re-runs on file save)
npm run test:run       # single run, no watch
npm run test:coverage  # single run + lcov/html coverage report in coverage/
```

### Test Architecture

**`src/test-setup.ts`** — imported by every suite via `vite.config.ts → test.setupFiles`. Registers `@testing-library/jest-dom` matchers globally so no per-file import is needed.

**`src/__tests__/test-utils.tsx`** — central utilities:
- `renderWithProviders(ui, options?)` — wraps any component in `<ThemeProvider>` + `<LanguageContext.Provider>` to match the real app environment. Accepts `language` and `toggleLanguage` overrides.
- Fixture factories: `makeExperience()`, `makeEducation()`, `makeResume()` — return minimal valid objects; individual tests spread-override specific fields.

### Test File Overview

| File | Type | Key concepts |
|---|---|---|
| `data/resume-data.test.ts` | Unit (pure TS) | Shape/content validation of both language data files; structural parity between EN and JP |
| `ChipGroup.test.tsx` | Unit | `getByText`, `queryByText`, `not.toBeInTheDocument` |
| `SkillsAndLanguages.test.tsx` | Unit | `getByRole('heading', { name })` — semantic role queries |
| `Education.test.tsx` | Unit | `toHaveTextContent` for combined school+period string |
| `Certifications.test.tsx` | Unit | `container.firstChild === null` for null-render; `toHaveAttribute('href')`, `toHaveAttribute('target', '_blank')` |
| `ExperienceCard.test.tsx` | Unit | `isMobile` prop branching; CJK string rendering |
| `Experience.test.tsx` | Unit | `vi.mock` with `async importOriginal` to stub `useMediaQuery`; `vi.mocked()` + `mockReturnValue` |
| `Header.test.tsx` | Unit | `renderWithProviders` with custom context; social-link `href` assertions |
| `LanguageToggle.test.tsx` | Unit | `userEvent.setup()` + `await user.click()`; `vi.fn()` spy; `toHaveBeenCalledTimes` / `not.toHaveBeenCalled` |
| `App.test.tsx` | Integration | Full mount with real providers + real data; `waitFor()` for async state; EN→JP→EN toggle round-trip |

### Mocking `useMediaQuery`

`Experience` and `App` tests replace MUI's `useMediaQuery` with a Vitest spy so the responsive layout can be tested deterministically in jsdom:

```ts
vi.mock('@mui/material', async (importOriginal) => {
  const mod = await importOriginal<typeof import('@mui/material')>();
  return { ...mod, useMediaQuery: vi.fn().mockReturnValue(false) };
});
```

The `async importOriginal` pattern preserves all real MUI exports; only the one hook is replaced.

---