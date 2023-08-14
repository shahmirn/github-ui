import { render, screen } from '@testing-library/react';
import { PaperWithTitle } from './PaperWithTItle';

describe('PaperWithTitle', () => {
  it('renders the children', () => {
    const title = 'Test title';
    const children = 'Test children';

    render(<PaperWithTitle title={title}>{children}</PaperWithTitle>);

    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(children)).toBeInTheDocument();
  });
});
