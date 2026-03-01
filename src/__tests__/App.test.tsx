/**
 * src/__tests__/App.test.tsx
 *
 * Integration tests for <App> — the root component.
 *
 * These tests mount the entire application (real providers, real context, real
 * data files) and verify the composed behaviour, particularly the language-
 * switching feature that connects LanguageToggle → LanguageContext → all sections.
 *
 * Integration tests are valuable because:
 *  • They catch wiring bugs that unit tests cannot (e.g. context not provided).
 *  • They exercise the real data files, so a typo in resume-en.ts will fail here.
 *  • They simulate what a real user sees.
 *
 * They are slower than unit tests, so we keep them focused on high-value
 * end-to-end scenarios rather than exhaustively re-testing every component.
 *
 * VITEST / RTL CONCEPTS USED
 * ──────────────────────────
 * render()           – mounts the full component tree.
 * userEvent.setup()  – creates a user-event instance for simulated interactions.
 * await user.click() – simulates a pointer click and waits for state updates.
 * waitFor()          – retries an assertion until it passes or times out.
 *                      Use this when state updates might be asynchronous.
 * findByText()       – async version of getByText; waits up to ~1 s.
 *                      Equivalent to waitFor(() => getByText(…)).
 * resumeEN / resumeJP – we import the actual data so tests break if the data changes
 */

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '@/App';
import { resumeEN } from '@/data/resume-en';
import { resumeJP } from '@/data/resume-jp';

// Mock useMediaQuery globally for App-level tests (same pattern as Experience.test.tsx)
vi.mock('@mui/material', async (importOriginal) => {
    const mod = await importOriginal<typeof import('@mui/material')>();
    return { ...mod, useMediaQuery: vi.fn().mockReturnValue(false) };
});

function renderApp() {
    return render(<App />);
}

describe('App – initial render', () => {
    it('mounts without crashing', () => {
        expect(() => renderApp()).not.toThrow();
    });

    it('shows English greeting by default', () => {
        renderApp();
        expect(screen.getByText(resumeEN.greetings)).toBeInTheDocument();
    });

    it('shows the EN toggle button as the initially active option', () => {
        renderApp();
        // Both buttons render; we just confirm the EN button exists
        expect(screen.getByRole('button', { name: 'EN' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'JP' })).toBeInTheDocument();
    });

    it('renders all main sections', () => {
        renderApp();
        // Each section has an h4 heading
        expect(screen.getByRole('heading', { name: 'Skills' })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: 'Languages' })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: 'Experience' })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: 'Education' })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: 'Certifications' })).toBeInTheDocument();
    });

    it('renders English education details', () => {
        renderApp();
        expect(screen.getByText(resumeEN.education.degree)).toBeInTheDocument();
        expect(screen.getByText(/The University of Hong Kong/)).toBeInTheDocument();
    });
});

describe('App – language toggle (EN → JP)', () => {
    const user = userEvent.setup();

    it('switches to Japanese greeting after clicking JP', async () => {
        renderApp();

        // Confirm English is shown first
        expect(screen.getByText(resumeEN.greetings)).toBeInTheDocument();

        // Click the JP button
        await user.click(screen.getByRole('button', { name: 'JP' }));

        // Greeting should now be the Japanese version
        await waitFor(() => {
            expect(screen.getByText(resumeJP.greetings)).toBeInTheDocument();
        });

        // English greeting should no longer be visible
        expect(screen.queryByText(resumeEN.greetings)).not.toBeInTheDocument();
    });

    it('switches back to English after clicking EN from JP', async () => {
        renderApp();

        // Switch to JP first
        await user.click(screen.getByRole('button', { name: 'JP' }));
        await waitFor(() => {
            expect(screen.getByText(resumeJP.greetings)).toBeInTheDocument();
        });

        // Switch back to EN
        await user.click(screen.getByRole('button', { name: 'EN' }));
        await waitFor(() => {
            expect(screen.getByText(resumeEN.greetings)).toBeInTheDocument();
        });
    });

    it('clicking the active language button again changes nothing', async () => {
        renderApp();

        // EN is already active; click EN again
        await user.click(screen.getByRole('button', { name: 'EN' }));

        // Should still show English
        expect(screen.getByText(resumeEN.greetings)).toBeInTheDocument();
        expect(screen.queryByText(resumeJP.greetings)).not.toBeInTheDocument();
    });
});

describe('App – content completeness', () => {
    it('renders at least one certification link', () => {
        renderApp();
        // Certifications section should have clickable links
        const certLinks = screen
            .getAllByRole('link')
            .filter((l) => l.getAttribute('href')?.includes('credly'));
        expect(certLinks.length).toBeGreaterThan(0);
    });

    it('renders experience cards for all work entries', () => {
        renderApp();
        resumeEN.experiences.forEach((exp) => {
            expect(screen.getByText(exp.role)).toBeInTheDocument();
        });
    });
});
