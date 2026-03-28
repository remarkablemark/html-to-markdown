import { SAMPLE_HTML } from './sampleHtml';

describe('SAMPLE_HTML fixture', () => {
  it('covers all required HTML element categories for conversion checks', () => {
    expect(SAMPLE_HTML).toContain('<h1>');
    expect(SAMPLE_HTML).toContain('<strong>');
    expect(SAMPLE_HTML).toContain('<em>');
    expect(SAMPLE_HTML).toContain('<code>inline code</code>');
    expect(SAMPLE_HTML).toContain('<ul>');
    expect(SAMPLE_HTML).toContain('<ol>');
    expect(SAMPLE_HTML).toContain('<a href="https://example.com">');
    expect(SAMPLE_HTML).toContain('<img');
    expect(SAMPLE_HTML).toContain('<blockquote>');
    expect(SAMPLE_HTML).toContain('<pre><code');
    expect(SAMPLE_HTML).toContain('<table>');
    expect(SAMPLE_HTML).toContain('<hr');
    expect(SAMPLE_HTML).toContain('<input type="checkbox"');
  });
});
