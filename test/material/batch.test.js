const {
  getInstance,
  createMaterial: _createMaterial,
  createRawMaterial: _createRawMaterial,
  createBatch: _createBatch,
} = require('./utils');

contract('RawMaterial', (accounts) => {
  const [account, otherAccount] = accounts;
  const createMaterial = _createMaterial(account);
  const createRawMaterial = _createRawMaterial(account);
  const createBatch = _createBatch(account);
  beforeEach(async () => {
    const [rawMaterialInstance, companyInstance] = await getInstance();

    await companyInstance.methods.create('', 0).send({ from: account });
  });
  describe('create batch', () => {
    it('creates a new batch', async () => {
      const [rawMaterialInstance, companyInstance] = await getInstance();
      const materialTokenId = await createRawMaterial();
      await rawMaterialInstance.methods
        .mint(materialTokenId, 100)
        .send({ from: account, gas: 300000 });
      const batchId = await createBatch(123, materialTokenId, 90);
      // is numeric
      expect(typeof Number(batchId)).equal('number');
    });
    it('throws error if the address does not have enough materials', async () => {
      const [rawMaterialInstance, companyInstance] = await getInstance();
      const materialTokenId = await createRawMaterial();
      await rawMaterialInstance.methods
        .mint(materialTokenId, 100)
        .send({ from: account, gas: 300000 });
      const t = async () => {
        await createBatch(123, materialTokenId, 101);
      };
      try {
        await t();
      } catch (e) {
        expect(e).to.be.instanceOf(Error);
      }
    });
  });

  describe('burnBatchToken', () => {
    it('removes the specified amount from the batch', async () => {
      const [rawMaterialInstance, companyInstance] = await getInstance();
      const materialTokenId = await createRawMaterial();
      await rawMaterialInstance.methods
        .mint(materialTokenId, 100)
        .send({ from: account, gas: 300000 });
      const batchId = await createBatch(123, materialTokenId, 100);
      const burnResult = await rawMaterialInstance.methods
        .burnBatchToken(batchId, 10)
        .send({ from: account, gas: 300000 });
      const result = await rawMaterialInstance.methods.batch(batchId).call();
      expect(result.materialTokenId).equal(materialTokenId);
      expect(result.materialTokenAmount).equal('90');
    });
    it('throws error if the specified amount is bigger than the available amount', async () => {
      const [rawMaterialInstance, companyInstance] = await getInstance();
      const materialTokenId = await createRawMaterial();
      await rawMaterialInstance.methods
        .mint(materialTokenId, 100)
        .send({ from: account, gas: 300000 });
      const batchId = await createBatch(123, materialTokenId, 100);
      try {
        await rawMaterialInstance.methods
          .burnBatchToken(batchId, 101)
          .send({ from: account, gas: 300000 });
      } catch (e) {
        expect(e).to.be.instanceOf(Error);
      }
      const result = await rawMaterialInstance.methods.batch(batchId).call();
      expect(result.materialTokenId).equal(materialTokenId);
      expect(result.materialTokenAmount).equal('100');
    });
  });
});
