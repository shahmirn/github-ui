import { renderHook } from '@testing-library/react';
import { useGetUsersQuery } from './getUsersEndpoint';
import { wrapper } from '../../../testHelpers';
import { Octokit } from '@octokit/rest';

vi.mock('@octokit/rest', () => {
  const Octokit = vi.fn();
  Octokit.prototype.rest = {
    users: {
      list: vi.fn(),
    },
  };
  return { Octokit };
});

describe('getUsersEndpoint', () => {
  let octokit = new Octokit();

  it('Gets the users', () => {
    renderHook(() => useGetUsersQuery(), { wrapper });

    expect(octokit.rest.users.list).toHaveBeenCalled();
  });
});
