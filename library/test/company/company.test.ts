import { deployedFactoryAddress, provider } from '../provider';
import Proofchain from '../../src/index';
import CompanyEntityTypeEnum from '../../src/enums/CompanyEntityTypeEnum';
import Web3 from 'web3';

describe('Company', () => {
  let proofChain: Proofchain;
  let account;
  beforeAll(async () => {
    // @ts-ignore
    [account] = await new Web3(provider).eth.getAccounts();
    proofChain = await Proofchain.providerInit({
      web3Provider: provider,
      factoryContractAddress: await deployedFactoryAddress(),
      fromAddress: account,
    });
  });
  describe('create', () => {
    it('creates a new company', async () => {
      const result = await proofChain.company.create({
        name: 'company',
        entityType: CompanyEntityTypeEnum.MANUFACTURER,
      });
      expect(result.events.CompanyCreate.owner.length).toEqual(
        '0xa3AAB829D1694E2B96b4905b0c7E17d86EC084ED'.length
      );
    });
  });
  describe('getCompany', () => {
    it('returns the  company associated with the default address, if the address is not specified', async () => {
      const companyInfo = await proofChain.company.getCompany();
      expect(companyInfo.name).toEqual('company');
      expect(companyInfo.entityType).toEqual(
        CompanyEntityTypeEnum.MANUFACTURER
      );
    });
    it('returns a company based on the specified address', async () => {
      //
    });
  });
  describe('hasCompnay', () => {
    it('returns true if the specified address has a company', async () => {});
  });
});
