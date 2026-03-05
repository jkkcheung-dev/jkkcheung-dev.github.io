/**
 * src/__tests__/components/DownloadButton.test.tsx
 *
 * Unit tests for the <DownloadButton> component.
 *
 * DownloadButton renders a trigger button that, when clicked, opens a
 * dropdown menu with three download links — one for each resume document.
 * The labels and URLs are fixed (language-context-independent).
 *
 * VITEST / RTL CONCEPTS USED
 * ──────────────────────────
 * userEvent.setup()  – creates a configured user-event instance for realistic
 *                      pointer events.
 * toBeInTheDocument  – asserts an element is present in the DOM.
 * not.toBeInTheDocument – asserts an element is absent from the DOM.
 * toHaveAttribute    – asserts a specific attribute value on a DOM node.
 */

import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@/__tests__/test-utils';
import { DownloadButton } from '@/components/DownloadButton';

const EXPECTED_ITEMS = [
    {
        label: 'English Resume',
        url: 'https://docs.google.com/document/d/1zsmKRDbtOGP42R8e8Vsk2p2Q5HDsS4CQZUlJQUGlQcs/export?format=pdf',
    },
    {
        label: '職務経歴書',
        url: 'https://docs.google.com/document/d/1XXnwUOyEIqvOrmHBHXJ4M4o2BLiqSfre/export?format=pdf',
    },
    {
        label: '履歴書',
        url: 'https://docs.google.com/spreadsheets/d/1cvJtRNkSL6yiKTFhXL8Mo2p7S1LmQABt/export?format=pdf&size=A3&portrait=false&scale=3',
    },
] as const;

describe('DownloadButton', () => {
    const user = userEvent.setup();

    describe('rendering', () => {
        it('renders the Download trigger button', () => {
            renderWithProviders(<DownloadButton />);
            expect(screen.getByRole('button', { name: /CV/i })).toBeInTheDocument();
        });

        it('does not show menu items before the button is clicked', () => {
            renderWithProviders(<DownloadButton />);
            expect(screen.queryByText('English Resume')).not.toBeInTheDocument();
            expect(screen.queryByText('職務経歴書')).not.toBeInTheDocument();
            expect(screen.queryByText('履歴書')).not.toBeInTheDocument();
        });
    });

    describe('dropdown menu', () => {
        it('shows all three document labels after clicking the trigger', async () => {
            renderWithProviders(<DownloadButton />);
            await user.click(screen.getByRole('button', { name: /CV/i }));

            for (const { label } of EXPECTED_ITEMS) {
                expect(screen.getByText(label)).toBeInTheDocument();
            }
        });

        it('renders each item as a link with the correct href', async () => {
            renderWithProviders(<DownloadButton />);
            await user.click(screen.getByRole('button', { name: /CV/i }));

            for (const { label, url } of EXPECTED_ITEMS) {
                const link = screen.getByText(label).closest('a');
                expect(link).toHaveAttribute('href', url);
            }
        });

        it('opens each item link in a new tab', async () => {
            renderWithProviders(<DownloadButton />);
            await user.click(screen.getByRole('button', { name: /CV/i }));

            for (const { label } of EXPECTED_ITEMS) {
                const link = screen.getByText(label).closest('a');
                expect(link).toHaveAttribute('target', '_blank');
            }
        });

        it('closes the menu after clicking a menu item', async () => {
            renderWithProviders(<DownloadButton />);
            await user.click(screen.getByRole('button', { name: /CV/i }));

            // Menu is open — English Resume is visible
            expect(screen.getByText('English Resume')).toBeInTheDocument();

            await user.click(screen.getByText('English Resume'));

            // Menu should close
            expect(screen.queryByText('English Resume')).not.toBeInTheDocument();
        });
    });

    describe('language context independence', () => {
        it('shows the same labels in English language context', async () => {
            renderWithProviders(<DownloadButton />, { language: 'en' });
            await user.click(screen.getByRole('button', { name: /CV/i }));

            for (const { label } of EXPECTED_ITEMS) {
                expect(screen.getByText(label)).toBeInTheDocument();
            }
        });

        it('shows the same labels in Japanese language context', async () => {
            renderWithProviders(<DownloadButton />, { language: 'jp' });
            await user.click(screen.getByRole('button', { name: /CV/i }));

            for (const { label } of EXPECTED_ITEMS) {
                expect(screen.getByText(label)).toBeInTheDocument();
            }
        });
    });
});
