import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import { store } from './store';
import { Home, Layout, UserDetails } from './routes';
import { ErrorPaper } from './components';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<Layout />}
      errorElement={
        <Layout>
          <ErrorPaper />
        </Layout>
      }
    >
      <Route errorElement={<ErrorPaper />}></Route>
      <Route index element={<Home />} />
      <Route path="users/:username" element={<UserDetails />} />
    </Route>,
  ),
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
