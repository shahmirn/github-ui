import { PropsWithChildren } from 'react';
import Typography, { TypographyProps } from '@mui/material/Typography';

export const SecondaryTypography = ({
  children,
  ...props
}: PropsWithChildren<TypographyProps>) => (
  <Typography
    variant="body2"
    color="text.secondary"
    component="div"
    display="flex"
    alignItems="center"
    {...props}
  >
    {children}
  </Typography>
);
