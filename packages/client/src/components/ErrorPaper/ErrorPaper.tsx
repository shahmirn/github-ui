import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { PaperWithTitle } from '..';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

interface ErrorPaperProps {
  title?: string;
  errorMessage?: string;
  showHomeButton?: boolean;
}

export const ErrorPaper = ({
  title = 'Whoops',
  errorMessage = 'We ran into an unexpected error',
  showHomeButton = true,
}: ErrorPaperProps) => (
  <PaperWithTitle
    title={title}
    elevation={0}
    typographyProps={{ variant: 'h2' }}
  >
    <Stack direction="column" alignItems="flex-start" spacing={2}>
      <Typography>{errorMessage}</Typography>
      {showHomeButton ? (
        <Button variant="outlined" component={Link} to="/">
          Go Home
        </Button>
      ) : null}
    </Stack>
  </PaperWithTitle>
);
