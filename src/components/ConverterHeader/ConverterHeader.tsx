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
    copyResetTimerRef.current = setTimeout(() => {
      setCopyButtonLabel(COPY_BUTTON_LABEL);
    }, COPY_LABEL_RESET_DELAY_MS);
  }

  const mobileToggleLabel = mobilePane === 'html' ? 'Markdown' : 'HTML';

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-slate-300 bg-gray-50 px-3 py-2 dark:border-slate-800 dark:bg-slate-950">
      <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
        HTML to Markdown
      </h1>

      <div className="flex items-center gap-2">
        <button
          className="rounded border border-slate-300 bg-white px-3 py-1 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 md:hidden dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
          onClick={onTogglePane}
          type="button"
        >
          {mobileToggleLabel}
        </button>

        <button
          className="rounded border border-slate-300 bg-white px-3 py-1 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
          disabled={!markdown.length}
          onClick={() => {
            void handleCopyButtonClick();
          }}
          type="button"
        >
          {copyButtonLabel}
        </button>
      </div>
    </header>
  );
}
