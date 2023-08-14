import { render, screen } from '@testing-library/react';
import { UserCard, UserCardProps } from './UserCard';
import { BrowserRouter } from 'react-router-dom';

describe('UserCard', () => {
  let user: UserCardProps['user'];
  beforeEach(() => {
    user = {
      login: 'testuser',
      avatar_url: 'https://example.com/avatar.png',
    };
  });

  it("renders the user's login, avatar, and link to details page", () => {
    render(<UserCard user={user} linkToDetails />, { wrapper: BrowserRouter });

    expect(screen.getByText(user.login)).toBeInTheDocument();

    const avatar = screen.getByAltText(`Avatar for ${user.login}`);
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('src', user.avatar_url);

    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', `/users/${user.login}`);
  });

  it("renders the user's name if provided", () => {
    user.name = 'Test User';
    render(<UserCard user={user} />);

    expect(screen.getByText(user.name)).toBeInTheDocument();
  });

  it("renders the user's bio if provided", () => {
    user.bio = 'Test bio';
    render(<UserCard user={user} />);

    expect(screen.getByText(user.bio)).toBeInTheDocument();
  });

  it("renders the user's follower count if provided", () => {
    user.followers = 123;
    render(<UserCard user={user} />);

    expect(screen.getByText(`${user.followers} followers`)).toBeInTheDocument();
  });

  it("renders the user's company if provided", () => {
    user.company = 'Test company';
    render(<UserCard user={user} />);

    expect(screen.getByText(user.company)).toBeInTheDocument();
  });

  it("renders the user's location if provided", () => {
    user.location = 'Test location';
    render(<UserCard user={user} />);

    expect(screen.getByText(user.location)).toBeInTheDocument();
  });
});
