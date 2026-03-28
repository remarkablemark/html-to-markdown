import TurndownService from 'turndown';
import { gfm } from 'turndown-plugin-gfm';

import type { MarkdownResult } from '../types/converter';

const SUPPORTED_ELEMENT_NAMES = new Set([
  'a',
  'blockquote',
  'br',
  'code',
  'del',
  'em',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'hr',
  'img',
  'input',
  'li',
  'ol',
  'p',
  'pre',
  's',
  'strong',
  'table',
  'tbody',
  'td',
  'th',
  'thead',
  'tr',
  'ul',
]);

const turndownService = new TurndownService({
  bulletListMarker: '-',
  codeBlockStyle: 'fenced',
  emDelimiter: '_',
  headingStyle: 'atx',
  strongDelimiter: '**',
});

turndownService.use(gfm);

turndownService.addRule('dropUnsupportedTagsKeepContent', {
  filter: (node): boolean => {
    if (node.nodeType !== Node.ELEMENT_NODE) {
      return false;
    }

    const nodeName = node.nodeName.toLowerCase();
    return !SUPPORTED_ELEMENT_NAMES.has(nodeName);
  },
  replacement: (content): string => content,
});

export function convertHtmlToMarkdown(html: string): MarkdownResult {
  const convertedAtMs = Date.now();

  if (html.trim().length === 0) {
    return {
      markdown: '',
      isEmpty: true,
      convertedAtMs,
    };
  }

  const markdown = turndownService
    .turndown(html)
    .replace(/\n{3,}/gu, '\n\n')
    .trim();

  return {
    markdown,
    isEmpty: markdown.length === 0,
    convertedAtMs,
  };
}
