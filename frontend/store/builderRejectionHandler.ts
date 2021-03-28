import jsErrorToast from '@components/toast/jsErrorToast';
import { AsyncThunk } from '@reduxjs/toolkit';

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;

type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>;
export default (builder) => {
  builder.addMatcher(
    (action): action is RejectedAction => action.type.endsWith('/rejected'),
    (state, action) => {
      console.log(action);
      // @ts-ignore
      jsErrorToast(action.error);
      throw new Error(action.error.message);
    }
  );
};
