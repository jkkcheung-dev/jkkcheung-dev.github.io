/**
 * test-setup.ts
 *
 * This file is executed once before EVERY test suite (vite.config.ts → test.setupFiles).
 * Its only job is to import the jest-dom custom matchers so that every test file can
 * use DOM-aware assertions like:
 *   expect(element).toBeInTheDocument()
 *   expect(element).toHaveTextContent('…')
 *   expect(element).toBeVisible()
 * without having to import them individually.
 */
import '@testing-library/jest-dom';
