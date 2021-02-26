import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import initialState, { IUser, IUserData } from './initialState';

export const UserSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {},
});

export const {} = UserSlice.actions;
