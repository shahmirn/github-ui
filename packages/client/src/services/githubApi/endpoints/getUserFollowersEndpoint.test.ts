import { renderHook } from '@testing-library/react';
import { useGetUserFollowersQuery } from './getUserFollowersEndpoint';
import { wrapper } from '../../../testHelpers';
import { Octokit } from '@octokit/rest';

vi.mock('@octokit/rest', () => {
  const Octokit = vi.fn();
  Octokit.prototype.rest = {
    users: {
      listFollowersForUser: vi.fn(),
    },
  };
  return { Octokit };
});

describe('getUserFollowersEndpoint', () => {
  let octokit = new Octokit();

  it('Gets the followers for a user', () => {
    const username = 'some-user';

    renderHook(() => useGetUserFollowersQuery({ username }), { wrapper });

    expect(octokit.rest.users.listFollowersForUser).toHaveBeenCalledWith({
      username,
    });
  });
});
