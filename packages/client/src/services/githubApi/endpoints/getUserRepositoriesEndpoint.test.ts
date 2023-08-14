import { renderHook } from '@testing-library/react';
import { useGetUserRepositoriesQuery } from './getUserRepositoriesEndpoint';
import { wrapper } from '../../../testHelpers';
import { Octokit } from '@octokit/rest';

vi.mock('@octokit/rest', () => {
  const Octokit = vi.fn();
  Octokit.prototype.rest = {
    repos: {
      listForUser: vi.fn(),
    },
  };
  return { Octokit };
});

describe('getUserRepositoriesEndpoint', () => {
  let octokit = new Octokit();

  it('Gets the repositories for a user', () => {
    const username = 'some-user';

    renderHook(() => useGetUserRepositoriesQuery({ username }), { wrapper });

    expect(octokit.rest.repos.listForUser).toHaveBeenCalledWith({ username });
  });
});
