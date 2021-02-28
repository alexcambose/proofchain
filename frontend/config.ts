import { SocialLoginTypeEnum } from '@types/enums';

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
    ropsten: {
      http: 'https://ropsten.infura.io/v3/27c99ce149ba413080a05eff7597f5cc',
      wss: 'wss://ropsten.infura.io/ws/v3/27c99ce149ba413080a05eff7597f5cc',
    },
  },
};
