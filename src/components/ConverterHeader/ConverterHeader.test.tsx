import { act, fireEvent, render, screen } from '@testing-library/react';
import { COPY_LABEL_RESET_DELAY_MS } from 'src/constants/converter';

import { ConverterHeader } from '.';

describe('ConverterHeader component', () => {
  it('disables Copy button when markdown output is empty', () => {
    render(
      <ConverterHeader markdown="" mobilePane="html" onTogglePane={vi.fn()} />,
    );

    expect(
      screen.getByRole('button', {
        name: 'Copy',
      }),
    ).toBeDisabled();
  });

  it('transitions Copy label to Copied and then resets to Copy on success', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);

    Object.defineProperty(window.navigator, 'clipboard', {
      configurable: true,
      value: {
        writeText,
      },
    });

    vi.useFakeTimers();

    try {
      render(
        <ConverterHeader
          markdown="# converted"
          mobilePane="html"
          onTogglePane={vi.fn()}
        />,
      );

      const copyButton = screen.getByRole('button', {
        name: 'Copy',
      });
      expect(copyButton).toBeEnabled();

      fireEvent.click(copyButton);

      await act(async () => {
        await Promise.resolve();
      });

      expect(writeText).toHaveBeenCalledWith('# converted');
      expect(
        screen.getByRole('button', {
          name: 'Copied',
        }),
      ).toBeEnabled();

      act(() => {
        vi.advanceTimersByTime(COPY_LABEL_RESET_DELAY_MS);
      });

      expect(
        screen.getByRole('button', {
          name: 'Copy',
        }),
      ).toBeEnabled();
    } finally {
      vi.useRealTimers();
    }
  });

  it('keeps Copy button state unchanged when clipboard write fails', async () => {
    const writeText = vi
      .fn()
      .mockRejectedValue(new Error('Clipboard unavailable'));

    Object.defineProperty(window.navigator, 'clipboard', {
      configurable: true,
      value: {
        writeText,
      },
    });

    render(
      <ConverterHeader
        markdown="## ready"
        mobilePane="html"
        onTogglePane={vi.fn()}
      />,
    );

    const copyButton = screen.getByRole('button', {
      name: 'Copy',
    });
    expect(copyButton).toBeEnabled();

    fireEvent.click(copyButton);

    await act(async () => {
      await Promise.resolve();
    });

    expect(writeText).toHaveBeenCalledWith('## ready');
    expect(
      screen.getByRole('button', {
        name: 'Copy',
      }),
    ).toBeEnabled();
    expect(
      screen.queryByRole('button', {
        name: 'Copied',
      }),
    ).not.toBeInTheDocument();
  });
});
