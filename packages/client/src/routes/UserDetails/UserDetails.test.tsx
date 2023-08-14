import { render, screen } from '@testing-library/react';
import { useParams } from 'react-router-dom';
import {
  useGetUserFollowersQuery,
  useGetUserOrganizationsQuery,
  useGetUserQuery,
  useGetUserRepositoriesQuery,
} from '../../services/githubApi/endpoints';
import { UserDetails } from './UserDetails';
import { PropsWithChildren } from 'react';

vi.mock('react-router-dom');

vi.mock('../../services/githubApi/endpoints', () => {
  const useGetUserQuery = vi.fn();
  const useGetUserRepositoriesQuery = vi.fn();
  const useGetUserOrganizationsQuery = vi.fn();
  const useGetUserFollowersQuery = vi.fn();

  return {
    useGetUserQuery,
    useGetUserRepositoriesQuery,
    useGetUserOrganizationsQuery,
    useGetUserFollowersQuery,
  };
});

vi.mock('../../components', () => ({
  PaperWithTitle: ({
    title,
    children,
  }: PropsWithChildren<{ title: string }>) => (
    <div>
      <div>{title}</div>
      <div>PaperWithTitleComponent</div>
      {children}
    </div>
  ),
  OrganizationCard: () => <div>OrganizationCardComponent</div>,
  RepositoryCard: () => <div>RepositoryCardComponent</div>,
  UserCard: ({ ...props }) => (
    <div data-testid={props['data-testid']}>UserCardComponent</div>
  ),
  LoadingIndicator: () => <div>LoadingIndicatorComponent</div>,
  ErrorPaper: () => <div>ErrorPaperComponent</div>,
}));

const useParamsMock = vi.mocked(useParams);
const useGetUserQueryMock = vi.mocked(useGetUserQuery);
const useGetUserRepositoriesQueryMock = vi.mocked(useGetUserRepositoriesQuery);
const useGetUserOrganizationsQueryMock = vi.mocked(
  useGetUserOrganizationsQuery,
);
const useGetUserFollowersQueryMock = vi.mocked(useGetUserFollowersQuery);

describe('UserDetails', () => {
  beforeEach(() => {
    useParamsMock.mockReturnValue({ username: 'user1' });

    useGetUserQueryMock.mockReturnValue({
      data: { login: 'user1' },
    } as any);

    useGetUserRepositoriesQueryMock.mockReturnValue({
      data: [{ name: 'repo1' }, { name: 'repo2' }, { name: 'repo3' }],
    } as any);

    useGetUserOrganizationsQueryMock.mockReturnValue({
      data: [
        { id: 1, login: 'org1' },
        { id: 2, login: 'org2' },
        { id: 3, login: 'org3' },
        { id: 4, login: 'org4' },
      ],
    } as any);

    useGetUserFollowersQueryMock.mockReturnValue({
      data: [{ login: 'follower1' }, { login: 'follower2' }],
    } as any);
  });

  it("renders the user's details", () => {
    render(<UserDetails />);

    expect(screen.getByTestId('userDetailsCard')).toBeInTheDocument();
    expect(screen.getAllByText('RepositoryCardComponent').length).toEqual(3);
    expect(screen.getAllByText('OrganizationCardComponent').length).toEqual(4);
    expect(screen.getAllByTestId('followerCard').length).toEqual(2);
  });

  it('renders no repositories when there are no repositories', () => {
    useGetUserRepositoriesQueryMock.mockReturnValue({
      data: [],
    } as any);
    render(<UserDetails />);

    expect(screen.getByText('No Repositories')).toBeInTheDocument();
  });

  it('renders no organizations when there are no organizations', () => {
    useGetUserOrganizationsQueryMock.mockReturnValue({
      data: [],
    } as any);
    render(<UserDetails />);

    expect(screen.getByText('No Organizations')).toBeInTheDocument();
  });

  it('renders no followers when there are no followers', () => {
    useGetUserFollowersQueryMock.mockReturnValue({
      data: [],
    } as any);
    render(<UserDetails />);

    expect(screen.getByText('No Followers')).toBeInTheDocument();
  });

  it('renders the loading indicator when loading', () => {
    useGetUserQueryMock.mockReturnValue({ isLoading: true } as any);
    render(<UserDetails />);

    expect(screen.getByText('LoadingIndicatorComponent')).toBeInTheDocument();
  });

  it('renders the error paper when there is an error', () => {
    useGetUserQueryMock.mockReturnValue({ isError: true } as any);
    render(<UserDetails />);

    expect(screen.getByText('ErrorPaperComponent')).toBeInTheDocument();
  });
});
