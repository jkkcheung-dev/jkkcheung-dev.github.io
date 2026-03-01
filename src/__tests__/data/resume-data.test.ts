/**
 * src/__tests__/data/resume-data.test.ts
 *
 * These tests validate the *shape and content* of the two resume data files.
 * They are pure TypeScript (no React / DOM) so they run instantly.
 *
 * WHAT WE TEST
 * ────────────
 * • Every required field exists and has the right type.
 * • Both language versions have symmetric structure
 *   (same number of experiences, same skill categories, …).
 * • Nested arrays are non-empty so nothing renders blank.
 * • URLs are plausibly formatted.
 *
 * VITEST CONCEPTS USED
 * ────────────────────
 * describe()   – groups related expectations into a named block.
 * it() / test()– individual test case (aliases of each other).
 * expect()     – assertion entry point.
 * toBe()       – strict equality (===).
 * toEqual()    – deep equality.
 * toBeTruthy() – value is truthy (non-empty string, non-zero number, …).
 * toBeGreaterThan() – numeric comparison.
 * toMatch()    – regex match.
 * toContain()  – array / string membership.
 * toHaveProperty() – object has path (dot-notation supported).
 */

import { resumeEN } from '@/data/resume-en';
import { resumeJP } from '@/data/resume-jp';
import type { Resume } from '@/types';

// ─── Helper: run the same shape tests against any Resume object ───────────────

function describeResumeShape(label: string, resume: Resume) {
    describe(`${label} – required string fields`, () => {
        it('has a non-empty greetings string', () => {
            expect(resume.greetings).toBeTruthy();
        });

        it('has a non-empty role', () => {
            expect(resume.role).toBeTruthy();
        });

        it('has a non-empty location', () => {
            expect(resume.location).toBeTruthy();
        });

        it('has a valid email address', () => {
            // Very basic format check — not RFC-5321 compliant, intentionally simple
            expect(resume.email).toMatch(/^.+@.+\..+$/);
        });

        it('has a GitHub URL', () => {
            expect(resume.github).toMatch(/^https?:\/\//);
        });

        it('has a LinkedIn URL', () => {
            expect(resume.linkedin).toMatch(/^https?:\/\//);
        });
    });

    describe(`${label} – about array`, () => {
        it('has at least one about line', () => {
            expect(resume.about.length).toBeGreaterThan(0);
        });

        it('every about line is a non-empty string', () => {
            resume.about.forEach((line) => expect(line).toBeTruthy());
        });
    });

    describe(`${label} – education`, () => {
        it('has a school name', () => {
            expect(resume.education.school).toBeTruthy();
        });

        it('has a degree string', () => {
            expect(resume.education.degree).toBeTruthy();
        });

        it('has a period string', () => {
            // Period should contain a digit (e.g. "2013 - 2017")
            expect(resume.education.period).toMatch(/\d/);
        });
    });

    describe(`${label} – experiences`, () => {
        it('contains at least one experience entry', () => {
            expect(resume.experiences.length).toBeGreaterThan(0);
        });

        it('every experience has required string fields', () => {
            for (const exp of resume.experiences) {
                expect(exp.company).toBeTruthy();
                expect(exp.role).toBeTruthy();
                expect(exp.employmentType).toBeTruthy();
                expect(exp.period).toBeTruthy();
                expect(exp.location).toBeTruthy();
            }
        });

        it('every experience has at least one highlight', () => {
            for (const exp of resume.experiences) {
                expect(exp.highlights.length).toBeGreaterThan(0);
            }
        });
    });

    describe(`${label} – skills`, () => {
        it('has at least one skill category', () => {
            expect(Object.keys(resume.skills).length).toBeGreaterThan(0);
        });

        it('every skill category has at least one item', () => {
            for (const items of Object.values(resume.skills)) {
                expect(items.length).toBeGreaterThan(0);
            }
        });
    });

    describe(`${label} – spoken languages`, () => {
        it('has at least one language proficiency group', () => {
            expect(Object.keys(resume.languages).length).toBeGreaterThan(0);
        });

        it('every group contains at least one language', () => {
            for (const items of Object.values(resume.languages)) {
                expect(items.length).toBeGreaterThan(0);
            }
        });
    });

    describe(`${label} – certifications (optional section)`, () => {
        it('if present, every certification has a Credly URL', () => {
            if (!resume.certifications) return; // optional field – skip
            for (const url of Object.values(resume.certifications)) {
                expect(url).toMatch(/^https?:\/\//);
            }
        });
    });
}

// ─── Run shape tests for both language variants ───────────────────────────────

describeResumeShape('resumeEN', resumeEN);
describeResumeShape('resumeJP', resumeJP);

// ─── Structural parity: EN and JP should mirror each other ───────────────────

describe('resumeEN vs resumeJP – structural parity', () => {
    it('both have the same number of experiences', () => {
        expect(resumeEN.experiences.length).toBe(resumeJP.experiences.length);
    });

    it('both have the same skill category keys', () => {
        // Keys may be translated, so we compare *counts*, not names
        expect(Object.keys(resumeEN.skills).length).toBe(Object.keys(resumeJP.skills).length);
    });

    it('both have the same language proficiency group count', () => {
        expect(Object.keys(resumeEN.languages).length).toBe(Object.keys(resumeJP.languages).length);
    });

    it('certification count matches between EN and JP', () => {
        const enCount = Object.keys(resumeEN.certifications ?? {}).length;
        const jpCount = Object.keys(resumeJP.certifications ?? {}).length;
        expect(enCount).toBe(jpCount);
    });

    it('EN greetings differs from JP greetings (translation is applied)', () => {
        // A simple sanity check that the two files are not identical
        expect(resumeEN.greetings).not.toBe(resumeJP.greetings);
    });
});

// ─── Spot-check known EN content ─────────────────────────────────────────────

describe('resumeEN – spot-check known content', () => {
    it('greetings contains "Jack"', () => {
        expect(resumeEN.greetings).toContain('Jack');
    });

    it('skills includes "Programming Languages" category', () => {
        expect(resumeEN.skills).toHaveProperty('Programming Languages');
    });

    it('Programming Languages includes TypeScript', () => {
        expect(resumeEN.skills['Programming Languages']).toContain('TypeScript');
    });

    it('education school is The University of Hong Kong', () => {
        expect(resumeEN.education.school).toBe('The University of Hong Kong');
    });

    it('has exactly 3 work experiences', () => {
        expect(resumeEN.experiences).toHaveLength(3);
    });
});
