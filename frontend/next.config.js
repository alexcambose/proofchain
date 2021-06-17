const withPlugins = require('next-compose-plugins');
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

const withTM = require('next-transpile-modules')(['proofchain-library']);
const result = require('dotenv').config({ path: '../.env' });

const nextConfiguration = {
  webpack: function (config) {
    config.externals = config.externals || {};
    config.externals['styletron-server'] = 'styletron-server';
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            icon: true,
            replaceAttrValues: { '#000': '{props.color}' },
          },
        },
      ],
    });
    return config;
  },
  ['!' + PHASE_DEVELOPMENT_SERVER]: {
    publicRuntimeConfig: {
      ethProvider: {
        http: 'https://rinkeby.infura.io/v3/27c99ce149ba413080a05eff7597f5cc',
        wss: 'wss://rinkeby.infura.io/ws/v3/27c99ce149ba413080a05eff7597f5cc',
        factoryContractAddress: process.env.PRODUCTION_FACTORY_CONTRACT_ADDRESS,
        etherscan: 'https://rinkeby.etherscan.io/',
      },
    },
  },
  [PHASE_DEVELOPMENT_SERVER]: {
    publicRuntimeConfig: {
      // ethProvider: {
      //   http: 'https://rinkeby.infura.io/v3/27c99ce149ba413080a05eff7597f5cc',
      //   wss: 'wss://rinkeby.infura.io/ws/v3/27c99ce149ba413080a05eff7597f5cc',
      //   factoryContractAddress: process.env.PRODUCTION_FACTORY_CONTRACT_ADDRESS,
      //   etherscan: 'https://rinkeby.etherscan.io/',
      // },
      ethProvider: {
        http: 'http://127.0.0.1:8545',
        wss: '',
        factoryContractAddress:
          process.env.DEVELOPMENT_FACTORY_CONTRACT_ADDRESS,
        etherscan: 'https://rinkeby.etherscan.io/',
      },
    },
  },
};
module.exports = withPlugins([withTM], nextConfiguration);
