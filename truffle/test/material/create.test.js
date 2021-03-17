const {
  getInstance,
  createMaterial: _createMaterial,
  createRawMaterial: _createRawMaterial,
  createBatch: _createBatch,
} = require("../utils");

contract("RawMaterial", (accounts) => {
  const [account, otherAccount] = accounts;
  const createMaterial = _createMaterial(account);
  const createRawMaterial = _createRawMaterial(account);
  const createBatch = _createBatch(account);
  before(async () => {
    const [materialInstance, companyInstance] = await getInstance();

    await companyInstance.methods.create("", 0).send({ from: account });
  });
  describe("create material", () => {
    describe("raw material", () => {
      it("creates a new raw material", async () => {
        const [materialInstance, companyInstance] = await getInstance();
        const materialTokenId = await createRawMaterial();
        const result = await materialInstance.methods.materialToken(materialTokenId).call();
        expect(result.name).equal("Tomatoes");
      });
      it(`fails to create a new material if the sender doesn't have a company registered`, async () => {
        const [materialInstance] = await getInstance();

        const t = async () => {
          await materialInstance.methods
            .create("Tomatoes", "1823", ["0x28181"])
            .send({ from: otherAccount, gas: 400000 });
        };
        try {
          await t();
        } catch (e) {
          expect(e).to.be.instanceOf(Error);
        }
      });
    });
    describe("compound material", async () => {
      let materialTokenId1;
      let materialTokenId2;
      let uuidsMaterialTokenId1;
      let uuidsMaterialTokenId2;
      before(async () => {
        const [materialInstance, companyInstance] = await getInstance();
        // generate raw materials

        materialTokenId1 = await createRawMaterial("Material A");
        materialTokenId2 = await createRawMaterial("Material B");
        // mint raw materials
        const result1 = await materialInstance.methods
          .mint(materialTokenId1, 5)
          .send({ from: account, gas: 400000 });
        uuidsMaterialTokenId1 = result1.events.MaterialTransfer.map((e) => e.returnValues.uuid);
        const result2 = await materialInstance.methods
          .mint(materialTokenId2, 5)
          .send({ from: account, gas: 400000 });
        uuidsMaterialTokenId2 = result2.events.MaterialTransfer.map((e) => e.returnValues.uuid);
      });
      it("create a new material from existing raw  (simple operation)", async () => {
        const [materialInstance, companyInstance] = await getInstance();
        const materialTokenId3 = await createMaterial(
          "Salad",
          "1234",
          [""],
          [materialTokenId1, materialTokenId2],
          [2, 3]
        );
        // create batches
        const batchId1 = await createBatch(123, uuidsMaterialTokenId1);
        const batchId2 = await createBatch(123, uuidsMaterialTokenId2);
        await materialInstance.methods
          .mint(
            materialTokenId3,
            [batchId1, batchId2],
            [
              [uuidsMaterialTokenId1[0], uuidsMaterialTokenId1[1]],
              [uuidsMaterialTokenId2[0], uuidsMaterialTokenId2[1], uuidsMaterialTokenId2[2]],
            ]
          )
          .send({ from: account, gas: 500000 });
        const balance = await materialInstance.methods.getBalance(materialTokenId3, account).call();
        expect(balance).equal("1");
        const materials1 = await materialInstance.methods.getBatchMaterialsUuid(batchId1).call();
        const materials2 = await materialInstance.methods.getBatchMaterialsUuid(batchId2).call();
        expect(materials1.length).equal(
          [uuidsMaterialTokenId1[2], uuidsMaterialTokenId1[3], uuidsMaterialTokenId1[4]].length
        );
        expect(materials2.length).equal(
          [uuidsMaterialTokenId2[3], uuidsMaterialTokenId2[4]].length
        );
      });
      // it("create a new material from existing raw  (advanced operation)", async () => {
      //   const [materialInstance, companyInstance] = await getInstance();
      //   const materialTokenId3 = await createMaterial(
      //     "Salad",
      //     "1234",
      //     [""],
      //     [materialTokenId1, materialTokenId2],
      //     [2, 3]
      //   );
      //   // create batches
      //   const batchId11 = await createBatch(123, [uuidsMaterialTokenId1[0]]);
      //   const batchId12 = await createBatch(123, [
      //     uuidsMaterialTokenId1[1],
      //     uuidsMaterialTokenId1[2],
      //   ]);
      //   const batchId21 = await createBatch(123, [
      //     uuidsMaterialTokenId2[0],
      //     uuidsMaterialTokenId2[1],
      //   ]);
      //   const batchId22 = await createBatch(123, [
      //     uuidsMaterialTokenId2[2],
      //     uuidsMaterialTokenId2[3],
      //     uuidsMaterialTokenId2[4],
      //   ]);
      //   await materialInstance.methods
      //     .mint(
      //       materialTokenId3,
      //       [batchId11, batchId12, batchId21, , batchId22],
      //       [
      //         [uuidsMaterialTokenId1[0]],
      //         [uuidsMaterialTokenId2[0], uuidsMaterialTokenId2[1], uuidsMaterialTokenId2[2]],
      //       ]
      //     )
      //     .send({ from: account, gas: 400000 });
      //   const balance = await materialInstance.methods.getBalance(materialTokenId3, account).call();
      //   expect(balance).equal("1");
      //   const materials1 = await materialInstance.methods.getBatchMaterialsUuid(batchId1).call();
      //   const materials2 = await materialInstance.methods.getBatchMaterialsUuid(batchId2).call();
      //   expect(materials1).toEqual([""]);
      //   expect(materials2).toEqual([""]);
      // });
      //   it("throws error if specified batch balance is not available in the batch", async () => {
      //     const materialTokenId3 = await createMaterial(
      //       "Salad",
      //       "1234",
      //       [""],
      //       [materialTokenId1, materialTokenId2],
      //       [2, 3]
      //     );
      //     // create batches
      //     const batchId11 = await createBatch(123, materialTokenId1, 1);
      //     const batchId12 = await createBatch(123, materialTokenId1, 3);
      //     try {
      //       await materialInstance.methods
      //         .mint(materialTokenId3, 1, [batchId11, batchId21], [4, 6])
      //         .send({ from: account, gas: 400000 });
      //     } catch (e) {
      //       expect(e).to.be.instanceOf(Error);
      //     }
      //   });
    });
  });
});
