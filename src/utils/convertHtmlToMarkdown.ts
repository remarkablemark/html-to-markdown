import TurndownService from 'turndown';
import { gfm } from 'turndown-plugin-gfm';

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

function normalizeHtmlForConversion(html: string): string {
  const parsedDocument = new DOMParser().parseFromString(html, 'text/html');
  return parsedDocument.body.innerHTML;
}

export function convertHtmlToMarkdown(html: string): string {
  const trimmedHtml = html.trim();

  if (!trimmedHtml.length) {
    return '';
  }

  try {
    const normalizedHtml = normalizeHtmlForConversion(trimmedHtml);
    const markdown = turndownService
      .turndown(normalizedHtml)
      .replace(/\n{3,}/gu, '\n\n')
      .trim();

    return markdown;
  } catch {
    /* v8 ignore next */
    return '';
  }
}
