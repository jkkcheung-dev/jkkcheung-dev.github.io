/**
 * src/__tests__/components/LanguageToggle.test.tsx
 *
 * Unit tests for the <LanguageToggle> component.
 *
 * LanguageToggle renders two buttons (EN / JP) and:
 *  • Reads the current language from LanguageContext.
 *  • Calls toggleLanguage() when the *inactive* button is clicked.
 *  • Does NOT call toggleLanguage() when the *active* button is clicked
 *    (guard in the onClick handler).
 *
 * VITEST / RTL CONCEPTS USED
 * ──────────────────────────
 * userEvent              – simulates real user interactions (keyboard, pointer).
 *                          Preferred over fireEvent for click tests because it
 *                          dispatches the full browser event sequence.
 * userEvent.setup()      – creates a configured user-event instance.
 *                          Call this OUTSIDE beforeEach so the pointer state
 *                          is fresh for each test.
 * vi.fn()                – creates a mock / spy function.
 * toHaveBeenCalledTimes()– jest-compatible mock assertion.
 * not.toHaveBeenCalled() – asserts the spy was never invoked.
 */

import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@/__tests__/test-utils';
import { LanguageToggle } from '@/components/LanguageToggle';

describe('LanguageToggle', () => {
    // user-event instance – create once per test via setup()
    const user = userEvent.setup();

    describe('rendering', () => {
        it('renders an EN button', () => {
            renderWithProviders(<LanguageToggle />);
            expect(screen.getByRole('button', { name: 'EN' })).toBeInTheDocument();
        });

        it('renders a JP button', () => {
            renderWithProviders(<LanguageToggle />);
            expect(screen.getByRole('button', { name: 'JP' })).toBeInTheDocument();
        });

        it('renders both buttons in the same toggle group', () => {
            renderWithProviders(<LanguageToggle />);
            const buttons = screen.getAllByRole('button', { name: /^(EN|JP)$/ });
            expect(buttons).toHaveLength(2);
        });
    });

    describe('toggle behaviour', () => {
        it('calls toggleLanguage when the JP button is clicked while EN is active', async () => {
            const toggleMock = vi.fn();
            renderWithProviders(<LanguageToggle />, {
                language: 'en',    // EN is currently active
                toggleLanguage: toggleMock,
            });

            await user.click(screen.getByRole('button', { name: 'JP' }));

            // Should switch from EN → JP: toggleLanguage must be called exactly once
            expect(toggleMock).toHaveBeenCalledTimes(1);
        });

        it('calls toggleLanguage when the EN button is clicked while JP is active', async () => {
            const toggleMock = vi.fn();
            renderWithProviders(<LanguageToggle />, {
                language: 'jp',    // JP is currently active
                toggleLanguage: toggleMock,
            });

            await user.click(screen.getByRole('button', { name: 'EN' }));

            expect(toggleMock).toHaveBeenCalledTimes(1);
        });

        it('does NOT call toggleLanguage when the active EN button is clicked', async () => {
            const toggleMock = vi.fn();
            renderWithProviders(<LanguageToggle />, {
                language: 'en',
                toggleLanguage: toggleMock,
            });

            // Clicking the already-active button should be a no-op
            await user.click(screen.getByRole('button', { name: 'EN' }));

            expect(toggleMock).not.toHaveBeenCalled();
        });

        it('does NOT call toggleLanguage when the active JP button is clicked', async () => {
            const toggleMock = vi.fn();
            renderWithProviders(<LanguageToggle />, {
                language: 'jp',
                toggleLanguage: toggleMock,
            });

            await user.click(screen.getByRole('button', { name: 'JP' }));

            expect(toggleMock).not.toHaveBeenCalled();
        });
    });
});
