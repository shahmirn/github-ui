import { RestEndpointMethodTypes } from '@octokit/rest';
import { githubApi } from '../githubApi';

export const getUserEndpoint = githubApi.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<
      RestEndpointMethodTypes['users']['getByUsername']['response']['data'],
      RestEndpointMethodTypes['users']['getByUsername']['parameters']
    >({
      query: (args) => ({
        fn: 'users.getByUsername',
        args: [args],
      }),
      // Arbitrarily set to 5 minutes. Users probably aren't changing their profile info that often.
      keepUnusedDataFor: 5 * 60,
    }),
  }),
});

export const { useGetUserQuery } = getUserEndpoint;
