# Tasks: HTML to Markdown Converter

**Input**: Design documents from `/Users/mark/Code/javascript/html-to-markdown/specs/001-html-markdown-converter/`
**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `contracts/conversion-contract.md`, `quickstart.md`

**Tests**: Test tasks are REQUIRED. Define failing tests first, then implement to pass.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., `US1`, `US2`, `US3`)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and tooling updates required before feature implementation.

- [x] T001 Add conversion dependencies (`turndown`, `turndown-plugin-gfm`, `dompurify`) to `package.json`
- [x] T002 Create converter sample fixture covering required HTML elements in `src/constants/sampleHtml.ts`
- [x] T003 [P] Add shared converter type interfaces (`SourceHtmlDocument`, `SanitizedHtmlDocument`, `MarkdownResult`, `ConversionRuleSet`) in `src/types/converter.ts`
- [x] T004 [P] Add conversion constants for debounce, copy reset delay, and allowed URL schemes in `src/constants/converter.ts`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core conversion/sanitization building blocks and shared component wiring that block all user stories.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [x] T005 [P] Add sanitizer unit tests for unsafe tag/attribute/scheme stripping in `src/utils/sanitizeHtml.test.ts`
- [x] T006 [P] Add conversion pipeline unit tests for deterministic output and supported element mappings in `src/utils/convertHtmlToMarkdown.test.ts`
- [x] T007 [P] Add debounce helper with timer reset support in `src/utils/debounce.ts`
- [x] T008 Implement DOMPurify sanitizer policy (remove script/style, restrict URL schemes) in `src/utils/sanitizeHtml.ts`
- [x] T009 Implement Turndown + GFM conversion service with deterministic fallback rules in `src/utils/convertHtmlToMarkdown.ts`
- [x] T010 Integrate converter component exports in `src/components/Converter/index.ts`

**Checkpoint**: Foundation ready - user story implementation can now begin.

---

## Phase 3: User Story 1 - Convert HTML into Markdown (Priority: P1) 🎯 MVP

**Goal**: Users can type/paste HTML and receive synchronized GFM output with first-load sample content and debounced conversion.

**Independent Test**: Submit representative HTML snippets and verify semantic Markdown output updates after 300ms debounce, including initial sample auto-conversion.

### Tests for User Story 1 (REQUIRED) ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T011 [P] [US1] Add converter integration test for prefilled sample and immediate initial conversion in `src/components/Converter/Converter.test.tsx`
- [ ] T012 [P] [US1] Add converter integration test for 300ms debounced output synchronization after HTML edits in `src/components/Converter/Converter.test.tsx`
- [ ] T013 [P] [US1] Add converter integration test for empty/whitespace input clearing Markdown output state in `src/components/Converter/Converter.test.tsx`
- [ ] T047 [P] [US1] Add sample fixture completeness test asserting heading/bold/italic/inline code/unordered list/ordered list/link/image/blockquote/code block/table/hr/checklist coverage in `src/constants/sampleHtml.test.ts`

### Implementation for User Story 1

- [ ] T014 [US1] Implement HTML input state and source metadata (`rawHtml`, `origin`, `updatedAtMs`) in `src/components/Converter/Converter.tsx`
- [ ] T015 [US1] Implement first-load sample initialization and immediate conversion flow in `src/components/Converter/Converter.tsx`
- [ ] T016 [US1] Implement debounced conversion trigger (300ms) and synchronized Markdown state updates in `src/components/Converter/Converter.tsx`
- [ ] T017 [US1] Implement read-only Markdown output pane rendering and semantic labels in `src/components/Converter/Converter.tsx`

**Checkpoint**: User Story 1 is functional and independently testable.

---

## Phase 4: User Story 2 - Handle imperfect HTML safely (Priority: P2)

**Goal**: Users can convert malformed/partial/unsafe HTML safely and deterministically without crashes.

**Independent Test**: Submit malformed HTML, unsupported tags, and unsafe payloads and verify stable best-effort Markdown output with sanitization and fallback behavior.

### Tests for User Story 2 (REQUIRED) ⚠️

- [ ] T018 [P] [US2] Add conversion service tests for malformed HTML best-effort behavior in `src/utils/convertHtmlToMarkdown.test.ts`
- [ ] T019 [P] [US2] Add conversion service tests for dropping unsupported/custom tags while preserving inner content in `src/utils/convertHtmlToMarkdown.test.ts`
- [ ] T020 [P] [US2] Add sanitizer tests confirming `<script>`/`<style>` removal with contents and URL scheme filtering in `src/utils/sanitizeHtml.test.ts`
- [ ] T021 [P] [US2] Add converter integration test verifying resilient rendering for malformed HTML input in `src/components/Converter/Converter.test.tsx`

