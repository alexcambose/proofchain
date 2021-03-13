const {
  getInstance,
  createMaterial: _createMaterial,
  createRawMaterial: _createRawMaterial,
  createBatch: _createBatch,
  createCertificate: _createCertificate,
} = require("../utils");

contract("Material", (accounts) => {
  const [account, otherAccount] = accounts;
  const createMaterial = _createMaterial(account);
  const createRawMaterial = _createRawMaterial(account);
  const createBatch = _createBatch(account);
  const createCertificate = _createCertificate(account);
  before(async () => {
    const [materialInstance, companyInstance] = await getInstance();

    await companyInstance.methods.create("", 0).send({ from: account });
  });
  describe("assignCertificate", () => {
    it("throws error if payment is lower than minimum stake", async () => {
      const [materialInstance, , certificateAuthorityManagerInstance] = await getInstance();
      const materialTokenId = await createRawMaterial();
      const code = await createCertificate();
      try {
        await materialInstance.methods
          .assignCertificate(code, materialTokenId)
          .send({ from: account, gas: 300000 });
      } catch (e) {
        expect(e).to.be.instanceOf(Error);
      }
      const minimumStake = await certificateAuthorityManagerInstance.methods.minimumStake().call();
      await materialInstance.methods
        .assignCertificate(code, materialTokenId)
        .send({ from: account, gas: 300000, value: minimumStake });
    });
    it("assings a certificate to a product (only owner of the certificate)", async () => {
      const [
        materialInstance,
        companyInstance,
        certificateAuthorityManagerInstance,
      ] = await getInstance();
      const materialTokenId = await createRawMaterial();
      const code = await createCertificate("aa", 2);
      const minimumStake = await certificateAuthorityManagerInstance.methods.minimumStake().call();
      await materialInstance.methods
        .assignCertificate(code, materialTokenId)
        .send({ from: account, gas: 300000, value: minimumStake });
      try {
        await materialInstance.methods
          .assignCertificate(code, materialTokenId)
          .send({ from: otherAccount, gas: 300000, value: minimumStake });
      } catch (e) {
        expect(e).to.be.instanceOf(Error);
      }
      const result = await materialInstance.methods
        .getMaterialCertificate(materialTokenId, 0)
        .call();
      expect(result.code).equal("2");
    });
  });
  describe("cancelCertificate", () => {
    it("removes the certificate from the material", async () => {
      const [
        materialInstance,
        companyInstance,
        certificateAuthorityManagerInstance,
      ] = await getInstance();
      const materialTokenId = await createRawMaterial();
      const code = await createCertificate("aa", 3);
      const minimumStake = await certificateAuthorityManagerInstance.methods.minimumStake().call();
      const initialBalance = await web3.eth.getBalance(account);
      await materialInstance.methods
        .assignCertificate(code, materialTokenId)
        .send({ from: account, gas: 300000, value: minimumStake });
      // console.log(await web3.eth.getBalance(account));
      const r = await materialInstance.methods
        .revokeCertificate(code, materialTokenId)
        .send({ from: account, gas: 300000 });
      // console.log(r.events.T);
      // console.log(account, initialBalance, await web3.eth.getBalance(account));
    });
  });
  describe("revokeCertificate", () => {
    it("removes the certificate from the material", async () => {
      const [
        materialInstance,
        companyInstance,
        certificateAuthorityManagerInstance,
      ] = await getInstance();
      const materialTokenId = await createRawMaterial();
      const code = await createCertificate("aa", 4);
      const minimumStake = await certificateAuthorityManagerInstance.methods.minimumStake().call();
      const initialBalance = await web3.eth.getBalance(account);
      await materialInstance.methods
        .assignCertificate(code, materialTokenId)
        .send({ from: account, gas: 300000, value: minimumStake });
      // console.log(await web3.eth.getBalance(account));
      const r = await materialInstance.methods
        .revokeCertificate(code, materialTokenId)
        .send({ from: account, gas: 300000 });
      // console.log(r.events.T);
      // console.log(account, initialBalance, await web3.eth.getBalance(account));
    });
  });
});
