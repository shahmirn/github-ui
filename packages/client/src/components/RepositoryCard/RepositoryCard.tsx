import Card, { CardProps } from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export interface RepositoryCardProps extends CardProps {
  repository: {
    name: string;
    description?: string | null;
  };
}

export const RepositoryCard = ({
  repository,
  ...props
}: RepositoryCardProps) => (
  <Card variant="outlined" {...props}>
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        {repository.name}
      </Typography>
      {repository.description ? (
        <Typography gutterBottom variant="body2" component="div">
          {repository.description}
        </Typography>
      ) : null}
    </CardContent>
  </Card>
);
