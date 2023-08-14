import { RestEndpointMethodTypes } from '@octokit/rest';
import { githubApi } from '../githubApi';

export const getUserRepositoriesEndpoint = githubApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserRepositories: builder.query<
      RestEndpointMethodTypes['repos']['listForUser']['response']['data'],
      RestEndpointMethodTypes['repos']['listForUser']['parameters']
    >({
      query: (args) => ({
        fn: 'repos.listForUser',
        args: [args],
      }),
      // Arbitrarily set to 10 minutes. Users probably aren't creating and deleting repos that often.
      keepUnusedDataFor: 10 * 60,
    }),
  }),
});

export const { useGetUserRepositoriesQuery } = getUserRepositoriesEndpoint;
