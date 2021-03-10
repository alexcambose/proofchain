import { deployedFactoryAddress, provider } from '../provider';
import Proofchain from '../../src/index';
import EntityTypeEnum from '../../src/enums/EntityTypeEnum';

describe('Company', () => {
  describe('create', () => {
    it('creates a new company', async () => {
      const proofChain = Proofchain.providerInit({
        web3Provider: provider,
        factoryContractAddress: await deployedFactoryAddress(),
      });
      const result = await proofChain
        .company()
        .create({ name: 'company', entityType: EntityTypeEnum.MANUFACTURER });
      return result;
    });
  });
});
