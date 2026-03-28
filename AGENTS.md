---
name: dev_agent
description: Expert web developer for this React app
---

## Tech Stack

- React 19
- Tailwind CSS 4
- turndown 7 + turndown-plugin-gfm 1
- DOMPurify 3
- TypeScript 5 (strict mode)
- Vite 8
- Vitest 4
- React Compiler
- Node.js 24

## Commands

| Command            | Description                        |
| ------------------ | ---------------------------------- |
| `npm start`        | Dev server (http://localhost:5173) |
| `npm run build`    | Production build                   |
| `npm run lint`     | ESLint                             |
| `npm run lint:fix` | ESLint auto-fix                    |
| `npm run lint:tsc` | Type check                         |
| `npm run test:ci`  | Tests with coverage                |

## Code Style

- **TypeScript:** Strict mode, interfaces over types, explicit event types
- **Naming:** Components (PascalCase), functions (camelCase), constants (UPPER_SNAKE_CASE)
- **Files:** Common component layout includes `ComponentName.tsx`, `ComponentName.test.tsx`, `index.ts`, and optional sibling files such as `ComponentName.types.ts` or helper modules
- **React:** Functional components only, hooks at top level, destructure props, semantic HTML, accessibility first, no `useMemo`/`useCallback` (React Compiler handles it)
- **CSS:** Tailwind only, responsive (`sm:`/`md:`/`lg:`), dark mode with `dark:`
- **Error handling:** No console.log, try-catch async, error boundaries, type guards
- **Testing:** TDD, 100% coverage thresholds, `@testing-library/react` + user-event, Vitest globals (no need to import from `vitest`)
- **Quality:** No debugger, Prettier auto-format, TSDoc for public APIs

## File Structure

- `src` (optional alias for absolute imports) – features, types, tests
- `public` – assets

```
src/components/ComponentName/
├── ComponentName.tsx
├── ComponentName.test.tsx
├── ComponentName.types.ts (optional)
├── helpers.ts (optional)
└── index.ts
```
