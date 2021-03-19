import { isDevelopment } from '@utils/next';
import { SocialLoginTypeEnum } from 'enums';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
const torusTestnet = {
  credentials: {
    [SocialLoginTypeEnum.GOOGLE]: {
      typeOfLogin: 'google',
      verifier: 'trackchain-google-testnet',
      clientId:
        '586480264771-oesrj58j5hmbfvfj4fh5cvufveplgunt.apps.googleusercontent.com',
    },
    [SocialLoginTypeEnum.EMAIL_PASSWORD]: {
      name: 'Email Password',

      typeOfLogin: 'email_password',
      verifier: 'trackchin-email-password-testnet',
      clientId: 'YFgVMzDivGqZOk4oYqasT57Iea7yvOPe',
    },
  },
};
export default {
  torus: torusTestnet,
  ethProvider: {
    default: publicRuntimeConfig.ethProvider,
  },
};
