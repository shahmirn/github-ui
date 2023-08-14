import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { useParams } from 'react-router-dom';
import orderBy from 'lodash/orderBy';

import {
  useGetUserQuery,
  useGetUserRepositoriesQuery,
  useGetUserOrganizationsQuery,
  useGetUserFollowersQuery,
} from '../../services/githubApi/endpoints';
import {
  PaperWithTitle,
  OrganizationCard,
  RepositoryCard,
  UserCard,
  ErrorPaper,
  LoadingIndicator,
} from '../../components';

export const UserDetails = () => {
  let { username } = useParams();

  const userDetails = useGetUserQuery({ username: username! });

  const userRepos = useGetUserRepositoriesQuery({
    username: username!,
  });
  const sortedUserRepos = orderBy(
    userRepos?.data,
    ['stargazers_count'],
    ['desc'],
  );

  const userOrganizations = useGetUserOrganizationsQuery({
    username: username!,
  });

  const userFollowers = useGetUserFollowersQuery({
    username: username!,
    per_page: 5,
  });

  if (
    userDetails.isLoading ||
    userRepos.isLoading ||
    userOrganizations.isLoading ||
    userFollowers.isLoading
  ) {
    return <LoadingIndicator />;
  }

  if (!userDetails?.data) {
    return <ErrorPaper errorMessage="User not found" />;
  }

  return (
    <Grid container spacing={2} data-testid="userDetails">
      <Grid xs={12} md={4}>
        <UserCard user={userDetails.data} data-testid="userDetailsCard" />
      </Grid>
      <Grid xs={12} md={8}>
        <PaperWithTitle
          title={sortedUserRepos?.length ? 'Repositories' : 'No Repositories'}
          elevation={0}
        >
          <Grid xs={12} container spacing={2} alignItems="stretch">
            {sortedUserRepos.map((repo) => (
              <Grid xs={12} sm={6} key={repo.name} sx={{ display: 'flex' }}>
                <RepositoryCard
                  sx={{ width: '100%' }}
                  repository={repo}
                  data-testid="repositoryCard"
                />
              </Grid>
            ))}
          </Grid>
        </PaperWithTitle>

        <PaperWithTitle
          title={
            userOrganizations?.data?.length
              ? 'Organizations'
              : 'No Organizations'
          }
          elevation={0}
          sx={{ mt: 4 }}
        >
          <Grid xs={12} container spacing={2} alignItems="stretch">
            {userOrganizations?.data?.map((org) => (
              <Grid xs={12} sm={6} key={org.id} sx={{ display: 'flex' }}>
                <OrganizationCard
                  sx={{ width: '100%' }}
                  organization={org}
                  data-testid="organizationCard"
                />
              </Grid>
            ))}
          </Grid>
        </PaperWithTitle>

        <PaperWithTitle
          title={userFollowers?.data?.length ? 'Followers' : 'No Followers'}
          elevation={0}
          sx={{ mt: 4 }}
        >
          <Grid xs={12} container spacing={2}>
            {userFollowers?.data?.map((follower) => (
              <Grid xs={12} sm={6} key={follower.login}>
                <UserCard
                  data-testid="followerCard"
                  user={follower}
                  variant="outlined"
                  avatarSize={{ width: 72, height: 72 }}
                />
              </Grid>
            ))}
          </Grid>
        </PaperWithTitle>
      </Grid>
    </Grid>
  );
};
