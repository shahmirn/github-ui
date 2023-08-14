import { RestEndpointMethodTypes } from '@octokit/rest';
import { githubApi } from '../githubApi';

export const getUserOrganizationsEndpoint = githubApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserOrganizations: builder.query<
      RestEndpointMethodTypes['orgs']['listForUser']['response']['data'],
      RestEndpointMethodTypes['orgs']['listForUser']['parameters']
    >({
      query: (args) => ({
        fn: 'orgs.listForUser',
        args: [args],
      }),
      // Arbitrarily set to 10 minutes. Users probably aren't joining and leaving orgs that often.
      keepUnusedDataFor: 10 * 60,
    }),
  }),
});

export const { useGetUserOrganizationsQuery } = getUserOrganizationsEndpoint;
