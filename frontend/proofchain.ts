import { isClient } from '@utils/next';
import config from 'config';
import Proofchain from 'proofchain-library';
let _proofchain;
export const initProofchain = async (web3, fromAddress = null) => {
  console.log('Init proofchain with fromAddress=' + fromAddress);
  _proofchain = await Proofchain.web3Init({
    web3,
    fromAddress: fromAddress,
    factoryContractAddress: config.ethProvider.default.factoryContractAddress,
  });
  if (isClient()) {
    // @ts-ignore
    window._proofchain = _proofchain;
  }
};
const proofchain = (): Proofchain => _proofchain;

export default proofchain;
