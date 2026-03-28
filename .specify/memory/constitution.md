<!--
Sync Impact Report
- Version change: template-placeholder → 1.0.0
- Modified principles:
  - Principle 1 placeholder → I. Deterministic Conversion Semantics
  - Principle 2 placeholder → II. Accessible and Predictable UX
  - Principle 3 placeholder → III. Test-First Reliability (NON-NEGOTIABLE)
  - Principle 4 placeholder → IV. Type-Safe, Lint-Clean Code
  - Principle 5 placeholder → V. Minimal, Documented Change Surface
- Added sections:
  - Technical Standards
  - Delivery Workflow & Quality Gates
- Removed sections:
  - None
- Templates requiring updates:
  - ✅ updated .specify/templates/plan-template.md
  - ✅ updated .specify/templates/spec-template.md
  - ✅ updated .specify/templates/tasks-template.md
  - ✅ verified .specify/templates/agent-file-template.md (no changes required)
  - ⚠ pending .specify/templates/commands/*.md (directory not present)
- Follow-up TODOs:
  - None
-->

# HTML to Markdown Constitution

## Core Principles

### I. Deterministic Conversion Semantics

All HTML-to-Markdown transformations MUST be deterministic for equivalent input and
configuration. Converter rules MUST preserve semantic intent (e.g., headings, lists,
links, emphasis, code blocks) and MUST define explicit behavior for malformed or
unsupported markup. Rationale: stable, semantic output is the core product contract.

### II. Accessible and Predictable UX

User-facing workflows MUST use semantic HTML and accessibility-first interactions,
including keyboard navigability, meaningful labels, and readable state feedback.
UI behavior MUST remain predictable across desktop and mobile breakpoints.
Rationale: conversion tools are utility software and must be usable by all users.

### III. Test-First Reliability (NON-NEGOTIABLE)

Every behavior change MUST begin with failing tests that define expected outcomes
before implementation. Unit and integration tests MUST cover parser behavior,
edge-case input, and regression scenarios. Changes are complete only when
`npm run test:ci` passes under configured coverage thresholds. Rationale: converter
logic is edge-case heavy and requires regression-proof evolution.

### IV. Type-Safe, Lint-Clean Code

All code MUST pass TypeScript strict checks and lint rules with zero unresolved
errors (`npm run lint` and `npm run lint:tsc`). Public logic MUST prefer explicit
interfaces and type guards over implicit assumptions. Rationale: type and lint
discipline prevent silent converter regressions and improve maintainability.

### V. Minimal, Documented Change Surface

Implementations MUST favor simple, composable solutions and avoid speculative
abstractions. Every user-visible or contract-affecting change MUST update relevant
documentation (README, feature specs, or quickstart guidance) in the same change.
Rationale: small, documented deltas reduce risk and improve contributor velocity.

## Technical Standards

- The project stack is React 19, TypeScript 5 (strict), Tailwind CSS 4, Vite 8,
  Vitest 4, and Node.js 24.
- React code MUST use functional components, top-level hooks only, and avoid
  `useMemo`/`useCallback` unless a verified correctness requirement exists.
- Styling MUST use Tailwind utilities and maintain responsive behavior.
- Runtime diagnostics MUST avoid `console.log` and `debugger` in committed code.

## Delivery Workflow & Quality Gates

- Work MUST be traceable to a feature spec and implementation plan before coding.
- Pull requests MUST include evidence of passing quality gates:
  `npm run lint`, `npm run lint:tsc`, `npm run test:ci`, and `npm run build`.
- Reviews MUST confirm constitutional compliance, including accessibility,
  deterministic conversion behavior, and documentation updates.
- If a constitutional gate is intentionally violated, the plan MUST document the
  exception in a Complexity Tracking section with explicit justification.

## Governance

This constitution is the highest-priority engineering policy for this repository.
Amendments require: (1) documented rationale, (2) updates to impacted templates and
guidance files, and (3) approval in a reviewed change.

Versioning policy:

- MAJOR: Backward-incompatible governance changes or principle removal/redefinition.
- MINOR: New principle/section or materially expanded guidance.
- PATCH: Clarifications or non-semantic wording improvements.

Compliance review is mandatory for every pull request. Reviewers MUST explicitly
verify constitutional gates and reject changes that fail mandatory quality checks.

**Version**: 1.0.0 | **Ratified**: 2026-03-28 | **Last Amended**: 2026-03-28
