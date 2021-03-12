import { MakeStore, createWrapper, Context, HYDRATE } from 'next-redux-wrapper';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import UserSlice from './user';
import { IUser } from './user/interface';
import CompanyEntitySlice from './companyEntity';
import { ICompanyEntity } from './companyEntity/interface';
import { MaterialSlice } from './material';
import { IMaterialStore } from './material/interface';

export interface State {
  user: IUser;
  companyEntity: ICompanyEntity;
  material: IMaterialStore;
}

// create a makeStore function
const makeStore: MakeStore<State> = (context: Context) =>
  configureStore({
    middleware: [thunk],
    reducer: {
      user: UserSlice,
      companyEntity: CompanyEntitySlice,
      material: MaterialSlice,
    },
  });

// export an assembled wrapper
export const wrapper = createWrapper<State>(makeStore, { debug: true });
