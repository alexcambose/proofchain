import { createAsyncThunk } from '@reduxjs/toolkit';
import web3Instance from 'web3Instance';

export const fetchGasPrice = createAsyncThunk(
  'application/fetchGasPrice',
  async () => {
    const gasPrice = await web3Instance().eth.getGasPrice();
    return { gasPrice };
  }
);
