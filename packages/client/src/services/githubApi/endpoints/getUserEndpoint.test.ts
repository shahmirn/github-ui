import { renderHook } from '@testing-library/react';
import { useGetUserQuery } from './getUserEndpoint';
import { wrapper } from '../../../testHelpers';
import { Octokit } from '@octokit/rest';

vi.mock('@octokit/rest', () => {
  const Octokit = vi.fn();
  Octokit.prototype.rest = {
    users: {
      getByUsername: vi.fn(),
    },
  };
  return { Octokit };
});

describe('getUserEndpoint', () => {
  let octokit = new Octokit();

  it('Gets the user details', () => {
    const username = 'some-user';

    renderHook(() => useGetUserQuery({ username }), { wrapper });

    expect(octokit.rest.users.getByUsername).toHaveBeenCalledWith({ username });
  });
});
