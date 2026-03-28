import { act, fireEvent, render, screen } from '@testing-library/react';
import { SAMPLE_HTML } from 'src/constants/sampleHtml';
import { convertHtmlToMarkdown } from 'src/utils/convertHtmlToMarkdown';
import { sanitizeHtml } from 'src/utils/sanitizeHtml';

import { Converter } from '.';

function getExpectedMarkdown(rawHtml: string): string {
  return convertHtmlToMarkdown(sanitizeHtml(rawHtml).sanitizedHtml);
}

describe('Converter component', () => {
  it('prefills sample HTML and immediately renders converted Markdown', () => {
    render(<Converter />);

    const htmlInput = screen.getByRole('textbox', {
      name: 'HTML input',
    });
    const markdownOutput = screen.getByRole('textbox', {
      name: 'Markdown output',
    });

    expect(htmlInput).toHaveValue(SAMPLE_HTML);
    expect(markdownOutput).toHaveValue(getExpectedMarkdown(SAMPLE_HTML));
    expect(markdownOutput).toHaveAttribute('readonly');
  });

  it('updates Markdown output after 300ms debounce when HTML input changes', () => {
    vi.useFakeTimers();

    try {
      render(<Converter />);

      const htmlInput = screen.getByRole('textbox', {
        name: 'HTML input',
      });
      const markdownOutput = screen.getByRole('textbox', {
        name: 'Markdown output',
      });
      const initialMarkdown = getExpectedMarkdown(SAMPLE_HTML);
      const updatedHtml = '<h2>Updated Heading</h2><p>Updated paragraph</p>';

      fireEvent.change(htmlInput, {
        target: {
          value: updatedHtml,
        },
      });

      expect(markdownOutput).toHaveValue(initialMarkdown);

      act(() => {
        vi.advanceTimersByTime(299);
      });
      expect(markdownOutput).toHaveValue(initialMarkdown);

      act(() => {
        vi.advanceTimersByTime(1);
      });
      expect(markdownOutput).toHaveValue(getExpectedMarkdown(updatedHtml));
    } finally {
      vi.useRealTimers();
    }
  });

  it('clears Markdown output when input is empty or whitespace only', () => {
    vi.useFakeTimers();

    try {
      render(<Converter />);

      const htmlInput = screen.getByRole('textbox', {
        name: 'HTML input',
      });
      const markdownOutput = screen.getByRole('textbox', {
        name: 'Markdown output',
      });

      fireEvent.change(htmlInput, {
        target: {
          value: '   ',
        },
      });

      act(() => {
        vi.advanceTimersByTime(300);
      });
      expect(markdownOutput).toHaveValue('');
    } finally {
      vi.useRealTimers();
    }
  });

  it('renders resilient output for malformed HTML input without crashing', () => {
    vi.useFakeTimers();

    try {
      render(<Converter />);

      const htmlInput = screen.getByRole('textbox', {
        name: 'HTML input',
      });
      const markdownOutput = screen.getByRole('textbox', {
        name: 'Markdown output',
      });
      const malformedHtml =
        '<article><h3>Broken <em>heading<p>Body <strong>text<div>Tail';

      fireEvent.change(htmlInput, {
        target: {
          value: malformedHtml,
        },
      });

      act(() => {
        vi.advanceTimersByTime(300);
      });

      expect(markdownOutput).toHaveValue(getExpectedMarkdown(malformedHtml));
      const markdownValue = (markdownOutput as HTMLTextAreaElement).value;
      expect(markdownValue).toContain('Broken');
      expect(markdownValue).toContain('Body');
      expect(markdownValue).toContain('Tail');
    } finally {
      vi.useRealTimers();
    }
  });
});
