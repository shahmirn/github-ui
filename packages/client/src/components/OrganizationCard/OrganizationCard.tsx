import Card, { CardProps } from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { SecondaryTypography } from '../SecondaryTypography';

export interface OrganizationCardProps extends CardProps {
  organization: {
    login: string;
    id: number;
    avatar_url: string;
    description?: string | null;
  };
}

export const OrganizationCard = ({
  organization,
  ...props
}: OrganizationCardProps) => (
  <Card variant="outlined" {...props}>
    <Box display="flex" justifyContent="center">
      <Avatar
        alt={`Avatar for ${organization.login}`}
        src={organization.avatar_url}
        sx={{
          mt: 2,
          width: 72,
          height: 72,
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
        {organization.login}
      </Typography>
      {organization.description ? (
        <SecondaryTypography>{organization.description}</SecondaryTypography>
      ) : null}
    </CardContent>
  </Card>
);
