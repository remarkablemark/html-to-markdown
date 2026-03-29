# Contract: HTML to Markdown Conversion and UI Behavior

## Scope

This contract defines the externally observable behavior of the v1 converter UI and conversion pipeline.

## Input Contract

- The system accepts HTML input through a textarea (paste/type only).
- Input may be valid, malformed, empty, or very large.
- No file upload or URL import is supported in v1.

## Sanitization Contract

- Input is sanitized before conversion.
- `<script>` and `<style>` tags and their contents are removed.
- Unsafe tags/attributes are removed according to sanitizer policy.
- Link/image URL schemes are restricted to `http`, `https`, and `mailto`.

## Conversion Contract

- Output target is GitHub Flavored Markdown (GFM).
- Conversion preserves semantic intent for:
  - headings, paragraphs, emphasis,
  - links, images,
  - unordered/ordered lists,
  - blockquotes,
  - inline code and fenced code blocks,
  - tables, horizontal rules, and checklists.
- Text content order is preserved from input to output.
- Unsupported/custom tags are dropped while inner text/content is preserved.
- Malformed/partial HTML is converted on a best-effort basis without app crash.
- Equivalent input under identical rules yields identical output.

## Timing Contract

- Conversion is automatically triggered after input changes with a 300ms debounce.
- On first load, default sample HTML is auto-converted immediately.
- If input becomes empty, output is cleared.

## UI Contract

- Mobile layout:
  - one pane visible at a time,
  - fixed-header button toggles between `HTML` and `Markdown` views.
- Desktop layout:
  - split panes with HTML input on left and Markdown output on right,
  - mobile toggle is hidden.
- Markdown output pane is read-only.
- UI theme follows system preference (light/dark) with no manual theme toggle.

## Copy Contract

- A fixed-header `Copy` button is shown on mobile and desktop.
- `Copy` is disabled when output is empty.
- On successful clipboard write, button label changes to `Copied` for 1–2 seconds, then returns to `Copy`.
- On copy failure, current UI state remains unchanged and no additional failure feedback is shown.

## Non-Contracted / Out of Scope (v1)

- Persistence across reloads.
- Server-side conversion or API dependencies.
- User-configurable conversion profiles.
- Alternate input sources (files, URLs).
