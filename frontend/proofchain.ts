import { isClient } from '@utils/next';
import config from 'config';
import Proofchain from 'proofchain-library';
let proofchain;
export const initProofchain = (web3, fromAddress) => {
  proofchain = Proofchain.web3Init({
    web3,
    fromAddress: fromAddress,
    factoryContractAddress: config.ethProvider.default.factoryContractAddress,
  });
  if (isClient()) {
    // @ts-ignore
    window.proofchain = proofchain;
  }
};

export default (): Proofchain => proofchain;
