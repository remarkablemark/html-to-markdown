import { sanitizeHtml } from './sanitizeHtml';

describe('sanitizeHtml', () => {
  it('keeps safe markup unchanged and reports no removals', () => {
    const result = sanitizeHtml('<p>Safe content only</p>');

    expect(result.sanitizedHtml).toContain('<p>Safe content only</p>');
    expect(result.removedScriptStyle).toBe(false);
    expect(result.removedUnsafeAttrs).toBe(false);
  });

  it('removes script and style tags with their contents', () => {
    const result = sanitizeHtml(
      '<p>Safe</p><script>alert("xss")</script><style>body{display:none;}</style>',
    );

    expect(result.sanitizedHtml).toContain('<p>Safe</p>');
    expect(result.sanitizedHtml).not.toContain('script');
    expect(result.sanitizedHtml).not.toContain('style');
    expect(result.sanitizedHtml).not.toContain('alert("xss")');
    expect(result.removedScriptStyle).toBe(true);
  });

  it('strips disallowed URL schemes and keeps allowed schemes', () => {
    const result = sanitizeHtml(
      [
        '<a href="javascript:alert(1)">Bad link</a>',
        '<img src="data:image/png;base64,abc" alt="Bad image" />',
        '<a href="https://example.com">Good link</a>',
        '<a href="mailto:test@example.com">Good mailto</a>',
      ].join(''),
    );

    expect(result.sanitizedHtml).toContain('Bad link');
    expect(result.sanitizedHtml).toContain('Bad image');
    expect(result.sanitizedHtml).not.toContain('javascript:alert(1)');
    expect(result.sanitizedHtml).not.toContain('data:image/png;base64,abc');
    expect(result.sanitizedHtml).toContain('https://example.com');
    expect(result.sanitizedHtml).toContain('mailto:test@example.com');
    expect(result.removedUnsafeAttrs).toBe(true);
  });

  it('strips inline event handlers and URLs without allowed scheme', () => {
    const result = sanitizeHtml(
      [
        '<button onclick="alert(1)">Click me</button>',
        '<a href="/relative-path">Relative link</a>',
      ].join(''),
    );

    expect(result.sanitizedHtml).toContain('Click me');
    expect(result.sanitizedHtml).not.toContain('onclick');
    expect(result.sanitizedHtml).toContain('Relative link');
    expect(result.sanitizedHtml).not.toContain('/relative-path');
    expect(result.removedUnsafeAttrs).toBe(true);
  });

  it('removes unsafe payload content and keeps allowed URL schemes only', () => {
    const result = sanitizeHtml(
      [
        '<style>.hidden{display:none;}</style>',
        '<script>window.evil = true</script>',
        '<a href="http://example.com">Allowed http</a>',
        '<a href="https://example.com">Allowed https</a>',
        '<a href="mailto:test@example.com">Allowed mailto</a>',
        '<a href="javascript:alert(1)">Blocked js</a>',
      ].join(''),
    );

    expect(result.sanitizedHtml).not.toContain('.hidden{display:none;}');
    expect(result.sanitizedHtml).not.toContain('window.evil = true');
    expect(result.sanitizedHtml).toContain('http://example.com');
    expect(result.sanitizedHtml).toContain('https://example.com');
    expect(result.sanitizedHtml).toContain('mailto:test@example.com');
    expect(result.sanitizedHtml).not.toContain('javascript:alert(1)');
    expect(result.removedScriptStyle).toBe(true);
  });
});
