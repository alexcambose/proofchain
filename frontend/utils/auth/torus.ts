import DirectWebSdk from '@toruslabs/torus-direct-web-sdk';
import { SocialLoginTypeEnum } from 'enums';
import config from 'config';
import { isClient } from '@utils/next';
let torus = null;
if (isClient()) {
  torus = new DirectWebSdk({
    baseUrl: window.location.origin,
    enableLogging: true,

    proxyContractAddress: '0x4023d2a0D330bF11426B12C6144Cfb96B7fa6183', // details for test net
    network: 'testnet', // details for test net
  });
}

export const init = async () => {
  await torus.init();
  // @ts-ignore
  window.torus = torus;
};
export const triggerLogin = async (
  loginType: SocialLoginTypeEnum,
  data = {}
) => {
  const loginData = config.torus.credentials[loginType];
  if ((loginType = SocialLoginTypeEnum.EMAIL_PASSWORD)) {
    loginData.jwtParams = { domain: 'https://dev-6eszxcvx.us.auth0.com' };
  }
  console.log(loginData);
  try {
    const userInfo = await torus.triggerLogin(loginData);
    return userInfo;
  } catch (e) {
    console.log(e);
  }
};
