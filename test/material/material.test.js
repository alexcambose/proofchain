const {
  getInstance,
  createMaterial: _createMaterial,
  createRawMaterial: _createRawMaterial,
  createBatch: _createBatch,
} = require('../utils');

contract('Material', (accounts) => {
  const [account, otherAccount] = accounts;
  const createMaterial = _createMaterial(account);
  const createRawMaterial = _createRawMaterial(account);
  const createBatch = _createBatch(account);
  beforeEach(async () => {
    const [materialInstance, companyInstance] = await getInstance();

    await companyInstance.methods.create('', 0).send({ from: account });
  });

  describe('getBalance', () => {
    it('returns the balance of an address and a material token', async () => {
      const [materialInstance] = await getInstance();
      const materialTokenId = await createRawMaterial();

      await materialInstance.methods
        .mint(materialTokenId, 100)
        .send({ from: account, gas: 300000 });
      const balance = await materialInstance.methods
        .getBalance(materialTokenId, account)
        .call();
      expect(balance).equal('100');
    });
  });
  describe('mint', () => {
    it('mints a new raw material', async () => {
      const [materialInstance] = await getInstance();
      const materialTokenId = await createRawMaterial();

      await materialInstance.methods
        .mint(materialTokenId, 100)
        .send({ from: account, gas: 300000 });
      const balance = await materialInstance.methods
        .getBalance(materialTokenId, account)
        .call();
      expect(balance).equal('100');
    });
    it(`throws an error if the sender isn't the owner of the raw material`, async () => {
      const [materialInstance] = await getInstance();
      const materialTokenId = await createRawMaterial();

      const t = async () => {
        await materialInstance.methods
          .mint(materialTokenId, 100)
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
