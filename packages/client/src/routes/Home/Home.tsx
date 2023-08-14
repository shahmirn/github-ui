import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2

import { ErrorPaper, LoadingIndicator, UserCard } from '../../components';
import { useGetUsersQuery } from '../../services/githubApi/endpoints';

export const Home = () => {
  const users = useGetUsersQuery();

  if (users.isLoading) {
    return <LoadingIndicator />;
  }

  if (users.isError) {
    return (
      <ErrorPaper
        showHomeButton={false}
        errorMessage="We ran into an unexpected error. Please refresh the page or try again later."
      />
    );
  }

  return (
    <Grid container spacing={2} data-testid="usersList">
      {users.data?.map((user) => (
        <Grid xs={12} sm={6} md={4} lg={4} key={user.login}>
          <UserCard user={user} linkToDetails data-testid="userCard" />
        </Grid>
      ))}
    </Grid>
  );
};
