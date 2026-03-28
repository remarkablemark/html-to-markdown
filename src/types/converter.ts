export interface SourceHtmlDocument {
  rawHtml: string;
  origin: 'sample' | 'user';
  updatedAtMs: number;
}

export interface SanitizedHtmlDocument {
  sanitizedHtml: string;
  removedScriptStyle: boolean;
  removedUnsafeAttrs: boolean;
}

export interface MarkdownResult {
  markdown: string;
  isEmpty: boolean;
  convertedAtMs: number;
}

export interface ConversionRuleSet {
  targetFlavor: 'gfm';
  supportedElements: string[];
  fallbackMode: 'drop-tag-keep-content';
}
