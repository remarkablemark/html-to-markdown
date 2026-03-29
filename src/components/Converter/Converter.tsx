import { type ChangeEvent, useEffect, useRef, useState } from 'react';
import { CONVERSION_DEBOUNCE_DELAY_MS } from 'src/constants/converter';
import { SAMPLE_HTML } from 'src/constants/sampleHtml';
import type { MarkdownResult, SourceHtmlDocument } from 'src/types/converter';
import { convertHtmlToMarkdown } from 'src/utils/convertHtmlToMarkdown';
import { debounce, type DebouncedFunction } from 'src/utils/debounce';
import { sanitizeHtml } from 'src/utils/sanitizeHtml';

import { ConverterHeader } from '../ConverterHeader';

function buildMarkdownResult(rawHtml: string): MarkdownResult {
  const sanitized = sanitizeHtml(rawHtml);
  const markdown = convertHtmlToMarkdown(sanitized.sanitizedHtml);

  return {
    markdown,
    isEmpty: !markdown.length,
  };
}

const INITIAL_SOURCE_HTML_DOCUMENT: SourceHtmlDocument = {
  rawHtml: SAMPLE_HTML,
  origin: 'sample',
  updatedAtMs: Date.now(),
};

export function Converter() {
  const [sourceHtmlDocument, setSourceHtmlDocument] = useState(
    INITIAL_SOURCE_HTML_DOCUMENT,
  );
  const [markdownResult, setMarkdownResult] = useState<MarkdownResult>(() =>
    buildMarkdownResult(INITIAL_SOURCE_HTML_DOCUMENT.rawHtml),
  );
  const [mobilePane, setMobilePane] = useState<'html' | 'markdown'>('html');
  const debouncedConvertRef = useRef<DebouncedFunction<[string]> | null>(null);

  debouncedConvertRef.current ??= debounce((rawHtml: string) => {
    setMarkdownResult(buildMarkdownResult(rawHtml));
  }, CONVERSION_DEBOUNCE_DELAY_MS);

  useEffect(() => {
    return () => {
      debouncedConvertRef.current?.cancel();
    };
  }, []);

  useEffect(() => {
    if (sourceHtmlDocument.origin === 'sample') {
      return;
    }

    debouncedConvertRef.current?.(sourceHtmlDocument.rawHtml);
  }, [sourceHtmlDocument.origin, sourceHtmlDocument.rawHtml]);

  function handleHtmlInputChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setSourceHtmlDocument({
      rawHtml: event.currentTarget.value,
      origin: 'user',
      updatedAtMs: Date.now(),
    });
  }

  function handleMobilePaneToggle() {
    setMobilePane(
      (previousPane) =>
        /* v8 ignore start */
        previousPane === 'html' ? 'markdown' : 'html',
      /* v8 ignore stop */
    );
  }

  return (
    <section className="flex min-h-0 flex-1 flex-col overflow-hidden">
      <ConverterHeader
        markdown={markdownResult.markdown}
        mobilePane={mobilePane}
        onTogglePane={handleMobilePaneToggle}
      />
      <div className="grid min-h-0 flex-1 md:grid-cols-2">
        <label
          className={`${mobilePane === 'html' ? 'flex' : 'hidden'} min-h-0 flex-col border-b border-slate-300 md:flex md:border-r md:border-b-0 dark:border-slate-800`}
          htmlFor="html-input"
        >
          <span className="block border-b border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 dark:border-slate-800 dark:text-slate-300">
            HTML input
          </span>
          <textarea
            className="min-h-0 w-full flex-1 resize-none border-0 bg-slate-100 p-3 font-mono text-sm leading-7 text-slate-900 outline-none dark:bg-slate-950 dark:text-slate-100"
            id="html-input"
            name="htmlInput"
            onChange={handleHtmlInputChange}
            value={sourceHtmlDocument.rawHtml}
          />
        </label>

        <label
          className={`${mobilePane === 'markdown' ? 'flex' : 'hidden'} min-h-0 flex-col md:flex`}
          htmlFor="markdown-output"
        >
          <span className="block border-b border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 dark:border-slate-800 dark:text-slate-300">
            Markdown output
          </span>
          <textarea
            className="min-h-0 w-full flex-1 resize-none border-0 bg-white p-3 font-mono text-sm leading-7 text-slate-900 outline-none dark:bg-slate-900 dark:text-slate-100"
            id="markdown-output"
            name="markdownOutput"
            readOnly
            value={markdownResult.markdown}
          />
        </label>
      </div>
    </section>
  );
}
