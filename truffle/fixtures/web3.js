const HDWalletProvider = require("@truffle/hdwallet-provider");
const faker = require("faker");
const Web3 = require("web3");
const provider = new HDWalletProvider({
  mnemonic: {
    phrase: "stage analyst reform dune educate throw exile disagree pause search crouch finger",
  },
  providerOrUrl: "http://127.0.0.1:8545",
});
const web3 = new Web3(provider);
module.exports = web3;
