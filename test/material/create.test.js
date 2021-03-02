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
  describe('create material', () => {
    describe('raw material', () => {
      it('creates a new raw material', async () => {
        const [rawMaterialInstance, companyInstance] = await getInstance();
        const materialTokenId = await createRawMaterial();
        const result = await rawMaterialInstance.methods
          .materialToken(materialTokenId)
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
    describe('compound material', async () => {
      let materialTokenId1;
      let materialTokenId2;
      beforeEach(async () => {
        const [rawMaterialInstance, companyInstance] = await getInstance();
        // generate raw materials

        materialTokenId1 = await createRawMaterial('Material A');
        materialTokenId2 = await createRawMaterial('Material B');
        // mint raw materials
        await rawMaterialInstance.methods
          .mint(materialTokenId1, 100)
          .send({ from: account, gas: 300000 });
        await rawMaterialInstance.methods
          .mint(materialTokenId2, 100)
          .send({ from: account, gas: 300000 });
      });
      it('create a new material from existing raw materials', async () => {
        const [rawMaterialInstance, companyInstance] = await getInstance();

        const materialTokenId3 = await createMaterial(
          'Salad',
          1234,
          [''],
          [materialTokenId1, materialTokenId2],
          [2, 9]
        );
        // create batches
        const batchId11 = await createBatch(123, materialTokenId1, 2);
        const batchId12 = await createBatch(123, materialTokenId1, 4);
        const batchId21 = await createBatch(123, materialTokenId2, 14);
        const batchId22 = await createBatch(123, materialTokenId2, 19);
        console.log(await rawMaterialInstance.methods.batch(batchId11).call());
        console.log(await rawMaterialInstance.methods.batch(batchId12).call());
        console.log(await rawMaterialInstance.methods.batch(batchId21).call());
        console.log(await rawMaterialInstance.methods.batch(batchId22).call());
        const mintResult = await rawMaterialInstance.methods
          .mint(
            materialTokenId3,
            2,
            [batchId11, batchId12, batchId21, batchId22],
            [1, 3, 13, 18]
          )
          .send({ from: account, gas: 300000 });

        const balance = await rawMaterialInstance.methods
          .getBalance(materialTokenId3, account)
          .call();
        expect(balance).equal('2');
        expect(
          (await rawMaterialInstance.methods.batch(batchId11).call())
            .materialTokenAmount
        ).expect('1');
        expect(
          (await rawMaterialInstance.methods.batch(batchId12).call())
            .materialTokenAmount
        ).expect('1');
        expect(
          (await rawMaterialInstance.methods.batch(batchId21).call())
            .materialTokenAmount
        ).expect('1');
        expect(
          (await rawMaterialInstance.methods.batch(batchId22).call())
            .materialTokenAmount
        ).expect('14');
        // mintResult.events.T.forEach((e) => console.log(e.returnValues));
      });
      it('throws error if specified batch balance is not available in the batch', async () => {
        const materialTokenId3 = await createMaterial(
          'Salad',
          1234,
          [''],
          [materialTokenId1, materialTokenId2],
          [2, 3]
        );
        // create batches
        const batchId11 = await createBatch(123, materialTokenId1, 1);
        const batchId12 = await createBatch(123, materialTokenId1, 3);
        try {
          await rawMaterialInstance.methods
            .mint(materialTokenId3, 1, [batchId11, batchId21], [4, 6])
            .send({ from: account, gas: 300000 });
        } catch (e) {
          expect(e).to.be.instanceOf(Error);
        }
      });
    });
  });
});
