/**
 * src/__tests__/components/Header.test.tsx
 *
 * Unit tests for the <Header> component.
 *
 * Header reads `language` from LanguageContext (to pick a font size) and renders:
 *  • Greeting text
 *  • Role + Location
 *  • About paragraph lines
 *  • GitHub / LinkedIn / Email icon buttons
 *
 * We use renderWithProviders (from test-utils) to supply both the ThemeProvider
 * and an in-test LanguageContext value.
 *
 * VITEST / RTL CONCEPTS USED
 * ──────────────────────────
 * renderWithProviders()  – custom helper; wraps component in both providers.
 * getByRole('link')      – finds <a> elements (IconButton renders as <a> with href).
 * toHaveAttribute()      – checks a named DOM attribute.
 * getAllByRole()         – finds every element with the given role.
 */

import { screen } from '@testing-library/react';
import { renderWithProviders, makeResume } from '@/__tests__/test-utils';
import { Header } from '@/components/Header';

const defaultData = makeResume({
    greetings: "Hi I'm Jack Cheung",
    role: 'Software Engineer',
    location: 'HONG KONG',
    about: ['Line one about me.', 'Line two about me.'],
    github: 'https://github.com/test-user',
    linkedin: 'https://linkedin.com/in/test-user',
    email: 'test@example.com',
});

describe('Header', () => {
    describe('text content', () => {
        it('renders the greeting', () => {
            renderWithProviders(<Header data={defaultData} />);
            expect(screen.getByText("Hi I'm Jack Cheung")).toBeInTheDocument();
        });

        it('renders the role', () => {
            renderWithProviders(<Header data={defaultData} />);
            expect(screen.getByText(/Software Engineer/)).toBeInTheDocument();
        });

        it('renders the location', () => {
            renderWithProviders(<Header data={defaultData} />);
            expect(screen.getByText(/HONG KONG/)).toBeInTheDocument();
        });

        it('renders all about paragraph lines', () => {
            renderWithProviders(<Header data={defaultData} />);
            expect(screen.getByText('Line one about me.')).toBeInTheDocument();
            expect(screen.getByText('Line two about me.')).toBeInTheDocument();
        });

        it('renders one paragraph per about line', () => {
            const data = makeResume({ about: ['First line.', 'Second line.', 'Third line.'] });
            renderWithProviders(<Header data={data} />);
            expect(screen.getByText('First line.')).toBeInTheDocument();
            expect(screen.getByText('Second line.')).toBeInTheDocument();
            expect(screen.getByText('Third line.')).toBeInTheDocument();
        });
    });

    describe('social links', () => {
        it('GitHub icon button links to the correct URL', () => {
            renderWithProviders(<Header data={defaultData} />);
            // MUI IconButton with href renders as an <a> element
            const links = screen.getAllByRole('link');
            const githubLink = links.find((l) =>
                l.getAttribute('href')?.includes('github'),
            );
            expect(githubLink).toHaveAttribute('href', 'https://github.com/test-user');
        });

        it('LinkedIn icon button links to the correct URL', () => {
            renderWithProviders(<Header data={defaultData} />);
            const links = screen.getAllByRole('link');
            const linkedinLink = links.find((l) =>
                l.getAttribute('href')?.includes('linkedin'),
            );
            expect(linkedinLink).toHaveAttribute('href', 'https://linkedin.com/in/test-user');
        });

        it('Email icon button has a mailto: href', () => {
            renderWithProviders(<Header data={defaultData} />);
            const links = screen.getAllByRole('link');
            const emailLink = links.find((l) =>
                l.getAttribute('href')?.startsWith('mailto:'),
            );
            expect(emailLink).toHaveAttribute('href', 'mailto:test@example.com');
        });
    });

    describe('language context integration', () => {
        it('renders without crashing when language context is "jp"', () => {
            const jpData = makeResume({ greetings: 'こんにちはジャックです' });
            renderWithProviders(<Header data={jpData} />, { language: 'jp' });
            expect(screen.getByText('こんにちはジャックです')).toBeInTheDocument();
        });
    });
});
