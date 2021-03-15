import { SocialLoginTypeEnum } from 'enums';

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
const ropsten = {
  //todo update this, contract is on rinkeby
  http: 'https://rinkeby.infura.io/v3/27c99ce149ba413080a05eff7597f5cc',
  wss: 'wss://rinkeby.infura.io/ws/v3/27c99ce149ba413080a05eff7597f5cc',
  factoryContractAddress: '0x592d365043776e092715A84F97292Dc3cfbedB88',
  etherscan: 'https://rinkeby.etherscan.io/',
};
export default {
  torus: torusTestnet,
  ethProvider: {
    default: ropsten,
  },
};
