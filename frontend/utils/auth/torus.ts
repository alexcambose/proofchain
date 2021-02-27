import DirectWebSdk from '@toruslabs/torus-direct-web-sdk';

export const init = async () => {
  const torus = new DirectWebSdk({
    baseUrl: 'http://localhost:3000',
    proxyContractAddress: '0x4023d2a0D330bF11426B12C6144Cfb96B7fa6183', // details for test net
    network: 'testnet', // details for test net
  });
  await torus.init();
  const userInfo = await torus.triggerLogin({
    typeOfLogin: 'google',
    verifier: 'trackchain-google-testnet',
    clientId:
      '586480264771-oesrj58j5hmbfvfj4fh5cvufveplgunt.apps.googleusercontent.com',
  });
  console.log(userInfo);
};
