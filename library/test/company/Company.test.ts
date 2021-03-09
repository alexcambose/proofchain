import { deployedFactory, provider } from '../provider';
import Proofchain from '../../src/index';

describe('Company', () => {
  describe('create', () => {
    it('creates a new company', async () => {
      // const proofChain = Proofchain.providerInit({ web3Provider: provider });
      console.log(await deployedFactory());
    });
  });
});
