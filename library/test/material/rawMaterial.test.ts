import Proofchain from '../../src';
import { deployedFactoryAddress, provider } from '../provider';
import Web3 from 'web3';

describe('raw material', () => {
  let proofChain: Proofchain;
  let account: string;
  beforeEach(async () => {
    // @ts-ignore
    [account] = await new Web3(provider).eth.getAccounts();
    proofChain = await Proofchain.providerInit({
      web3Provider: provider,
      factoryContractAddress: await deployedFactoryAddress(),
      fromAddress: account,
    });
  });
  describe('create raw material', () => {
    it('creates a new material', async () => {
      const result = await proofChain.material.create({
        name: 'product',
        code: '123',
        images: ['a'],
      });
      expect(result.events.MaterialCreate.company).toEqual(account);
      expect(result.events.MaterialCreate.materialTokenId).toEqual('0');
    });
  });
  describe('all', () => {
    it('returns all created materials', async () => {
      // at this point the length should be greater than 1
      await proofChain.material.create({
        name: 'product',
        code: '123',
        images: ['a'],
      });
      const materials = await proofChain.material.all();
      expect(materials.length).toEqual(1);
    });
  });
  describe('getById', () => {
    it('returns a material based on the materialTokenId', async () => {
      // at this point the length should be greater than 1
      const result = await proofChain.material.create({
        name: 'product',
        code: '123',
        images: ['a'],
      });
      const fetched = await proofChain.material.getById(
        result.events.MaterialCreate.materialTokenId
      );
      expect(fetched.name).toEqual('product');
      expect(fetched.code).toEqual('123');
    });
  });
  describe('countAll', () => {
    it('returns all created materials', async () => {
      // at this point the length should be greater than 1
      await proofChain.material.create({
        name: 'product',
        code: '123',
        images: ['a'],
      });
      const length = await proofChain.material.countAll();
      expect(length).toEqual(1);
    });
  });
});
