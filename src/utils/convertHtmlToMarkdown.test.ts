import { SAMPLE_HTML } from '../constants/sampleHtml';
import { convertHtmlToMarkdown } from './convertHtmlToMarkdown';

describe('convertHtmlToMarkdown', () => {
  it('returns empty markdown for empty and whitespace-only input', () => {
    const emptyResult = convertHtmlToMarkdown('');
    const whitespaceResult = convertHtmlToMarkdown('   \n\t   ');

    expect(emptyResult).toBe('');
    expect(whitespaceResult).toBe('');
  });

  it('returns deterministic output for equivalent input', () => {
    const first = convertHtmlToMarkdown(SAMPLE_HTML);
    const second = convertHtmlToMarkdown(SAMPLE_HTML);

    expect(first).toBe(second);
    expect(first.length).toBeGreaterThan(0);
    expect(second.length).toBeGreaterThan(0);
  });

  it('maps required supported HTML elements to Markdown', () => {
    const result = convertHtmlToMarkdown(SAMPLE_HTML);

    expect(result).toContain('# Heading');
    expect(result).toContain('**bold**');
    expect(result).toContain('_italic_');
    expect(result).toContain('`inline code`');
    expect(result).toMatch(/-\s+Unordered item one/u);
    expect(result).toContain('1. Ordered item one');
    expect(result).toContain('[Example](https://example.com)');
    expect(result).toContain('![Sample image](https://picsum.photos/100)');
    expect(result).toContain('> Blockquote');
    expect(result).toContain('```javascript');
    expect(result).toContain('| Feature | Status |');
    expect(result).toContain('---');
    expect(result).toMatch(/-\s+\[x\]\s+Completed checklist item/u);
    expect(result).toMatch(/-\s+\[\s\]\s+Pending checklist item/u);
  });

  it('drops unsupported wrappers while preserving inner content', () => {
    const result = convertHtmlToMarkdown(
      '<custom-widget>Keep this text</custom-widget>',
    );

    expect(result).toContain('Keep this text');
    expect(result).not.toContain('custom-widget');
  });

  it('converts malformed HTML with best-effort output without throwing', () => {
    const malformedHtml =
      '<section><h2>Broken <em>Heading<p>Paragraph <strong>one<div>Line two';

    expect(() => convertHtmlToMarkdown(malformedHtml)).not.toThrow();

    const result = convertHtmlToMarkdown(malformedHtml);
    expect(result.length).toBeGreaterThan(0);
    expect(result).toContain('Broken');
    expect(result).toContain('Paragraph');
    expect(result).toContain('Line two');
  });

  it('drops unsupported custom tags while preserving ordered inner content', () => {
    const result = convertHtmlToMarkdown(
      [
        '<custom-shell><p>First block</p></custom-shell>',
        '<x-article>Second <strong>value</strong></x-article>',
      ].join(''),
    );

    expect(result).toContain('First block');
    expect(result).toContain('Second **value**');
    expect(result).not.toContain('custom-shell');
    expect(result).not.toContain('x-article');
    expect(result.indexOf('First block')).toBeLessThan(
      result.indexOf('Second **value**'),
    );
  });

  it('handles non-element nodes without throwing', () => {
    const result = convertHtmlToMarkdown('<!-- comment --><p>Content</p>');

    expect(result).toContain('Content');
  });

  it('uses single space after list markers', () => {
    const html = `
      <ul>
        <li>Unordered item one</li>
        <li>Unordered item two</li>
      </ul>
      <ol>
        <li>Ordered item one</li>
        <li>Ordered item two</li>
      </ol>
    `;
    const result = convertHtmlToMarkdown(html);

    expect(result).toContain('- Unordered item one');
    expect(result).toContain('- Unordered item two');
    expect(result).toContain('1. Ordered item one');
    expect(result).toContain('2. Ordered item two');
  });

  it('converts nested lists with proper indentation', () => {
    const html = `
      <ul>
        <li>Parent item
          <ul>
            <li>Nested unordered</li>
          </ul>
        </li>
      </ul>
      <ol>
        <li>Parent ordered
          <ol>
            <li>Nested ordered</li>
          </ol>
        </li>
      </ol>
    `;
    const result = convertHtmlToMarkdown(html);

    expect(result).toContain('- Parent item');
    expect(result).toContain('  - Nested unordered');
    expect(result).toContain('1. Parent ordered');
    expect(result).toContain('   1. Nested ordered');
  });
});
