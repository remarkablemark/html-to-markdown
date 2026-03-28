vi.mock('dompurify', () => ({
  default: {
    sanitize: vi.fn((input: string) => input),
  },
}));

describe('sanitizeHtml event-attribute cleanup', () => {
  it('removes inline event attributes when sanitizer output still contains them', async () => {
    const { sanitizeHtml } = await import('./sanitizeHtml');

    const result = sanitizeHtml(
      '<button onclick="alert(1)">Click me</button><img onerror="alert(2)" src="https://example.com/image.png" alt="Safe image" />',
    );

    expect(result.sanitizedHtml).toContain('Click me');
    expect(result.sanitizedHtml).toContain('Safe image');
    expect(result.sanitizedHtml).not.toContain('onclick');
    expect(result.sanitizedHtml).not.toContain('onerror');
    expect(result.removedUnsafeAttrs).toBe(true);
  });
});
