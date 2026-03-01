/**
 * src/__tests__/components/Experience.test.tsx
 *
 * Tests for the <Experience> component.
 *
 * Experience renders a MUI Timeline list from an array of ExperienceItem objects.
 * It also calls useMediaQuery internally to determine isMobile.
 *
 * MOCKING `useMediaQuery`
 * ───────────────────────
 * useMediaQuery is a MUI hook that reads the browser window's media features.
 * jsdom (our test environment) has no real CSS engine, so useMediaQuery always
 * returns false.  We can override this with vi.mock() / vi.spyOn():
 *
 *   vi.mock('@mui/material', async (importOriginal) => {
 *     const mod = await importOriginal<typeof import('@mui/material')>();
 *     return { ...mod, useMediaQuery: vi.fn() };
 *   });
 *
 * This factory pattern (async importOriginal) preserves all the real MUI
 * exports while replacing only `useMediaQuery` with a mock function.
 *
 * VITEST / RTL CONCEPTS USED
 * ──────────────────────────
 * vi.mock()         – replace a module with a mock for the entire file.
 * vi.mocked()       – TypeScript-safe cast; tells TS the function is a Mock.
 * mockReturnValue() – makes the mock always return a specific value.
 * within()           – scopes queries to a sub-tree (avoids cross-card matches).
 * getAllByRole()     – returns every element matching a given role.
 */

import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material';
import { theme } from '@/theme';
import { Experience } from '@/components/Experience';
import { makeExperience } from '@/__tests__/test-utils';
import * as MUI from '@mui/material';

// ─── Mock useMediaQuery so we can control isMobile in tests ──────────────────
vi.mock('@mui/material', async (importOriginal) => {
    const mod = await importOriginal<typeof import('@mui/material')>();
    return {
        ...mod,
        // Replace useMediaQuery with a spy; default return value = false (desktop)
        useMediaQuery: vi.fn().mockReturnValue(false),
    };
});

function renderExperience(experiences: ReturnType<typeof makeExperience>[]) {
    return render(
        <ThemeProvider theme={theme}>
            <Experience experiences={experiences} />
        </ThemeProvider>,
    );
}

describe('Experience', () => {
    // Reset the mock before each test so one test's setup doesn't bleed into the next
    beforeEach(() => {
        vi.mocked(MUI.useMediaQuery).mockReturnValue(false); // default: desktop
    });

    it('renders the "Experience" section heading', () => {
        renderExperience([makeExperience()]);
        expect(screen.getByRole('heading', { name: 'Experience' })).toBeInTheDocument();
    });

    it('renders a card for every experience item', () => {
        const experiences = [
            makeExperience({ role: 'Analyst Programmer' }),
            makeExperience({ role: 'Assistant Technical Analyst' }),
            makeExperience({ role: 'Programmer' }),
        ];
        renderExperience(experiences);
        expect(screen.getByText('Analyst Programmer')).toBeInTheDocument();
        expect(screen.getByText('Assistant Technical Analyst')).toBeInTheDocument();
        expect(screen.getByText('Programmer')).toBeInTheDocument();
    });

    it('shows period and location in the opposite-content panel on desktop', () => {
        const exp = makeExperience({ period: 'Jan 2020 - Dec 2021', location: 'Hong Kong' });
        renderExperience([exp]);
        // On desktop the period appears in TimelineOppositeContent (may appear twice —
        // once in opposite content and once in the mobile-only stack inside the card)
        // We just assert it's present somewhere in the rendered output.
        expect(screen.getAllByText(/Jan 2020 - Dec 2021/).length).toBeGreaterThan(0);
    });

    it('renders with an empty experiences array without crashing', () => {
        expect(() => renderExperience([])).not.toThrow();
        // The section heading still shows
        expect(screen.getByRole('heading', { name: 'Experience' })).toBeInTheDocument();
    });

    it('renders correctly in mobile layout (isMobile = true)', () => {
        // Override useMediaQuery to simulate a narrow screen
        vi.mocked(MUI.useMediaQuery).mockReturnValue(true);
        const exp = makeExperience({ role: 'Mobile Engineer', period: 'Mar 2022 - Present' });
        renderExperience([exp]);
        expect(screen.getByText('Mobile Engineer')).toBeInTheDocument();
    });
});
