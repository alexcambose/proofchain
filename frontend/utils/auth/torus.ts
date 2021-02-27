import DirectWebSdk from '@toruslabs/torus-direct-web-sdk';
import { SocialLoginTypeEnum } from '@types/enums';
import config from 'config';
const torus = new DirectWebSdk({
  baseUrl: 'http://localhost:3000',
  enableLogging: true,

  proxyContractAddress: '0x4023d2a0D330bF11426B12C6144Cfb96B7fa6183', // details for test net
  network: 'testnet', // details for test net
});

export const init = async () => {
  await torus.init();
  window.torus = torus;
};
export const triggerLogin = async (loginType: SocialLoginTypeEnum, data) => {
  const loginData = config.torus.credentials[loginType];
  if ((loginType = SocialLoginTypeEnum.EMAIL_PASSWORD)) {
    loginData.jwtParams = { domain: 'https://dev-6eszxcvx.us.auth0.com' };
  }
  console.log(loginData);
  try {
    const userInfo = await torus.triggerLogin(loginData);
    console.log(userInfo);
  } catch (e) {
    console.log(e);
  }
};