### Implementation for User Story 2

- [ ] T022 [US2] Implement unsupported-tag fallback rule set and deterministic ordering guarantees in `src/utils/convertHtmlToMarkdown.ts`
- [ ] T023 [US2] Implement malformed-input safe parsing flow and best-effort conversion path in `src/utils/convertHtmlToMarkdown.ts`
- [ ] T024 [US2] Apply sanitizer-before-conversion enforcement in converter pipeline calls in `src/components/Converter/Converter.tsx`
- [ ] T025 [US2] Implement empty/invalid input user feedback state for non-meaningful output in `src/components/Converter/Converter.tsx`

**Checkpoint**: User Stories 1 and 2 work independently with safe, resilient conversion behavior.

---

## Phase 5: User Story 3 - Reuse output efficiently (Priority: P3)

**Goal**: Users can copy output efficiently and use responsive mobile/desktop presentation controls.

**Independent Test**: Verify copy button state/label behavior and responsive pane behavior on mobile vs desktop without affecting conversion correctness.

### Tests for User Story 3 (REQUIRED) ⚠️

- [ ] T026 [P] [US3] Add converter integration test for mobile toggle visibility/label switching between `HTML` and `Markdown` in `src/components/Converter/Converter.test.tsx`
- [ ] T027 [P] [US3] Add converter integration test for desktop split-pane layout with toggle hidden in `src/components/Converter/Converter.test.tsx`
- [ ] T028 [P] [US3] Add header action integration test for `Copy` button enable/disable behavior based on output emptiness in `src/components/ConverterHeader/ConverterHeader.test.tsx`
- [ ] T029 [P] [US3] Add header action integration test for successful copy label transition (`Copy` -> `Copied` -> `Copy`) in `src/components/ConverterHeader/ConverterHeader.test.tsx`
- [ ] T030 [P] [US3] Add header action integration test for copy failure keeping button state unchanged with no extra feedback in `src/components/ConverterHeader/ConverterHeader.test.tsx`

### Implementation for User Story 3

- [ ] T031 [US3] Implement responsive mobile single-pane toggle state and desktop split-pane behavior in `src/components/Converter/Converter.tsx`
- [ ] T032 [US3] Implement fixed-header controls shared across mobile/desktop in `src/components/ConverterHeader/ConverterHeader.tsx`
- [ ] T033 [US3] Implement clipboard copy helper with disabled-empty guard and success-only temporary label state in `src/utils/copyToClipboard.ts`
- [ ] T034 [US3] Implement copy failure no-op behavior preserving existing UI state in `src/components/ConverterHeader/ConverterHeader.tsx`
- [ ] T035 [US3] Apply system-theme-only styling and remove manual theme controls in `src/components/Converter/Converter.tsx`

**Checkpoint**: All user stories are independently functional.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final validation, documentation updates, and quality gates across all stories.

- [ ] T036 [P] Update feature usage and behavior notes in `README.md`
- [ ] T037 [P] Align verification steps and acceptance checks in `specs/001-html-markdown-converter/quickstart.md`
- [ ] T038 Run `npm run lint` and resolve issues in `src/components/`, `src/utils/`, `src/constants/`, and `src/types/`
- [ ] T039 Run `npm run lint:tsc` and resolve type errors in `src/components/`, `src/utils/`, `src/constants/`, and `src/types/`
- [ ] T040 Run `npm run test:ci` and confirm coverage thresholds for converter tests in `src/components/Converter/`, `src/components/ConverterHeader/`, and `src/utils/`
- [ ] T041 Run `npm run build` and verify production output generated in `dist/`
- [ ] T042 [P] Add representative HTML fixture suite (>=20 samples) in `src/utils/__fixtures__/representativeHtmlSamples.ts`
- [ ] T043 Add conversion accuracy regression test asserting >=95% sample pass rate in `src/utils/convertHtmlToMarkdown.representative.test.ts`
- [ ] T044 [P] Add integration test verifying reload clears input/output session state in `src/components/Converter/Converter.persistence.test.tsx`
- [ ] T045 [P] Add UI scope test verifying no file upload or URL import controls are rendered in `src/components/Converter/Converter.inputScope.test.tsx`
- [ ] T046 [P] Add unit test ensuring conversion pipeline performs no network/API calls in `src/utils/convertHtmlToMarkdown.clientOnly.test.ts`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies; starts immediately.
- **Phase 2 (Foundational)**: Depends on Phase 1; blocks all user stories.
- **Phase 3 (US1)**: Depends on Phase 2; defines MVP.
- **Phase 4 (US2)**: Depends on Phase 2 and can run independently of US3; may reuse US1 utilities.
- **Phase 5 (US3)**: Depends on Phase 2 and can run independently of US2; reuses shared component foundation.
- **Phase 6 (Polish)**: Depends on completion of desired user stories.

