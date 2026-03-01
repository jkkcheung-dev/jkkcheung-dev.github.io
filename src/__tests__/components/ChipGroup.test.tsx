/**
 * src/__tests__/components/ChipGroup.test.tsx
 *
 * Unit tests for the <ChipGroup> component.
 *
 * ChipGroup is a *pure presentational* component — it receives a `heading` and
 * a `groups` record and renders them.  No context, no side-effects.
 *
 * VITEST / RTL CONCEPTS USED
 * ──────────────────────────
 * render()          – mounts the component into a virtual DOM.
 * screen            – query object for the currently rendered DOM.
 * getByText()       – finds an element whose text content matches.
 *                     Throws if nothing is found → test fails loudly.
 * getAllByText()    – like getByText but returns *all* matches.
 * queryByText()     – like getByText but returns null instead of throwing
 *                     when nothing is found.  Use this when asserting absence.
 * toBeInTheDocument() – jest-dom matcher; confirms element is in the DOM.
 * not.toBeInTheDocument() – asserts the element is absent.
 */

import { render, screen } from '@testing-library/react';
import { ChipGroup } from '@/components/ChipGroup';
import { ThemeProvider } from '@mui/material';
import { theme } from '@/theme';

// ─── Helper: wrap with MUI ThemeProvider ─────────────────────────────────────
// ChipGroup uses theme colours via sx props. Without the provider those values
// are still strings – the component won't crash – but we keep the wrapper to
// match the real app environment.

function renderChipGroup(props: Parameters<typeof ChipGroup>[0]) {
    return render(
        <ThemeProvider theme={theme}>
            <ChipGroup {...props} />
        </ThemeProvider>,
    );
}

// ─── Tests ───────────────────────────────────────────────────────────────────

describe('ChipGroup', () => {
    const sampleGroups = {
        Backend: ['Java', 'Spring Boot'],
        Frontend: ['React', 'TypeScript'],
    };

    it('renders the section heading', () => {
        renderChipGroup({ heading: 'Skills', groups: sampleGroups });
        expect(screen.getByText('Skills')).toBeInTheDocument();
    });

    it('renders every category label', () => {
        renderChipGroup({ heading: 'Skills', groups: sampleGroups });
        expect(screen.getByText('Backend')).toBeInTheDocument();
        expect(screen.getByText('Frontend')).toBeInTheDocument();
    });

    it('renders every chip item', () => {
        renderChipGroup({ heading: 'Skills', groups: sampleGroups });
        expect(screen.getByText('Java')).toBeInTheDocument();
        expect(screen.getByText('Spring Boot')).toBeInTheDocument();
        expect(screen.getByText('React')).toBeInTheDocument();
        expect(screen.getByText('TypeScript')).toBeInTheDocument();
    });

    it('renders nothing extra when groups is empty', () => {
        renderChipGroup({ heading: 'Empty Section', groups: {} });
        // Heading still renders, but no chip categories
        expect(screen.getByText('Empty Section')).toBeInTheDocument();
        expect(screen.queryByText('Backend')).not.toBeInTheDocument();
    });

    it('handles a single group with one item', () => {
        renderChipGroup({ heading: 'Tools', groups: { DevOps: ['Docker'] } });
        expect(screen.getByText('DevOps')).toBeInTheDocument();
        expect(screen.getByText('Docker')).toBeInTheDocument();
    });

    it('renders all chips when a group has many items', () => {
        const groups = { Languages: ['JS', 'TS', 'Python', 'Go', 'Java', 'Rust'] };
        renderChipGroup({ heading: 'Languages', groups });
        groups.Languages.forEach((lang) => {
            expect(screen.getByText(lang)).toBeInTheDocument();
        });
    });
});
