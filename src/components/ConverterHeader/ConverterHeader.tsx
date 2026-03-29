import { useEffect, useRef, useState } from 'react';
import { COPY_LABEL_RESET_DELAY_MS } from 'src/constants/converter';
import { copyToClipboard } from 'src/utils/copyToClipboard';

interface ConverterHeaderProps {
  markdown: string;
  mobilePane: 'html' | 'markdown';
  onTogglePane: () => void;
}

const COPY_BUTTON_LABEL = 'Copy';
const COPIED_BUTTON_LABEL = 'Copied';

export function ConverterHeader({
  markdown,
  mobilePane,
  onTogglePane,
}: ConverterHeaderProps) {
  const [copyButtonLabel, setCopyButtonLabel] = useState(COPY_BUTTON_LABEL);
  const [justCopied, setJustCopied] = useState(false);
  const copyResetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (copyResetTimerRef.current) {
        clearTimeout(copyResetTimerRef.current);
      }
    };
  }, []);

  async function handleCopyButtonClick() {
    /* v8 ignore start */
    if (!markdown.length) {
      return;
    }
    /* v8 ignore stop */

    const didCopy = await copyToClipboard(markdown);

    if (!didCopy) {
      return;
    }

    /* v8 ignore start */
    if (copyResetTimerRef.current) {
      clearTimeout(copyResetTimerRef.current);
    }
    /* v8 ignore stop */

    setCopyButtonLabel(COPIED_BUTTON_LABEL);
    setJustCopied(true);
    copyResetTimerRef.current = setTimeout(() => {
      setCopyButtonLabel(COPY_BUTTON_LABEL);
      setJustCopied(false);
    }, COPY_LABEL_RESET_DELAY_MS);
  }

  const mobileToggleLabel = mobilePane === 'html' ? 'Markdown' : 'HTML';

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between gap-3 border-b border-slate-300 bg-gray-50 px-4 py-2 dark:border-slate-800 dark:bg-slate-950">
      <h1 className="text-xl font-bold text-gray-900 sm:text-2xl dark:text-white">
        HTML to Markdown
      </h1>

      <div className="flex items-center gap-2">
        <a
          aria-label="GitHub repository"
          className="hidden h-8 w-8 items-center justify-center rounded border border-slate-300 bg-white text-slate-700 transition hover:bg-slate-100 md:flex dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
          href="https://github.com/remarkablemark/html-to-markdown"
          rel="noopener noreferrer"
          target="_blank"
          title="View on GitHub"
        >
          <svg
            aria-hidden="true"
            className="h-5 w-5"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
        </a>

        <button
          aria-label={`Switch to ${mobileToggleLabel}`}
          className="cursor-pointer rounded border border-slate-300 bg-white p-2 text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 md:hidden dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
          onClick={onTogglePane}
          title={`Switch to ${mobileToggleLabel}`}
          type="button"
        >
          <svg
            aria-hidden="true"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M8 7h12m0 0-4-4m4 4-4 4m0 6H4m0 0 4 4m-4-4 4-4" />
          </svg>
        </button>

        <button
          aria-label={copyButtonLabel}
          className={`cursor-pointer rounded border border-slate-300 p-2 text-slate-700 transition active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 md:px-4 md:py-1 md:text-sm md:font-medium dark:border-slate-700 dark:text-slate-200 ${justCopied ? 'scale-95 bg-green-100 hover:bg-green-100 dark:bg-green-900/30 dark:hover:bg-green-900/30' : 'bg-white hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800'}`}
          disabled={!markdown.length}
          onClick={() => {
            void handleCopyButtonClick();
          }}
          title="Copy Markdown to clipboard"
          type="button"
        >
          <svg
            aria-hidden="true"
            className="h-5 w-5 md:hidden"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            {justCopied ? (
              <>
                <path d="M20 6 9 17l-5-5" />
              </>
            ) : (
              <>
                <rect height="13" rx="2" ry="2" width="13" x="9" y="9" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </>
            )}
          </svg>
          <span className="hidden md:inline">{copyButtonLabel}</span>
        </button>
      </div>
    </header>
  );
}
