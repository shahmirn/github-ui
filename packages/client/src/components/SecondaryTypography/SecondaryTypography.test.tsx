import { render, screen } from '@testing-library/react';
import { SecondaryTypography } from './SecondaryTypography';

describe('SecondaryTypography', () => {
  it('renders the children', () => {
    render(<SecondaryTypography>Some Child Content</SecondaryTypography>);
    expect(screen.getByText('Some Child Content')).toBeInTheDocument();
  });
});
