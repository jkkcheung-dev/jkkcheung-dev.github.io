/**
 * src/__tests__/components/Certifications.test.tsx
 *
 * Unit tests for the <Certifications> component.
 *
 * KEY BEHAVIOUR TO TEST
 * ─────────────────────
 * 1. Returns nothing when `certifications` is undefined (optional prop).
 * 2. Returns nothing when `certifications` is an empty object.
 * 3. Renders a heading and one link per certification when data is provided.
 * 4. Each link has the correct `href` attribute.
 * 5. Each link opens in a new tab (`target="_blank"`).
 *
 * VITEST / RTL CONCEPTS USED
 * ──────────────────────────
 * queryByRole()        – like getByRole but returns null on miss (safe null check).
 * getAllByRole('link') – returns all <a> elements; useful for counting.
 * toHaveAttribute()   – jest-dom; checks a DOM attribute's value.
 * container.firstChild – null when the component renders nothing (returns null).
 */

import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material';
import { theme } from '@/theme';
import { Certifications } from '@/components/Certifications';

function renderCerts(certifications?: Record<string, string>) {
    return render(
        <ThemeProvider theme={theme}>
            <Certifications certifications={certifications} />
        </ThemeProvider>,
    );
}

const sampleCerts = {
    'Certified Kubernetes Administrator - CKA': 'https://www.credly.com/badges/cka',
    'AWS Certified Solutions Architect – Professional': 'https://www.credly.com/badges/aws-pro',
};

describe('Certifications', () => {
    describe('when certifications prop is absent or empty', () => {
        it('renders nothing when certifications is undefined', () => {
            const { container } = renderCerts(undefined);
            // Component returns null → nothing is mounted
            expect(container.firstChild).toBeNull();
        });

        it('renders nothing when certifications is an empty object', () => {
            const { container } = renderCerts({});
            expect(container.firstChild).toBeNull();
        });
    });

    describe('when certifications data is provided', () => {
        it('renders the "Certifications" section heading', () => {
            renderCerts(sampleCerts);
            expect(screen.getByRole('heading', { name: 'Certifications' })).toBeInTheDocument();
        });

        it('renders one link per certification', () => {
            renderCerts(sampleCerts);
            const links = screen.getAllByRole('link');
            expect(links).toHaveLength(Object.keys(sampleCerts).length);
        });

        it('each link displays the certification name', () => {
            renderCerts(sampleCerts);
            expect(
                screen.getByText('Certified Kubernetes Administrator - CKA'),
            ).toBeInTheDocument();
            expect(
                screen.getByText('AWS Certified Solutions Architect – Professional'),
            ).toBeInTheDocument();
        });

        it('each link points to the correct URL', () => {
            renderCerts(sampleCerts);
            const ckaLink = screen.getByText('Certified Kubernetes Administrator - CKA').closest('a');
            expect(ckaLink).toHaveAttribute('href', 'https://www.credly.com/badges/cka');
        });

        it('each link opens in a new tab', () => {
            renderCerts(sampleCerts);
            const links = screen.getAllByRole('link');
            links.forEach((link) => {
                expect(link).toHaveAttribute('target', '_blank');
            });
        });

        it('each link has rel="noopener noreferrer" for security', () => {
            renderCerts(sampleCerts);
            const links = screen.getAllByRole('link');
            links.forEach((link) => {
                expect(link).toHaveAttribute('rel', 'noopener noreferrer');
            });
        });

        it('renders with a single certification', () => {
            renderCerts({ 'Single Cert': 'https://example.com' });
            expect(screen.getAllByRole('link')).toHaveLength(1);
            expect(screen.getByText('Single Cert')).toBeInTheDocument();
        });
    });
});
