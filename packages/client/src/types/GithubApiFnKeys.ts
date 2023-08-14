import type { RestEndpointMethods } from '@octokit/plugin-rest-endpoint-methods/dist-types/generated/method-types';
import { NestedKeyOf } from './NestedKeyOf';

export type GithubApiFnKeys = NestedKeyOf<RestEndpointMethods>;
