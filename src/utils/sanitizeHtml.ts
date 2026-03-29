import DOMPurify from 'dompurify';

import { ALLOWED_URL_SCHEMES } from '../constants/converter';
import type { SanitizedHtmlDocument } from '../types/converter';

const ALLOWED_SCHEME_SET = new Set<string>(ALLOWED_URL_SCHEMES);

function hasDisallowedScheme(url: string): boolean {
  const trimmedValue = url.trim();
  const schemeExpression = /^([a-zA-Z][a-zA-Z\d+.-]*):/u;
  const schemeMatch = schemeExpression.exec(trimmedValue);

  if (!schemeMatch) {
    return true;
  }

  const scheme = schemeMatch[1].toLowerCase();
  return !ALLOWED_SCHEME_SET.has(scheme);
}

function stripUnsafeUrlAttributes(
  sanitizedHtml: string,
): SanitizedHtmlDocument {
  const parsedDocument = new DOMParser().parseFromString(
    sanitizedHtml,
    'text/html',
  );

  let removedUnsafeAttrs = false;

  parsedDocument
    .querySelectorAll<HTMLElement>(
      '[href], [src], [onabort], [onerror], [onload], [onclick]',
    )
    .forEach((element) => {
      Array.from(element.attributes).forEach((attribute) => {
        const attributeName = attribute.name.toLowerCase();

        /* v8 ignore start */
        if (attributeName.startsWith('on')) {
          element.removeAttribute(attribute.name);
          removedUnsafeAttrs = true;
          return;
        }
        /* v8 ignore stop */

        if (
          (attributeName === 'href' || attributeName === 'src') &&
          hasDisallowedScheme(attribute.value)
        ) {
          element.removeAttribute(attribute.name);
          removedUnsafeAttrs = true;
        }
      });
    });

  return {
    sanitizedHtml: parsedDocument.body.innerHTML,
    removedScriptStyle: false,
    removedUnsafeAttrs,
  };
}

export function sanitizeHtml(rawHtml: string): SanitizedHtmlDocument {
  const parsedInput = new DOMParser().parseFromString(rawHtml, 'text/html');
  const removedScriptStyle =
    parsedInput.querySelector('script, style') !== null;

  const sanitizedHtml: string = DOMPurify.sanitize(rawHtml, {
    FORBID_TAGS: ['script', 'style'],
  });

  const { removedUnsafeAttrs, sanitizedHtml: safeHtml } =
    stripUnsafeUrlAttributes(sanitizedHtml);

  return {
    sanitizedHtml: safeHtml,
    removedScriptStyle,
    removedUnsafeAttrs,
  };
}
