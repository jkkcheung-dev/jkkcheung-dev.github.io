/**
 * src/__tests__/components/SkillsAndLanguages.test.tsx
 *
 * Unit tests for <Skills> and <Languages> — thin wrappers around <ChipGroup>.
 *
 * STRATEGY
 * ────────
 * Because both components are one-liners that delegate completely to ChipGroup,
 * these tests verify the *contract boundary*: the correct `heading` is passed
 * and the skill/language data appears in the rendered output.
 *
 * VITEST / RTL CONCEPTS USED
 * ──────────────────────────
 * getByRole()    – queries by ARIA role. Typography variant="h4" maps to the
 *                  "heading" role.  The `name` option matches the accessible name
 *                  (visible text content of the heading).
 * getByText()    – finds any element whose text content matches exactly.
 */

import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material';
import { theme } from '@/theme';
import { Skills } from '@/components/Skills';
import { Languages } from '@/components/Languages';
import type { Resume } from '@/types';

const sampleSkills: Resume['skills'] = {
    'Programming Languages': ['JavaScript', 'TypeScript'],
    Frameworks: ['React', 'Node.js'],
};

const sampleLanguages: Resume['languages'] = {
    Native: ['Cantonese'],
    Business: ['English', 'Mandarin'],
};

function withTheme(ui: React.ReactElement) {
    return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
}

// ─── Skills ───────────────────────────────────────────────────────────────────

describe('Skills', () => {
    it('renders the "Skills" section heading', () => {
        withTheme(<Skills skills={sampleSkills} />);
        // getByRole('heading', { name }) is preferred over getByText for headings
        // because it checks both role semantics and visual text together.
        expect(screen.getByRole('heading', { name: 'Skills' })).toBeInTheDocument();
    });

    it('renders category labels', () => {
        withTheme(<Skills skills={sampleSkills} />);
        expect(screen.getByText('Programming Languages')).toBeInTheDocument();
        expect(screen.getByText('Frameworks')).toBeInTheDocument();
    });

    it('renders individual skill chips', () => {
        withTheme(<Skills skills={sampleSkills} />);
        expect(screen.getByText('TypeScript')).toBeInTheDocument();
        expect(screen.getByText('React')).toBeInTheDocument();
    });
});

// ─── Languages ────────────────────────────────────────────────────────────────

describe('Languages', () => {
    it('renders the "Languages" section heading', () => {
        withTheme(<Languages languages={sampleLanguages} />);
        expect(screen.getByRole('heading', { name: 'Languages' })).toBeInTheDocument();
    });

    it('renders proficiency group labels', () => {
        withTheme(<Languages languages={sampleLanguages} />);
        expect(screen.getByText('Native')).toBeInTheDocument();
        expect(screen.getByText('Business')).toBeInTheDocument();
    });

    it('renders individual language chips', () => {
        withTheme(<Languages languages={sampleLanguages} />);
        expect(screen.getByText('Cantonese')).toBeInTheDocument();
        expect(screen.getByText('English')).toBeInTheDocument();
        expect(screen.getByText('Mandarin')).toBeInTheDocument();
    });
});