### User Story Dependencies

- **US1 (P1)**: No dependency on other stories after Phase 2.
- **US2 (P2)**: No hard dependency on US1 outcomes, but may reuse conversion primitives.
- **US3 (P3)**: No hard dependency on US2 outcomes, but depends on shared converter/header state from foundation.

### Within Each User Story

- Tests must be written first and fail before implementation.
- Conversion/sanitization logic updates before component UI wiring that consumes them.
- App behavior implementation before final refactors.

### Parallel Opportunities

- Setup tasks `T003` and `T004` can run in parallel.
- Foundational tests `T005` and `T006` can run in parallel with utility task `T007`.
- US1 tests `T011`-`T013` can run in parallel.
- US2 tests `T018`-`T021` can run in parallel.
- US3 tests `T026`-`T030` can run in parallel.
- Polish doc tasks `T036` and `T037` can run in parallel.
- Coverage tasks `T042`, `T044`, `T045`, and `T046` can run in parallel.
- Sample coverage test `T047` can run in parallel with other US1 tests.

---

## Parallel Example: User Story 1

```bash
Task: "T011 [US1] Add converter integration test for prefilled sample and immediate initial conversion in src/components/Converter/Converter.test.tsx"
Task: "T012 [US1] Add converter integration test for 300ms debounced output synchronization after HTML edits in src/components/Converter/Converter.test.tsx"
Task: "T013 [US1] Add converter integration test for empty/whitespace input clearing Markdown output state in src/components/Converter/Converter.test.tsx"
Task: "T047 [US1] Add sample fixture completeness test in src/constants/sampleHtml.test.ts"
```

## Parallel Example: User Story 2

```bash
Task: "T018 [US2] Add conversion service tests for malformed HTML best-effort behavior in src/utils/convertHtmlToMarkdown.test.ts"
Task: "T019 [US2] Add conversion service tests for dropping unsupported/custom tags while preserving inner content in src/utils/convertHtmlToMarkdown.test.ts"
Task: "T020 [US2] Add sanitizer tests confirming script/style removal and scheme filtering in src/utils/sanitizeHtml.test.ts"
```

## Parallel Example: User Story 3

```bash
Task: "T026 [US3] Add converter integration test for mobile toggle visibility/label switching in src/components/Converter/Converter.test.tsx"
Task: "T028 [US3] Add header action integration test for Copy button enable/disable behavior in src/components/ConverterHeader/ConverterHeader.test.tsx"
Task: "T029 [US3] Add header action integration test for successful copy label transition in src/components/ConverterHeader/ConverterHeader.test.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 and Phase 2.
2. Complete Phase 3 (US1).
3. Validate US1 independently with targeted tests and manual checks.
4. Demo MVP conversion flow before adding additional stories.

### Incremental Delivery

1. Foundation complete (`T001`-`T010`).
2. Deliver US1 (`T011`-`T017`, `T047`) and validate.
3. Deliver US2 (`T018`-`T025`) and validate.
4. Deliver US3 (`T026`-`T035`) and validate.
5. Finish polish and quality gates (`T036`-`T046`).

### Parallel Team Strategy

1. Team aligns on Phase 1-2 baseline.
2. After Phase 2 completion:
   - Developer A: US1 tasks
   - Developer B: US2 tasks
   - Developer C: US3 tasks
3. Merge per-story increments once each story passes independent tests.

---

## Notes

- All tasks follow required checklist format: `- [ ] T### [P?] [US?] Description with file path`.
- Story labels are applied only to user story phases.
- Paths align with a concern-based single-project frontend structure (`components`, `utils`, `constants`, `types`).
- No server/API tasks are included because v1 is strictly client-side.
- FR-028 (no explicit conversion latency SLA in v1) is treated as a scope constraint and does not require a standalone implementation task.
