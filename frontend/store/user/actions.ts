import { createAsyncThunk } from '@reduxjs/toolkit';
import { EntityTypeEnum, SocialLoginTypeEnum } from 'enums';
import AuthManager from '@utils/auth/authManager';
import { triggerLogin } from '@utils/auth/torus';
import { getAccountFromMnemonic } from '@utils/eth';
import web3Instance, { initWeb3Instance } from 'web3Instance';
import proofchain from 'proofchain';
export const refreshUserInfo = async (authManager = AuthManager) => {
  const address = await initWeb3Instance(authManager.getInfo());
  const hasCompany = await proofchain().company.hasCompany();
  const hasCertificateAuthority = await proofchain().certificateAuthority.hasCertificateAuthority();
  let name = '';
  const company = await proofchain().company.getCompany(address);
  const certificateAuthority = await proofchain().certificateAuthority.getCertificateAuthority(
    address
  );
  if (hasCompany) {
    name = company.name;
  } else if (hasCertificateAuthority) {
    name = certificateAuthority.name;
  }
  console.log(address);
  return {
    address,
    name,
    hasEntity: hasCompany || hasCertificateAuthority,
    entityType: hasCompany
      ? EntityTypeEnum.COMPANY
      : hasCertificateAuthority
      ? EntityTypeEnum.CERTIFICATE_AUTHORITY
      : null,
    companyEntityType: hasCompany && company.entityType,
  };
};
export const loginWithMetamask = createAsyncThunk(
  'users/loginWithMetamask',
  async () => {
    await window.ethereum.send('eth_requestAccounts');
    return;
  }
);
export const loginWithTorus = createAsyncThunk(
  'users/loginWithTorus',
  // Declare the type your function argument here:
  async (loginType: SocialLoginTypeEnum) => {
    const result = await triggerLogin(loginType);
    return result;
  }
);
export const loginWithMnemonic = createAsyncThunk(
  'users/loginWithMnemonic',
  // Declare the type your function argument here:
  async ({
    mnemonic,
    derivationPath,
  }: {
    mnemonic: string;
    derivationPath: string;
  }) => {
    // @ts-ignore
    const { privateKey, address } = await getAccountFromMnemonic(
      mnemonic,
      derivationPath
    );
    return { privateKey, address };
  }
);

export const refreshLogin = createAsyncThunk(
  'users/refreshLogin',
  // Declare the type your function argument here:
  async () => {
    return await refreshUserInfo();
  }
);
export const refreshBalance = createAsyncThunk(
  'users/refreshBalance',
  // Declare the type your function argument here:
  async (_, thunkApi) => {
    const {
      // @ts-ignore
      user: { address },
    } = thunkApi.getState();
    console.log(thunkApi.getState());
    const balanceInWei = await web3Instance().eth.getBalance(address);
    const balance = web3Instance().utils.fromWei(balanceInWei);

    return { balance };
  }
);
