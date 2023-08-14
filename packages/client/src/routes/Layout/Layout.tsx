import { PropsWithChildren } from 'react';
import { Link, Outlet } from 'react-router-dom';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

export const Layout = ({ children }: PropsWithChildren) => (
  <>
    <CssBaseline />
    <AppBar
      position="absolute"
      color="default"
      elevation={0}
      sx={{
        position: 'relative',
        borderBottom: (t) => `1px solid ${t.palette.divider}`,
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          color="inherit"
          noWrap
          component={Link}
          to="/"
          sx={{ textDecoration: 'none' }}
        >
          Front End Interview Project
        </Typography>
      </Toolbar>
    </AppBar>
    <Container component="main" maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Outlet />
      {children}
    </Container>
  </>
);
