import { render, screen } from '@testing-library/react';

import { Converter } from '.';

describe('Converter component', () => {
  it('renders heading and container', () => {
    const { container } = render(<Converter />);

    const heading = screen.getByRole('heading', {
      level: 2,
      name: 'HTML to Markdown',
    });

    expect(heading).toBeInTheDocument();
    expect(container.querySelector('section')).toBeInTheDocument();
  });
});
