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

const DESKTOP_MEDIA_QUERY = '(min-width: 768px)';

function isMobileLayout() {
  if (
    typeof window === 'undefined' ||
    typeof window.matchMedia !== 'function'
  ) {
    return false;
  }

  return !window.matchMedia(DESKTOP_MEDIA_QUERY).matches;
}

export function Converter() {
  const [sourceHtmlDocument, setSourceHtmlDocument] = useState(
    INITIAL_SOURCE_HTML_DOCUMENT,
  );
  const [markdownResult, setMarkdownResult] = useState<MarkdownResult>(() =>
    buildMarkdownResult(INITIAL_SOURCE_HTML_DOCUMENT.rawHtml),
  );
  const [isMobile, setIsMobile] = useState(isMobileLayout);
  const [mobilePane, setMobilePane] = useState<'html' | 'markdown'>('html');
  const debouncedConvertRef = useRef<DebouncedFunction<[string]> | null>(null);

  debouncedConvertRef.current ??= debounce((rawHtml: string) => {
    setMarkdownResult(buildMarkdownResult(rawHtml));
  }, CONVERSION_DEBOUNCE_DELAY_MS);

  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      typeof window.matchMedia !== 'function'
    ) {
      return;
    }

    const mediaQueryList = window.matchMedia(DESKTOP_MEDIA_QUERY);

    /* v8 ignore start */
    function handleMediaQueryChange(event: MediaQueryListEvent) {
      setIsMobile(!event.matches);
    }
    /* v8 ignore stop */

    setIsMobile(!mediaQueryList.matches);
    mediaQueryList.addEventListener('change', handleMediaQueryChange);

    return () => {
      mediaQueryList.removeEventListener('change', handleMediaQueryChange);
    };
  }, []);

  useEffect(() => {
    if (!isMobile) {
      setMobilePane('html');
    }
  }, [isMobile]);

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
    <section className="w-full">
      <ConverterHeader
        isMobile={isMobile}
        markdown={markdownResult.markdown}
        mobilePane={mobilePane}
        onTogglePane={handleMobilePaneToggle}
      />
      <div className="grid gap-4 md:grid-cols-2">
        {!isMobile || mobilePane === 'html' ? (
          <label className="space-y-2" htmlFor="html-input">
            <span className="block text-sm font-medium">HTML input</span>
            <textarea
              className="min-h-72 w-full rounded-md border border-slate-300 p-3 font-mono text-sm dark:border-slate-700"
              id="html-input"
              name="htmlInput"
              onChange={handleHtmlInputChange}
              value={sourceHtmlDocument.rawHtml}
            />
          </label>
        ) : null}

        {!isMobile || mobilePane === 'markdown' ? (
          <label className="space-y-2" htmlFor="markdown-output">
            <span className="block text-sm font-medium">Markdown output</span>
            <textarea
              className="min-h-72 w-full rounded-md border border-slate-300 bg-slate-50 p-3 font-mono text-sm dark:border-slate-700 dark:bg-slate-900"
              id="markdown-output"
              name="markdownOutput"
              readOnly
              value={markdownResult.markdown}
            />
          </label>
        ) : null}
      </div>
    </section>
  );
}
