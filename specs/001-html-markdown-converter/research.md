# Phase 0 Research: HTML to Markdown Converter

## Decision 1: Use `turndown` with GFM plugin for conversion

- Decision: Use `turndown` as the HTML-to-Markdown engine with `turndown-plugin-gfm` to target GitHub Flavored Markdown output.
- Rationale: Browser-compatible, deterministic rule pipeline, extensible fallback rules, and practical support for core structures required by FR-002/FR-005/FR-008.
- Alternatives considered:
  - `marked`/`markdown-it`: primarily Markdown parsers/renderers, not ideal for HTML-to-Markdown conversion.
  - Custom converter: high implementation risk and lower confidence for edge-case determinism in v1.

## Decision 2: Sanitize with `dompurify` before conversion

- Decision: Sanitize user HTML with `dompurify` in the browser before conversion, with explicit policy to remove unsafe tags/attributes and disallow non-`http`/`https`/`mailto` schemes.
- Rationale: Meets FR-010 and FR-032 with mature browser-native safety behavior; integrates cleanly with client-side-only architecture (FR-035/FR-036).
- Alternatives considered:
  - Manual sanitizer logic: error-prone, incomplete XSS coverage.
  - No sanitization: violates mandatory requirements and constitution safety expectations.

## Decision 3: Parse malformed HTML with browser DOM parser and apply best-effort conversion

- Decision: Convert by parsing sanitized input into DOM and applying conversion rules over the normalized tree.
- Rationale: Browser parsing naturally tolerates malformed markup and allows deterministic best-effort handling (FR-004, FR-011).
- Alternatives considered:
  - Reject malformed HTML: conflicts with resilience requirements.
  - String/regex conversion: brittle and non-semantic under edge cases.

## Decision 4: Handle unsupported/custom tags by dropping wrappers and preserving text content

- Decision: For unknown elements, drop tag semantics and keep inner text/content in output.
- Rationale: Directly satisfies FR-012 while preserving content order (FR-003).
- Alternatives considered:
  - Emit raw HTML passthrough: reduces Markdown consistency.
  - Remove unsupported nodes entirely: risks data loss.

## Decision 5: Use debounced conversion pipeline at 300ms

- Decision: Trigger conversion from input changes with a 300ms debounce timer.
- Rationale: Matches clarified requirement and FR-015 while avoiding unnecessary conversion churn during typing.
- Alternatives considered:
  - Convert on every keystroke: heavier CPU usage for large inputs.
  - Convert only on explicit action: conflicts with required auto-conversion behavior.

## Decision 6: Implement responsive view contract with CSS breakpoints + UI state toggle

- Decision: Mobile uses a single visible textarea pane and button toggle (`HTML`/`Markdown`); desktop uses fixed two-pane layout with toggle hidden.
- Rationale: Satisfies FR-013/FR-014/FR-017/FR-029 and keeps behavior deterministic across viewport changes.
- Alternatives considered:
  - Keep toggle visible on desktop: violates FR-029.
  - Use independent mobile pages: increases complexity and state synchronization overhead.

## Decision 7: Copy interaction via Clipboard API with optimistic success-only feedback

- Decision: Use `navigator.clipboard.writeText` for header copy action; on success show `Copied` label for ~1.5s; on failure keep existing state with no additional error UI.
- Rationale: Meets FR-020 through FR-022 and FR-027 with minimal interaction complexity.
- Alternatives considered:
  - Toast/error messaging on failure: explicitly out of scope.
  - Always show "Copied" regardless of result: inaccurate and non-deterministic UX.

## Decision 8: No persistence for v1 session state

- Decision: Keep HTML input and Markdown output in in-memory React state only.
- Rationale: Directly aligns with FR-016 and simplifies implementation/testing scope.
- Alternatives considered:
  - LocalStorage/sessionStorage: conflicts with v1 requirement.

## Decision 9: Test-first validation strategy

- Decision: Create failing tests first for converter rules, sanitizer behavior, responsive rendering, and copy interactions before implementation.
- Rationale: Required by constitution principle III and needed to protect edge-case-heavy conversion logic.
- Alternatives considered:
  - Implementation-first with later tests: violates constitution and increases regression risk.

## Resolved Clarifications Status

All technical context items are resolved for planning. No open "NEEDS CLARIFICATION" items remain for this feature.
