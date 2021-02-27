import DirectWebSdk from '@toruslabs/torus-direct-web-sdk';
import { SocialLoginTypeEnum } from '@types/enums';
import config from 'config';
const torus = new DirectWebSdk({
  baseUrl: 'http://localhost:3000',
  proxyContractAddress: '0x4023d2a0D330bF11426B12C6144Cfb96B7fa6183', // details for test net
  network: 'testnet', // details for test net
});

export const init = async () => {
  await torus.init();
  window.torus = torus;
};
export const triggerLogin = async (loginType: SocialLoginTypeEnum) => {
  console.log(config.torus.credentials[loginType]);

  const userInfo = await torus.triggerLogin(
    // @ts-ignore
    config.torus.credentials[loginType]
  );
};
