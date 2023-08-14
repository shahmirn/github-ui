import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ErrorPaper } from './ErrorPaper';

describe('ErrorPaper', () => {
  it('renders the default error title, message, and go home button', () => {
    render(<ErrorPaper />, { wrapper: BrowserRouter });

    expect(screen.getByText('Whoops')).toBeInTheDocument();
    expect(
      screen.getByText('We ran into an unexpected error'),
    ).toBeInTheDocument();

    expect(screen.getByText('Go Home')).toBeInTheDocument();
  });

  it('renders the provided error title and message', () => {
    render(
      <ErrorPaper
        title="Custom Error Title"
        errorMessage="Custom Error Message"
        showHomeButton={false}
      />,
      { wrapper: BrowserRouter },
    );

    expect(screen.getByText('Custom Error Title')).toBeInTheDocument();
    expect(screen.getByText('Custom Error Message')).toBeInTheDocument();
  });

  it('does not render the go home button when showHomeButton is false', () => {
    render(<ErrorPaper showHomeButton={false} />, { wrapper: BrowserRouter });

    expect(screen.queryByText('Go Home')).not.toBeInTheDocument();
  });
});
