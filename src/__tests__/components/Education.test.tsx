/**
 * src/__tests__/components/Education.test.tsx
 *
 * Unit tests for the <Education> component.
 *
 * VITEST / RTL CONCEPTS USED
 * ──────────────────────────
 * getByRole('heading')   – semantic role query; h4 maps to heading.
 * getByText()            – finds any element by text.
 * toHaveTextContent()    – jest-dom; checks substring presence in an element.
 */

import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material';
import { theme } from '@/theme';
import { Education } from '@/components/Education';
import { makeEducation } from '@/__tests__/test-utils';

function renderEducation(overrides?: Parameters<typeof makeEducation>[0]) {
    const education = makeEducation(overrides);
    return render(
        <ThemeProvider theme={theme}>
            <Education education={education} />
        </ThemeProvider>,
    );
}

describe('Education', () => {
    it('renders the "Education" section heading', () => {
        renderEducation();
        expect(screen.getByRole('heading', { name: 'Education' })).toBeInTheDocument();
    });

    it('renders the degree name', () => {
        renderEducation({ degree: 'BEng Computer Science' });
        expect(screen.getByText('BEng Computer Science')).toBeInTheDocument();
    });

    it('renders the school name', () => {
        renderEducation({ school: 'The University of Hong Kong' });
        expect(screen.getByText(/The University of Hong Kong/)).toBeInTheDocument();
    });

    it('renders the study period', () => {
        renderEducation({ period: '2013 - 2017' });
        // School and period are combined: "HKU - 2013 - 2017"
        expect(screen.getByText(/2013 - 2017/)).toBeInTheDocument();
    });

    it('renders school and period in the same element', () => {
        renderEducation({ school: 'HKU', period: '2013 - 2017' });
        // toHaveTextContent checks if the *element's* text includes the substring
        const schoolLine = screen.getByText(/HKU/);
        expect(schoolLine).toHaveTextContent('2013 - 2017');
    });

    it('uses the supplied degree even if it is a Japanese string', () => {
        renderEducation({ degree: 'コンピュータサイエンス学士' });
        expect(screen.getByText('コンピュータサイエンス学士')).toBeInTheDocument();
    });
});
