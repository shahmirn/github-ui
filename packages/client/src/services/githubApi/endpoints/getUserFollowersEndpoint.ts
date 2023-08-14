import { RestEndpointMethodTypes } from '@octokit/rest';
import { githubApi } from '../githubApi';

export const getUserFollowersEndpoint = githubApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserFollowers: builder.query<
      RestEndpointMethodTypes['users']['listFollowersForUser']['response']['data'],
      RestEndpointMethodTypes['users']['listFollowersForUser']['parameters']
    >({
      query: (args) => ({
        fn: 'users.listFollowersForUser',
        args: [args],
      }),
      // Arbitrarily set to 5 minutes. Users probably aren't gaining and losing followers that often.
      keepUnusedDataFor: 5 * 60,
    }),
  }),
});

export const { useGetUserFollowersQuery } = getUserFollowersEndpoint;
