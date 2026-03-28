import { SAMPLE_HTML } from '../constants/sampleHtml';
import { convertHtmlToMarkdown } from './convertHtmlToMarkdown';

describe('convertHtmlToMarkdown', () => {
  it('returns empty markdown for empty and whitespace-only input', () => {
    const emptyResult = convertHtmlToMarkdown('');
    const whitespaceResult = convertHtmlToMarkdown('   \n\t   ');

    expect(emptyResult.markdown).toBe('');
    expect(emptyResult.isEmpty).toBe(true);
    expect(whitespaceResult.markdown).toBe('');
    expect(whitespaceResult.isEmpty).toBe(true);
  });

  it('returns deterministic output for equivalent input', () => {
    const first = convertHtmlToMarkdown(SAMPLE_HTML);
    const second = convertHtmlToMarkdown(SAMPLE_HTML);

    expect(first.markdown).toBe(second.markdown);
    expect(first.isEmpty).toBe(false);
    expect(second.isEmpty).toBe(false);
  });

  it('maps required supported HTML elements to Markdown', () => {
    const result = convertHtmlToMarkdown(SAMPLE_HTML);

    expect(result.markdown).toContain('# Heading');
    expect(result.markdown).toContain('**bold**');
    expect(result.markdown).toContain('_italic_');
    expect(result.markdown).toContain('`inline code`');
    expect(result.markdown).toMatch(/-\s+Unordered item one/u);
    expect(result.markdown).toContain('1.  Ordered item one');
    expect(result.markdown).toContain('[Example](https://example.com)');
    expect(result.markdown).toContain(
      '![Sample image](https://picsum.photos/100)',
    );
    expect(result.markdown).toContain(
      '> Conversion should preserve semantic meaning.',
    );
    expect(result.markdown).toContain('```ts');
    expect(result.markdown).toContain('| Feature | Status |');
    expect(result.markdown).toContain('---');
    expect(result.markdown).toMatch(/-\s+\[x\]\s+Completed checklist item/u);
    expect(result.markdown).toMatch(/-\s+\[\s\]\s+Pending checklist item/u);
  });

  it('drops unsupported wrappers while preserving inner content', () => {
    const result = convertHtmlToMarkdown(
      '<custom-widget>Keep this text</custom-widget>',
    );

    expect(result.markdown).toContain('Keep this text');
    expect(result.markdown).not.toContain('custom-widget');
  });

  it('handles non-element nodes without throwing', () => {
    const result = convertHtmlToMarkdown('<!-- comment --><p>Content</p>');

    expect(result.markdown).toContain('Content');
  });
});
