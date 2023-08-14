import { createApi } from '@reduxjs/toolkit/query/react';
import { Octokit } from '@octokit/rest';
import { OctokitResponse } from '@octokit/types';
import get from 'lodash/get';
import { serializeError } from 'serialize-error';

import { GithubApiFnKeys } from '../../types';
import { config } from '../../config';

const octokit = new Octokit({
  baseUrl: config.githubApi.baseUrl,
});

export const githubApi = createApi({
  reducerPath: 'githubApi',
  baseQuery: async (params: { fn: GithubApiFnKeys; args: any[] }) => {
    const { fn: fnPath, args = [] } = params;

    const fn = get(octokit.rest, fnPath) as (
      ...args: any[]
    ) => Promise<OctokitResponse<unknown>>;

    try {
      const responseData = await fn(...args);
      return { data: responseData.data };
    } catch (error) {
      return { error: serializeError(error) };
    }
  },
  // All the endpoints live in separate files in the endpoints folder, and are added to this API via injectEndpoints
  endpoints: () => ({}),
});
