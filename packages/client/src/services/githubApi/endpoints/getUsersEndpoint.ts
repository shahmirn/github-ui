import { RestEndpointMethodTypes } from '@octokit/rest';
import { githubApi } from '../githubApi';

export const getUsersEndpoint = githubApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<
      RestEndpointMethodTypes['users']['list']['response']['data'],
      RestEndpointMethodTypes['users']['list']['parameters'] | void
    >({
      query: (args) => ({
        fn: 'users.list',
        args: [args],
      }),
    }),
  }),
});

export const { useGetUsersQuery } = getUsersEndpoint;
