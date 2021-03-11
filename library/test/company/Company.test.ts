import { deployedFactoryAddress, provider } from '../provider';
import Proofchain from '../../src/index';
import EntityTypeEnum from '../../src/enums/EntityTypeEnum';

describe('Company', () => {
  let proofChain: Proofchain;
  beforeEach(async () => {
    proofChain = Proofchain.providerInit({
      web3Provider: provider,
      factoryContractAddress: await deployedFactoryAddress(),
    });
  });
  describe('create', () => {
    it('creates a new company', async () => {
      const result = await proofChain
        .company()
        .create({ name: 'company', entityType: EntityTypeEnum.MANUFACTURER });
      expect(result.events.CompanyCreate.address.length).toEqual(
        '0xa3AAB829D1694E2B96b4905b0c7E17d86EC084ED'.length
      );
    });
  });
  describe('getCompany', () => {
    it('returns the  company associated with the default address, if the address is not specified', async () => {
      await proofChain.company().create({
        name: 'company name',
        entityType: EntityTypeEnum.MANUFACTURER,
      });

      const companyInfo = await proofChain.company().getCompany();
      console.log(companyInfo);
      expect(companyInfo.name).toEqual('company name');
      expect(companyInfo.entityType).toEqual(EntityTypeEnum.MANUFACTURER);
    });
    it('returns a company based on the specified address', async () => {
      //
    });
  });
  describe('hasCompnay', () => {
    it('returns true if the specified address has a company', async () => {});
  });
});
