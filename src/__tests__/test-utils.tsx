/**
 * src/__tests__/test-utils.tsx
 *
 * Shared helper utilities for all test files.
 *
 * WHY THIS FILE EXISTS
 * --------------------
 * Most components in this project depend on two providers that must wrap them
 * during tests, otherwise they crash or behave incorrectly:
 *
 *   1. <ThemeProvider>  – MUI reads colour tokens (primary.textColor1, etc.) from the
 *                         theme object.  Without it, sx-prop colour values silently
 *                         fall back to undefined.
 *
 *   2. <LanguageContext.Provider> – Header and LanguageToggle call useContext(LanguageContext).
 *                                   Without a Provider the hook returns the default value
 *                                   defined in App.tsx (language = 'en', no-op toggle).
 *                                   This file lets tests supply any context value they like.
 *
 * USAGE
 * -----
 *   // Minimal – uses the default English context
 *   const { getByText } = renderWithProviders(<Education education={...} />);
 *
 *   // Custom context – simulate the Japanese language being active
 *   const { getByText } = renderWithProviders(<Header data={resumeJP} />, {
 *     language: 'jp',
 *   });
 */

import React from 'react';
import { render, type RenderOptions } from '@testing-library/react';
import { ThemeProvider } from '@mui/material';
import { theme } from '@/theme';
import { LanguageContext } from '@/App';

// ─── Provider configuration options ──────────────────────────────────────────

interface ProviderOptions {
    /** Which language the LanguageContext should report. Defaults to 'en'. */
    language?: 'en' | 'jp';
    /** Override the toggle callback if you need to spy on it. */
    toggleLanguage?: () => void;
}

// ─── Main helper ─────────────────────────────────────────────────────────────

/**
 * Drop-in replacement for RTL's `render()` that wraps the UI with every
 * provider the app needs.  All extra render options (e.g. `container`) are
 * forwarded unchanged.
 */
export function renderWithProviders(
    ui: React.ReactElement,
    {
        language = 'en',
        toggleLanguage = vi.fn(), // vi.fn() is Vitest's mock-function factory
        ...renderOptions
    }: ProviderOptions & Omit<RenderOptions, 'wrapper'> = {},
) {
    function AllProviders({ children }: { children: React.ReactNode }) {
        return (
            <LanguageContext.Provider value={{ language, toggleLanguage }}>
                <ThemeProvider theme={theme}>{children}</ThemeProvider>
            </LanguageContext.Provider>
        );
    }

    return render(ui, { wrapper: AllProviders, ...renderOptions });
}

// ─── Fixture factories ────────────────────────────────────────────────────────
// These create minimal valid objects that satisfy the TypeScript interfaces.
// Individual tests can spread and override specific fields as needed.

import type { ExperienceItem, Education, Resume } from '@/types';

export const makeExperience = (overrides?: Partial<ExperienceItem>): ExperienceItem => ({
    company: 'Acme Corp',
    role: 'Software Engineer',
    employmentType: 'Full-time',
    period: 'Jan 2020 - Dec 2021',
    location: 'Hong Kong',
    highlights: [
        'Built a React front end',
        'Deployed with Kubernetes',
    ],
    ...overrides,
});

export const makeEducation = (overrides?: Partial<Education>): Education => ({
    school: 'HKU',
    degree: 'BEng Computer Science',
    location: 'Hong Kong',
    period: '2013 - 2017',
    ...overrides,
});

/** Minimal stub for a full Resume object (only the fields used in tests). */
export const makeResume = (overrides?: Partial<Resume>): Resume => ({
    greetings: "Hi I'm Test User",
    cantonName: 'Test Name',
    cantonDesc: 'test description',
    role: 'Frontend Engineer',
    location: 'TEST CITY',
    email: 'test@example.com',
    github: 'https://github.com/test',
    linkedin: 'https://linkedin.com/in/test',
    about: ['Line one about me.', 'Line two about me.'],
    education: makeEducation(),
    experiences: [makeExperience()],
    skills: { 'Programming Languages': ['JavaScript', 'TypeScript'] },
    languages: { Native: ['Cantonese'], Business: ['English'] },
    certifications: {
        'Certified Kubernetes Administrator - CKA': 'https://www.credly.com/badges/example',
    },
    ...overrides,
});
