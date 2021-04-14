jest.useFakeTimers();
jest.setTimeout(30000);

import Proofchain from '../src/Proofchain';
import { provider, web3 } from './provider';

describe('Proofchain', () => {
  it('instantiates a web3 instance with the provided configuration', async () => {
    const proofchainInstance = await Proofchain.web3Init({
      web3,
      factoryContractAddress: '',
    });
    expect(proofchainInstance.isInitialised()).toEqual(true);
  });
  it('instantiates a web3 from a provider', async () => {
    const proofchainInstance = await Proofchain.providerInit({
      web3Provider: provider,
      factoryContractAddress: '',
      fromAddress: '',
    });
    expect(proofchainInstance.isInitialised()).toEqual(true);
  });
});
