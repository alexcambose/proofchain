const Factory = artifacts.require('Factory');
const RawMaterial = artifacts.require('RawMaterial');
const Company = artifacts.require('Company');
const {
  getInstance,
  createMaterial: _createMaterial,
  createRawMaterial: _createRawMaterial,
} = require('./utils');

contract('RawMaterial', (accounts) => {
  const [account, otherAccount] = accounts;
  const createMaterial = _createMaterial(account);
  const createRawMaterial = _createRawMaterial(account);
  beforeEach(async () => {
    const [rawMaterialInstance, companyInstance] = await getInstance();

    await companyInstance.methods.create('', 0).send({ from: account });
  });
  describe('create', () => {
    describe('raw material', () => {
      it('creates a new raw material', async () => {
        const [rawMaterialInstance, companyInstance] = await getInstance();
        const materialTokenID = await createRawMaterial();
        const result = await rawMaterialInstance.methods
          .materialToken(materialTokenID)
          .call();
        expect(result.title).equal('Tomatoes');
      });
      it(`fails to create a new material if the sender doesn't have a company registered`, async () => {
        const [rawMaterialInstance] = await getInstance();

        const t = async () => {
          await rawMaterialInstance.methods
            .create('Tomatoes', 1823, ['0x28181'])
            .send({ from: otherAccount, gas: 300000 });
        };
        try {
          await t();
        } catch (e) {
          expect(e).to.be.instanceOf(Error);
        }
      });
    });
    describe('compound material', () => {
      it('create a new material from existing raw materials', async () => {
        const [rawMaterialInstance, companyInstance] = await getInstance();
        // generate raw materials
        const materialTokenID1 = await createRawMaterial();
        const materialTokenID2 = await createRawMaterial('Cucumbers', 1234);
        // mint raw materials
        await rawMaterialInstance.methods
          .mint(materialTokenID1, 100)
          .send({ from: account, gas: 300000 });
        await rawMaterialInstance.methods
          .mint(materialTokenID2, 100)
          .send({ from: account, gas: 300000 });
        const materialTokenID3 = await createMaterial(
          'Salad',
          1234,
          [''],
          [materialTokenID1, materialTokenID2],
          [12, 20]
        );
        console.log(materialTokenID3);
      });
    });
  });

  describe('getBalance', () => {
    it('returns the balance of an address and a material token', async () => {
      const [rawMaterialInstance] = await getInstance();
      const materialTokenID = await createRawMaterial();

      await rawMaterialInstance.methods
        .mint(materialTokenID, 100)
        .send({ from: account, gas: 300000 });
      const balance = await rawMaterialInstance.methods
        .getBalance(materialTokenID, account)
        .call();
      expect(balance).equal('100');
    });
  });
  describe('mint', () => {
    it('mints a new raw material', async () => {
      const [rawMaterialInstance] = await getInstance();
      const materialTokenID = await createRawMaterial();

      await rawMaterialInstance.methods
        .mint(materialTokenID, 100)
        .send({ from: account, gas: 300000 });
      const balance = await rawMaterialInstance.methods
        .getBalance(materialTokenID, account)
        .call();
      expect(balance).equal('100');
    });
    it(`throws an error if the sender isn't the owner of the raw material`, async () => {
      const [rawMaterialInstance] = await getInstance();
      const materialTokenID = await createRawMaterial();

      const t = async () => {
        await rawMaterialInstance.methods
          .mint(materialTokenID, 100)
          .send({ from: otherAccount, gas: 300000 });
      };
      try {
        await t();
      } catch (e) {
        expect(e).to.be.instanceOf(Error);
      }
    });
  });
});
