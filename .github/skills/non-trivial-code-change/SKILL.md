---
name: non-trivial-code-change
description: 'Use when planning and implementing a medium or large code change that should be reviewed before editing. Covers context gathering, plan approval, implementation, and validation.'
---

# Non-Trivial Code Change

## When to Use

Use this workflow when:
- the requested change spans multiple files or components
- the implementation has architectural or UX tradeoffs
- the user wants a plan before edits begin
- the change should be validated with targeted tests after implementation

## Procedure

1. Gather the minimum context needed to understand the current implementation and constraints.
2. Produce a concise implementation plan that calls out scope, touched files, risks, and validation.
3. Present the plan in chat and wait for user approval before editing.
4. Implement the approved changes with minimal scope and in the existing project style.
5. Run the relevant tests or other validation steps after the code change.
6. Report the result briefly, including any blockers or follow-up decisions.

## Constraints

- Keep the plan concise and actionable.
- Do not start editing before the user approves the plan.
- Prefer the smallest change that satisfies the request.
- Do not expand scope to unrelated cleanup unless the user asks.
- When tests exist for the touched area, run them after implementation.

## Repo Notes

When this skill is used in this repository:
- preserve the bilingual architecture and data-driven resume content model
- keep language-dependent copy in `src/data/resume-en.ts` and `src/data/resume-jp.ts`
- allow fixed-label UI only when it is intentionally language-independent
- use `renderWithProviders` for component tests
