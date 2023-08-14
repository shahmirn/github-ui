import { render } from '@testing-library/react';
import { LoadingIndicator } from './LoadingIndicator';

describe('LoadingIndicator', () => {
  it('renders the loading indicator', () => {
    const { container } = render(<LoadingIndicator />);
    expect(container).toMatchSnapshot();
  });
});
