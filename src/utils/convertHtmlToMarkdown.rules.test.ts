interface MockRule {
  filter: (node: Node) => boolean;
}

let capturedRule: MockRule | null = null;

vi.mock('turndown-plugin-gfm', () => ({
  gfm: vi.fn(),
}));

vi.mock('turndown', () => {
  class MockTurndownService {
    public use = vi.fn();

    public addRule = vi.fn((_key: string, rule: MockRule) => {
      capturedRule = rule;
    });

    public turndown = vi.fn((html: string) => html);
  }

  return {
    default: MockTurndownService,
  };
});

describe('convertHtmlToMarkdown internal rules', () => {
  it('returns false for non-element nodes in unsupported-tag filter', async () => {
    const module = await import('./convertHtmlToMarkdown');

    module.convertHtmlToMarkdown('<p>Text</p>');

    expect(capturedRule).not.toBeNull();
    expect(capturedRule?.filter(document.createTextNode('text'))).toBe(false);
  });
});
