import { MakeStore, createWrapper, Context, HYDRATE } from 'next-redux-wrapper';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import UserSlice from './user';
import { IUser } from './user/interface';
import MaterialSlice from './material';
import { IMaterialStore } from './material/interface';
import ApplicationSlice from './application';
import BatchSlice from './batch';
import TransportSlice from './transport';
import { IApplication } from './application/interface';
import { IBatchStore } from './batch/interface';
import { ITransportStore } from './transport/interface';
import { ICertificateStore } from './certificate/interface';
import CertificateSlice from './certificate';
import ClientSlice from './client';
import { IClientStore } from './client/interface';

export interface State {
  user: IUser;
  material: IMaterialStore;
  batch: IBatchStore;
  application: IApplication;
  transport: ITransportStore;
  certificate: ICertificateStore;
  client: IClientStore;
}

// create a makeStore function
const makeStore: MakeStore<State> = (context: Context) =>
  configureStore({
    middleware: [thunk],
    reducer: {
      user: UserSlice,
      material: MaterialSlice,
      application: ApplicationSlice,
      batch: BatchSlice,
      transport: TransportSlice,
      certificate: CertificateSlice,
      client: ClientSlice,
    },
  });

// export an assembled wrapper
export const wrapper = createWrapper<State>(makeStore, { debug: true });
