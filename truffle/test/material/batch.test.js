const {
  getInstance,
  createMaterial: _createMaterial,
  createRawMaterial: _createRawMaterial,
  createBatch: _createBatch,
  expectToThrow,
} = require("../utils");

contract("Material", (accounts) => {
  const [account, otherAccount] = accounts;
  const createMaterial = _createMaterial(account);
  const createRawMaterial = _createRawMaterial(account);
  const createBatch = _createBatch(account);
  before(async () => {
    const [materialInstance, companyInstance] = await getInstance();

    await companyInstance.methods.create("", 0).send({ from: account });
  });
  describe("create batch", () => {
    it("creates a new batch", async () => {
      const [materialInstance, companyInstance] = await getInstance();
      const materialTokenId = await createRawMaterial();
      const mintResult = await materialInstance.methods
        .mint(materialTokenId, 5)
        .send({ from: account, gas: 600000 });
      const batchId = await createBatch(
        123,
        mintResult.events.MaterialTransfer.map((e) => e.returnValues.uuid)
      );
      // is numeric
      expect(typeof Number(batchId)).equal("number");
      const newBalance = await materialInstance.methods.getBalance(materialTokenId, account).call();
      expect(newBalance).equal("0");
    });
    it("throws error if the address does not have enough materials", async () => {
      const [materialInstance, companyInstance] = await getInstance();
      const materialTokenId = await createRawMaterial();
      const mintResult = await materialInstance.methods
        .mint(materialTokenId, 1)
        .send({ from: account, gas: 400000 });
      const t = async () => {
        await createBatch(123, [1, 2, 3, 4]);
      };
      try {
        await t();
      } catch (e) {
        expect(e).to.be.instanceOf(Error);
      }
    });
  });

  describe("burnBatchToken", () => {
    it("removes the specified amount from the batch", async () => {
      const [materialInstance, companyInstance] = await getInstance();
      const materialTokenId = await createRawMaterial();
      const mintResult = await materialInstance.methods
        .mint(materialTokenId, 5)
        .send({ from: account, gas: 400000 });
      const uuids = mintResult.events.MaterialTransfer.map((e) => e.returnValues.uuid);
      const batchId = await createBatch(123, uuids);
      const burnResult = await materialInstance.methods
        .burnBatchToken(batchId, [uuids[0]])
        .send({ from: account, gas: 400000 });
      const result = await materialInstance.methods.getBatchMaterialsUuid(batchId).call();
      expect(result.length).equal(4);
    });
    it("throws error if the specified amount is bigger than the available amount", async () => {
      const [materialInstance, companyInstance] = await getInstance();
      const materialTokenId = await createRawMaterial();
      const mintResult = await materialInstance.methods
        .mint(materialTokenId, 5)
        .send({ from: account, gas: 400000 });
      const uuids = mintResult.events.MaterialTransfer.map((e) => e.returnValues.uuid);
      const batchId = await createBatch(123, uuids);
      expectToThrow(
        materialInstance.methods
          .burnBatchToken(batchId, [1, 2, 3, 4, 5, 6, 7])
          .send({ from: account, gas: 400000 })
      );
      const result = await materialInstance.methods.getBatchMaterialsUuid(batchId).call();
      expect(result.length).equal(5);
    });
    it("throws error if the specified material is not in the batch", async () => {
      const [materialInstance, companyInstance] = await getInstance();
      const materialTokenId = await createRawMaterial();
      const mintResult = await materialInstance.methods
        .mint(materialTokenId, 5)
        .send({ from: account, gas: 400000 });
      const uuids = mintResult.events.MaterialTransfer.map((e) => e.returnValues.uuid);
      const batchId = await createBatch(123, uuids);
      expectToThrow(
        materialInstance.methods.burnBatchToken(batchId, [7]).send({ from: account, gas: 400000 })
      );
    });
  });
  describe("changeBatchOwnershipBatch", () => {
    let batchId;
    beforeEach(async () => {
      const [materialInstance, companyInstance] = await getInstance();
      const materialTokenId = await createRawMaterial();
      const mintResult = await materialInstance.methods
        .mint(materialTokenId, 5)
        .send({ from: account, gas: 400000 });
      const uuids = mintResult.events.MaterialTransfer.map((e) => e.returnValues.uuid);
      batchId = await createBatch(123, uuids);
    });

    // describe("should change the batch ownership", () => {
    //   before(async () => {});
    //   it("should change the batch owner parameter", async () => {
    //     const [materialInstance, companyInstance] = await getInstance();
    //   });
    //   it("should change the addressBatches global mapping", async () => {
    //     const [materialInstance, companyInstance] = await getInstance();
    //   });
    // });
    it("should fail if called outside the company contract", async () => {
      const [materialInstance, companyInstance] = await getInstance();

      expectToThrow(
        materialInstance.methods
          .changeBatchOwnershipBatch([batchId], otherAccount, 0)
          .send({ from: account, gas: 400000 })
      );
    });
  });
  describe("destroyBatch", () => {
    let batchId, materialTokenId;

    before(async () => {
      const [materialInstance, companyInstance] = await getInstance();
      materialTokenId = await createRawMaterial();
      const mintResult = await materialInstance.methods
        .mint(materialTokenId, 5)
        .send({ from: account, gas: 400000 });
      const uuids = mintResult.events.MaterialTransfer.map((e) => e.returnValues.uuid);
      batchId = await createBatch(123, uuids);
    });
    it("adds the batch materials to balance", async () => {
      const [materialInstance, companyInstance] = await getInstance();

      const oldBalance = await materialInstance.methods.getBalance(materialTokenId, account).call();
      await materialInstance.methods.destroyBatch(batchId).send({ from: account, gas: 400000 });
      const newBalance = await materialInstance.methods.getBalance(materialTokenId, account).call();
      expect(newBalance - oldBalance).equal(5);
    });
  });
});
