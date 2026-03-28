# Data Model: HTML to Markdown Converter

## Overview

This feature is client-side and does not persist data. The model documents in-memory entities and contracts used to keep conversion behavior deterministic and testable.

## Entities

### 1) SourceHtmlDocument

- Description: Current user-provided HTML content (typed or pasted), including first-load sample content.
- Fields:
  - `rawHtml: string` - current input textarea content.
  - `origin: 'sample' | 'user'` - initial sample content vs user-modified content.
  - `updatedAtMs: number` - last input mutation timestamp.
- Validation rules:
  - Accepts any string, including empty and malformed HTML.
  - Empty or whitespace-only values are valid and must clear output after conversion.

### 2) SanitizedHtmlDocument

- Description: Sanitized intermediate HTML used for conversion.
- Fields:
  - `sanitizedHtml: string` - sanitizer output string.
  - `removedScriptStyle: boolean` - indicates whether `<script>`/`<style>` content was removed.
  - `removedUnsafeAttrs: boolean` - indicates whether unsafe attributes/schemes were stripped.
- Validation rules:
  - Must never contain executable script/style blocks.
  - Link/image URLs must allow only `http`, `https`, and `mailto`.

### 3) MarkdownResult

- Description: Deterministic Markdown output shown in read-only pane.
- Fields:
  - `markdown: string` - converted output (GFM target).
  - `isEmpty: boolean` - convenience flag (`markdown.length === 0`).
  - `convertedAtMs: number` - timestamp of last successful conversion pass.
- Validation rules:
  - Must preserve text order from source input.
  - Unsupported/custom tags must not appear as raw unsupported wrappers; inner text must be preserved.

### 4) ConversionRuleSet

- Description: Mapping and fallback behavior from HTML to Markdown.
- Fields:
  - `targetFlavor: 'gfm'`.
  - `supportedElements: string[]` - required semantic mappings (heading, emphasis, link, list, image, quote, code, table, hr, checklist).
  - `fallbackMode: 'drop-tag-keep-content'`.
- Validation rules:
  - Rule set must produce identical output for equivalent input and configuration.
  - Fallback behavior must be deterministic for malformed/unsupported markup.

### 5) ViewportPresentationState

- Description: UI presentation state for mobile/desktop behavior.
- Fields:
  - `isMobile: boolean` - breakpoint-derived layout mode.
  - `mobilePane: 'html' | 'markdown'` - active pane on mobile.
  - `showMobileToggle: boolean` - true only in mobile layout.
- Validation rules:
  - Desktop always shows both panes and hides mobile toggle.
  - Mobile shows one pane at a time with toggle label reflecting target pane.

### 6) CopyActionState

- Description: Header copy interaction state.
- Fields:
  - `isCopyEnabled: boolean` - false when markdown output is empty.
  - `label: 'Copy' | 'Copied'` - button label.
  - `resetAtMs: number | null` - scheduled reset timestamp after success.
- Validation rules:
  - Must switch to `Copied` only after successful clipboard write.
  - Must return to `Copy` after 1–2 seconds.
  - On copy failure, keep current state unchanged and show no extra failure feedback.

## Relationships

- `SourceHtmlDocument` -> (sanitize) -> `SanitizedHtmlDocument` -> (convert via `ConversionRuleSet`) -> `MarkdownResult`
- `MarkdownResult.isEmpty` controls `CopyActionState.isCopyEnabled`
- `ViewportPresentationState` controls visible pane and toggle visibility, but does not alter conversion output

## State Transitions

1. App initialization
   - Load default sample into `SourceHtmlDocument` (`origin = 'sample'`).
   - Run immediate sanitize + convert pipeline to populate `MarkdownResult`.

2. Input change
   - Update `SourceHtmlDocument.rawHtml` and `updatedAtMs`.
   - Start/reset 300ms debounce timer.
   - On timer completion, regenerate `SanitizedHtmlDocument` and `MarkdownResult`.

3. Empty input
   - `SourceHtmlDocument.rawHtml` becomes empty/whitespace.
   - Conversion pipeline sets `MarkdownResult.markdown` to empty string.
   - `CopyActionState.isCopyEnabled` becomes false.

4. Mobile toggle action
   - Flip `ViewportPresentationState.mobilePane` between `html` and `markdown`.
   - Update visible button text accordingly.

5. Copy action
   - If `isCopyEnabled` and clipboard write succeeds: set label to `Copied`, schedule reset in 1–2 seconds.
   - If clipboard write fails: leave `CopyActionState` unchanged.

## Derived Invariants

- Conversion remains client-side only; no network/API dependency.
- Output pane is always read-only and cannot mutate `MarkdownResult` directly.
- For same input + rule set + sanitizer config, output must be deterministic.
