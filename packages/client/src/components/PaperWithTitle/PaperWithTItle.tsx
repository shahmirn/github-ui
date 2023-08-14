import { PropsWithChildren } from 'react';
import Paper, { PaperProps } from '@mui/material/Paper';
import Typography, { TypographyProps } from '@mui/material/Typography';

interface PaperWithTitleProps extends PaperProps {
  title: string;
  typographyProps?: TypographyProps;
}

export const PaperWithTitle = ({
  title,
  typographyProps,
  children,
  ...props
}: PropsWithChildren<PaperWithTitleProps>) => (
  <Paper {...props}>
    <Typography
      gutterBottom
      variant="h5"
      component="div"
      fontWeight="lighter"
      {...typographyProps}
    >
      {title}
    </Typography>
    {children}
  </Paper>
);
