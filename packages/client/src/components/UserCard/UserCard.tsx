import { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';
import Card, { CardProps } from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import isNil from 'lodash/isNil';

import { SecondaryTypography } from '../SecondaryTypography';

export interface UserCardProps extends CardProps {
  user: {
    login: string;
    avatar_url: string;
    name?: string | null;
    bio?: string | null;
    company?: string | null;
    location?: string | null;
    followers?: number;
  };
  avatarSize?: {
    width: number;
    height: number;
  };
  linkToDetails?: boolean;
}

export const UserCard = ({
  user,
  avatarSize = { width: 260, height: 260 },
  linkToDetails,
  ...props
}: UserCardProps) => {
  const Wrapper = ({ children }: PropsWithChildren) =>
    linkToDetails ? (
      <CardActionArea component={Link} to={`/users/${user.login}`}>
        {children}
      </CardActionArea>
    ) : (
      <>{children}</>
    );

  return (
    <Card {...props}>
      <Wrapper>
        <Box display="flex" justifyContent="center">
          <Avatar
            alt={`Avatar for ${user.name ?? user.login}`}
            src={user.avatar_url}
            sx={{
              mt: 2,
              width: avatarSize.width,
              height: avatarSize.height,
              alignContent: 'center',
              alignItems: 'center',
            }}
          />
        </Box>
        <CardContent>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            justifyContent="center"
            display="flex"
          >
            {user.login}
          </Typography>
          {user.name ? (
            <SecondaryTypography>{user.name}</SecondaryTypography>
          ) : null}
          {user.bio ? (
            <SecondaryTypography>{user.bio}</SecondaryTypography>
          ) : null}
          {!isNil(user.followers) || user.company || user.location ? (
            <Box mt={2} />
          ) : null}
          {!isNil(user.followers) ? (
            <SecondaryTypography>
              <PeopleOutlinedIcon sx={{ mr: 1 }} />
              <span>{user.followers} followers</span>
            </SecondaryTypography>
          ) : null}
          {user.company ? (
            <SecondaryTypography>
              <BusinessOutlinedIcon sx={{ mr: 1 }} />
              <span>{user.company}</span>
            </SecondaryTypography>
          ) : null}
          {user.location ? (
            <SecondaryTypography>
              <LocationOnOutlinedIcon sx={{ mr: 1 }} />
              <span>{user.location}</span>
            </SecondaryTypography>
          ) : null}
        </CardContent>
      </Wrapper>
    </Card>
  );
};
