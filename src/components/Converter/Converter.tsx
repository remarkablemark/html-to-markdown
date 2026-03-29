import { type ChangeEvent, useEffect, useRef, useState } from 'react';
import { CONVERSION_DEBOUNCE_DELAY_MS } from 'src/constants/converter';
import { SAMPLE_HTML } from 'src/constants/sampleHtml';
import type { MarkdownResult, SourceHtmlDocument } from 'src/types/converter';
import { convertHtmlToMarkdown } from 'src/utils/convertHtmlToMarkdown';
import { debounce, type DebouncedFunction } from 'src/utils/debounce';
import { sanitizeHtml } from 'src/utils/sanitizeHtml';

import { ConverterHeader } from '../ConverterHeader';
import { ConverterPane } from '../ConverterPane';

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
        <ConverterPane
          headerLabel="HTML"
          id="html-input"
          name="htmlInput"
          onChange={handleHtmlInputChange}
          className={mobilePane === 'html' ? 'flex' : 'hidden'}
          value={sourceHtmlDocument.rawHtml}
        />

        <ConverterPane
          headerLabel="Markdown"
          id="markdown-output"
          name="markdownOutput"
          className={mobilePane === 'markdown' ? 'flex' : 'hidden'}
          readOnly
          value={markdownResult.markdown}
        />
      </div>
    </section>
  );
}
