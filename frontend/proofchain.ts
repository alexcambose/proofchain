import config from 'config';
import Proofchain from 'proofchain-library';
let proofchain;
export const initProofchain = (web3) => {
  proofchain = Proofchain.web3Init({
    web3,
    factoryContractAddress: config.ethProvider.ropsten.factoryContractAddress,
  });
  console.log(proofchain);
};

export default () => proofchain;
