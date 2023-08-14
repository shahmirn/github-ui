import { render, screen } from '@testing-library/react';
import { Home } from './Home';
import { useGetUsersQuery } from '../../services/githubApi/endpoints';

vi.mock('../../services/githubApi/endpoints', () => {
  const useGetUsersQuery = vi.fn();
  return { useGetUsersQuery };
});

vi.mock('../../components', () => ({
  UserCard: () => <div>UserCardComponent</div>,
  LoadingIndicator: () => <div>LoadingIndicatorComponent</div>,
  ErrorPaper: () => <div>ErrorPaperComponent</div>,
}));

const useGetUsersQueryMock = vi.mocked(useGetUsersQuery);

describe('Home', () => {
  beforeEach(() => {
    useGetUsersQueryMock.mockReturnValue({
      data: [{ login: 'user1' }, { login: 'user2' }],
    } as any);
  });

  it('renders the users', () => {
    render(<Home />);

    expect(screen.getAllByText('UserCardComponent').length).toEqual(2);
  });

  it('renders the loading indicator when loading', () => {
    useGetUsersQueryMock.mockReturnValue({ isLoading: true } as any);
    render(<Home />);

    expect(screen.getByText('LoadingIndicatorComponent')).toBeInTheDocument();
  });

  it('renders the error paper when there is an error', () => {
    useGetUsersQueryMock.mockReturnValue({ isError: true } as any);
    render(<Home />);

    expect(screen.getByText('ErrorPaperComponent')).toBeInTheDocument();
  });
});
