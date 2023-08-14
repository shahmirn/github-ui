import { renderHook } from '@testing-library/react';
import { useGetUserOrganizationsQuery } from './getUserOrganizationsEndpoint';
import { wrapper } from '../../../testHelpers';
import { Octokit } from '@octokit/rest';

vi.mock('@octokit/rest', () => {
  const Octokit = vi.fn();
  Octokit.prototype.rest = {
    orgs: {
      listForUser: vi.fn(),
    },
  };
  return { Octokit };
});

describe('getUserOrganizationsEndpoint', () => {
  let octokit = new Octokit();

  it('Gets the organizations for a user', () => {
    const username = 'some-user';

    renderHook(() => useGetUserOrganizationsQuery({ username }), { wrapper });

    expect(octokit.rest.orgs.listForUser).toHaveBeenCalledWith({ username });
  });
});
