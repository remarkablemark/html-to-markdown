# Implementation Plan: HTML to Markdown Converter

**Branch**: `001-html-markdown-converter` | **Date**: 2026-03-28 | **Spec**: `/Users/mark/Code/javascript/html-to-markdown/specs/001-html-markdown-converter/spec.md`
**Input**: Feature specification from `/Users/mark/Code/javascript/html-to-markdown/specs/001-html-markdown-converter/spec.md`

## Summary

Deliver a client-side HTML-to-Markdown converter web app that accepts pasted/typed HTML and produces deterministic GitHub Flavored Markdown output with 300ms debounced auto-conversion. The implementation will sanitize input before conversion, remove unsafe/unsupported markup per explicit rules, and provide responsive UI behavior (mobile single-pane toggle, desktop split-pane) with a fixed-header copy action and read-only output pane.

## Technical Context

**Language/Version**: TypeScript 5.9 (strict), React 19  
**Primary Dependencies**: React, React DOM, Vite 8, Tailwind CSS 4, Vitest 4, Testing Library, planned conversion stack (`turndown`, `turndown-plugin-gfm`, `dompurify`)  
**Storage**: N/A (explicitly no persistence in v1)  
**Testing**: Vitest + `@testing-library/react` + `@testing-library/user-event` + coverage gates via `npm run test:ci`  
**Target Platform**: Modern desktop/mobile browsers (client-side only static deployment)  
**Project Type**: Single-page frontend web application  
**Performance Goals**: Reliable debounced updates at 300ms after last input; no explicit conversion latency SLA in v1  
**Constraints**: Remove `<script>`/`<style>` with contents, sanitize unsafe tags/attributes, allow only `http`/`https`/`mailto` URL schemes, best-effort for malformed/large input, hide preview toggle on desktop, keep output read-only  
**Scale/Scope**: Single-screen tool with one primary conversion workflow and deterministic output rules

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

- [x] Deterministic conversion behavior is specified for core and edge-case HTML inputs, including malformed/unsupported markup handling.
- [x] Accessibility and responsive UX expectations are defined for all user-facing flows (semantic structure, keyboard use, readable feedback).
- [x] Test-first plan is explicit: failing tests are identified before implementation, and required test scope (unit/integration/regression) is listed.
- [x] Type safety and lint quality gates are included in execution plan: `npm run lint` and `npm run lint:tsc`.
- [x] Delivery quality gates are planned and traceable: `npm run test:ci` and `npm run build`.
- [x] Documentation impact is identified (README/spec/quickstart updates) for user-visible and contract-level behavior changes.

Post-Phase-1 re-check: PASS. Phase 1 artifacts define explicit conversion rules, user-facing interface contracts, and validation/test coverage expectations without constitutional violations.

## Project Structure

### Documentation (this feature)

```text
/Users/mark/Code/javascript/html-to-markdown/specs/001-html-markdown-converter/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── conversion-contract.md
└── tasks.md
```

### Source Code (repository root)

```text
/Users/mark/Code/javascript/html-to-markdown/
├── src/
│   ├── components/
│   │   └── App/
│   │       ├── App.tsx
│   │       ├── App.test.tsx
│   │       ├── brands.ts
│   │       └── index.ts
│   ├── main.tsx
│   ├── main.test.tsx
│   ├── setupTests.ts
│   └── style.css
├── public/
└── specs/
    └── 001-html-markdown-converter/
```

**Structure Decision**: Single-project frontend structure is retained. Feature implementation will extend `src/components/App/` with focused converter UI/logic modules and tests while keeping feature planning artifacts in `specs/001-html-markdown-converter/`.

## Phase Execution Plan

### Phase 0: Research

- Validate conversion engine choice for deterministic GFM output in browser context.
- Select sanitizer strategy that supports strict URL-scheme filtering and script/style removal.
- Define robust behavior for malformed and unsupported tags while preserving text order.
- Document decisions and alternatives in `research.md`.

### Phase 1: Design & Contracts

- Define core entities, relationships, validation, and state transitions in `data-model.md`.
- Define UI/conversion behavior contract in `contracts/conversion-contract.md`.
- Provide local run/verification workflow and manual QA path in `quickstart.md`.

### Phase 2: Implementation Planning Readiness

- Prepare for `/speckit.tasks` with explicit test-first slices:
  - converter + sanitizer unit coverage
  - responsive UI interaction tests
  - copy workflow and timing behavior tests
- Ensure implementation tasks include required quality gates:
  `npm run lint`, `npm run lint:tsc`, `npm run test:ci`, `npm run build`.

## Complexity Tracking

No constitutional violations or exceptions are required for this plan.
