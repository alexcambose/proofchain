import { createStore, AnyAction } from 'redux';
import { MakeStore, createWrapper, Context, HYDRATE } from 'next-redux-wrapper';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import UserSlice from './user';
import { IUser } from './user/interface';

export interface State {
  user: IUser;
}

// create a makeStore function
const makeStore: MakeStore<State> = (context: Context) =>
  configureStore({
    middleware: [thunk],
    reducer: {
      user: UserSlice,
    },
  });

// export an assembled wrapper
export const wrapper = createWrapper<State>(makeStore, { debug: true });
