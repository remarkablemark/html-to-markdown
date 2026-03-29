import { render, screen } from '@testing-library/react';

import { App } from '.';

describe('App component', () => {
  it('renders app heading and converter section', () => {
    render(<App />);

    const heading = screen.getByRole('heading', {
      level: 1,
      name: 'HTML to Markdown',
    });
    expect(heading).toBeInTheDocument();

    const converterRegion = screen.getByRole('textbox', {
      name: 'HTML',
    });
    expect(converterRegion).toBeInTheDocument();
  });

  it('renders HTML input and read-only Markdown output', () => {
    render(<App />);

    const htmlInput = screen.getByRole('textbox', {
      name: 'HTML',
    });
    expect(htmlInput).toBeInTheDocument();

    const markdownOutput = screen.getByRole('textbox', {
      name: 'Markdown',
    });
    expect(markdownOutput).toHaveAttribute('readonly');
  });
});
