import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Layout } from './Layout';

test('renders the layout, with the title', () => {
  render(<Layout />, { wrapper: BrowserRouter });

  expect(screen.getByText(/Front End Interview Project/i)).toBeInTheDocument();
});
