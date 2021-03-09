jest.useFakeTimers();
import Proofchain from '../src';
import provider from './provider';

describe('Proofchain', () => {
  it('instantiates a web3 instance with the provided configuration', () => {
    const proofchainInstance = Proofchain.init({
      httpProvider: 'http://127.0.0.1:7545',
      privateKey:
        'b1d7f93e7a535ec11a5f99a358cd30d76de52a191e7872b304a5d940b77e743d',
    });
    expect(proofchainInstance.isInitialised()).toEqual(true);
  });
  it('instantiates a web3 from a provider', () => {
    const proofchainInstance = Proofchain.providerInit(provider);
    expect(proofchainInstance.isInitialised()).toEqual(true);
  });
});
