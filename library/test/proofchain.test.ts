jest.useFakeTimers();
jest.setTimeout(30000);

import Proofchain from '../src';
import { provider } from './provider';

describe('Proofchain', () => {
  it('instantiates a web3 instance with the provided configuration', async () => {
    const proofchainInstance = await Proofchain.init({
      httpProvider: 'http://127.0.0.1:7545',
      privateKey:
        'b1d7f93e7a535ec11a5f99a358cd30d76de52a191e7872b304a5d940b77e743d',
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
