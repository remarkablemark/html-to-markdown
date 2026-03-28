# Quickstart: HTML to Markdown Converter

## Prerequisites

- Node.js 24 (see `.nvmrc`)
- npm

## Install

```bash
npm install
```

## Run locally

```bash
npm start
```

App runs at `http://localhost:5173`.

## Verify core workflow

1. Confirm the HTML input is pre-filled with sample content on first load.
2. Confirm Markdown output is already populated from the sample.
3. Edit the HTML input and verify output updates after ~300ms.
4. Clear the input and verify Markdown output clears.
5. In mobile viewport, verify one-pane mode with `HTML`/`Markdown` toggle in header.
6. In desktop viewport, verify split panes with toggle hidden.
7. Verify output pane is read-only.
8. Verify header `Copy` button is:
   - disabled when output is empty,
   - changes to `Copied` for 1–2 seconds on successful copy,
   - shows no new failure message on copy failure.

## Run quality gates

```bash
npm run lint
npm run lint:tsc
npm run test:ci
npm run build
```

All commands must pass before implementation is considered complete.

## Implementation notes

- Keep conversion client-side only (no server/API calls).
- Enforce sanitizer policy before conversion.
- Keep conversion behavior deterministic for equivalent inputs.
- Use concern-based module organization:
  - `src/components/Converter/` and `src/components/ConverterHeader/` for UI
  - `src/utils/` for conversion/sanitization/debounce/clipboard helpers
  - `src/constants/` for shared constants and sample HTML
  - `src/types/` for shared converter interfaces
