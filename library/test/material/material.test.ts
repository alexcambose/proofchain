import Proofchain from '../../src';
import CompanyEntityTypeEnum from '../../src/enums/CompanyEntityTypeEnum';
import { deployedFactoryAddress, provider } from '../provider';
import Web3 from 'web3';

describe('Material', () => {
  let proofChain: Proofchain;
  let account: string;
  beforeAll(async () => {
    // @ts-ignore
    [account] = await new Web3(provider).eth.getAccounts();
    proofChain = await Proofchain.providerInit({
      web3Provider: provider,
      factoryContractAddress: await deployedFactoryAddress(),
      fromAddress: account,
    });
    const result = await proofChain.company.create({
      name: 'company',
      entityType: CompanyEntityTypeEnum.MANUFACTURER,
    });
  });
  describe('create', () => {
    it('creates a new material', async () => {
      const rawMaterial = await proofChain.material.create({
        name: 'raw product',
        code: '123',
      });
      const result = await proofChain.material.create({
        name: 'product',
        code: '123',
        recipeMaterialTokenId: [
          rawMaterial.events.MaterialCreate.materialTokenId,
        ],
        recipeMaterialAmount: [2],
      });
      expect(result.events.MaterialCreate.company).toEqual(account);
      expect(result.events.MaterialCreate.materialTokenId).toEqual('1');
    });
    it('throws error if the specified recipe material id does not exist', async () => {
      const resultPromise = proofChain.material.create({
        name: 'product',
        code: '123',
        images: ['a'],
        recipeMaterialTokenId: [99],
        recipeMaterialAmount: [2],
      });
      await expect(resultPromise).rejects.toThrow();
    });
  });
});
