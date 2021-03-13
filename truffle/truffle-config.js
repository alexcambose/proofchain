const HDWalletProvider = require("@truffle/hdwallet-provider");

module.exports = {
  // Uncommenting the defaults below
  // provides for an easier quick-start with Ganache.
  // You can also follow this format for other networks;
  // see <http://truffleframework.com/docs/advanced/configuration>
  // for more details on how to specify configuration options!
  //
  networks: {
    develop: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*",
    },
    test: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*",
    },
    rinkeby: {
      provider: function () {
        return new HDWalletProvider(
          "b1d7f93e7a535ec11a5f99a358cd30d76de52a191e7872b304a5d940b77e743d",
          "https://rinkeby.infura.io/v3/27c99ce149ba413080a05eff7597f5cc"
        );
      },
      network_id: 4,
    },
  },
  compilers: {
    solc: {
      version: ">0.7.0 <0.9.0",
    },
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 200,
    },
  },
};
