const {
  getInstance,
  createMaterial: _createMaterial,
  createRawMaterial: _createRawMaterial,
  createBatch: _createBatch,
} = require("../utils");

contract("Material", (accounts) => {
  const [account, otherAccount] = accounts;
  const createMaterial = _createMaterial(account);
  const createRawMaterial = _createRawMaterial(account);
  // const createBatch = _createBatch(account);
  before(async () => {
    const [materialInstance, companyInstance] = await getInstance();

    await companyInstance.methods.create("", 0).send({ from: account });
  });

  describe("getBalance", () => {
    it("returns the balance of an address and a material token", async () => {
      const [materialInstance] = await getInstance();
      const materialTokenId = await createRawMaterial();
      await materialInstance.methods.mint(materialTokenId, 2).send({ from: account, gas: 300000 });
      const balance = await materialInstance.methods.getBalance(materialTokenId, account).call();
      expect(balance).equal("2");
    });
  });
  describe("mint", () => {
    it("mints a new raw material", async () => {
      const [materialInstance] = await getInstance();
      const materialTokenId = await createRawMaterial();
      await materialInstance.methods.mint(materialTokenId, 2).send({ from: account, gas: 300000 });
      const balance = await materialInstance.methods.getBalance(materialTokenId, account).call();
      expect(balance).equal("2");
    });
    it(`throws an error if the sender isn't the owner of the raw material`, async () => {
      const [materialInstance] = await getInstance();
      const materialTokenId = await createRawMaterial();

      const t = async () => {
        await materialInstance.methods
          .mint(materialTokenId, 2)
          .send({ from: otherAccount, gas: 300000 });
      };
      try {
        await t();
      } catch (e) {
        expect(e).to.be.instanceOf(Error);
      }
    });
  });
  describe("getMaterialRecipe", () => {
    it("returns the material recipe", async () => {
      const [materialInstance] = await getInstance();
      materialTokenId1 = await createRawMaterial("Material A");
      materialTokenId2 = await createRawMaterial("Material B");
      const materialTokenId = await createMaterial(
        "Salad",
        "1234",
        [""],
        [materialTokenId1, materialTokenId2],
        [2, 9]
      );

      const result = await materialInstance.methods.getMaterialRecipe(materialTokenId).call();
      expect(result["0"].length).equal(2);
      expect(result["1"].length).equal(2);
    });
  });
  describe("getMaterialImages", async () => {
    it("returns the material images", async () => {
      const [materialInstance] = await getInstance();
      const images = ["img1", "img2"];
      materialTokenId = await createRawMaterial("Material A", "321", images);
      const result = await materialInstance.methods.getMaterialImages(materialTokenId).call();
      expect(JSON.stringify(result)).equal(JSON.stringify(images));
    });
  });
});
