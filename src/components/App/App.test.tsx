import { render, screen } from '@testing-library/react';

import { App } from '.';

describe('App component', () => {
  it('renders with heading, HTML input, and read-only Markdown output', () => {
    render(<App />);

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'HTML to Markdown',
      }),
    ).toBeInTheDocument();

    const htmlInput = screen.getByRole('textbox', {
      name: 'HTML',
    });
    expect(htmlInput).toBeInTheDocument();

    const markdownOutput = screen.getByRole('textbox', {
      name: 'Markdown',
    });
    expect(markdownOutput).toBeInTheDocument();
    expect(markdownOutput).toHaveAttribute('readonly');
  });
});
