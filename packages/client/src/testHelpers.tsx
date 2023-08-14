import { AnyAction, Store } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { githubApi } from './services/githubApi';

const middlewares = [thunk, githubApi.middleware];
const mockStore = configureStore(middlewares);

const store = mockStore({
  githubApi: {
    queries: {},
    mutations: {},
    provided: {},
    subscriptions: {},
    config: {},
  },
});

// Based on: https://gist.github.com/Danetag/31982ad8d03afbc01042e3678445fd1c
const getWrapper =
  (store: Store<any, AnyAction>) =>
  ({ children }: { children?: React.ReactNode }) => (
    <Provider store={store}>{children}</Provider>
  );
export const wrapper = getWrapper(store);
