const {
  getInstance,
  createMaterial: _createMaterial,
  createRawMaterial: _createRawMaterial,
  createBatch: _createBatch,
  createCertificate: _createCertificate,
  expectToThrow,
} = require("../utils");

contract("Material", (accounts) => {
  const [account, otherAccount, caAccount, otherCaAccount] = accounts;
  const createMaterial = _createMaterial(account);
  const createRawMaterial = _createRawMaterial(account);
  const createBatch = _createBatch(account);
  const createCertificate = _createCertificate(caAccount);
  before(async () => {
    const [materialInstance, companyInstance, caInstance] = await getInstance();

    await companyInstance.methods.create("", 0).send({ from: account });
    await caInstance.methods.createCertificateAuthority("").send({ from: caAccount });
    await caInstance.methods.createCertificateAuthority("").send({ from: otherCaAccount });
  });
  describe("assignCertificate", () => {
    it("throws error if payment is lower than minimum stake", async () => {
      const [materialInstance, , certificateAuthorityManagerInstance] = await getInstance();
      const materialTokenId = await createRawMaterial();
      const code = await createCertificate();
      expectToThrow(
        materialInstance.methods
          .assignCertificate(code, materialTokenId)
          .send({ from: caAccount, gas: 300000 })
      );

      const minimumStake = await certificateAuthorityManagerInstance.methods.minimumStake().call();
      await materialInstance.methods
        .assignCertificate(code, materialTokenId)
        .send({ from: caAccount, gas: 300000, value: minimumStake });
    });
    it("assings a certificate to a product (only owner of the certificate)", async () => {
      const [
        materialInstance,
        companyInstance,
        certificateAuthorityManagerInstance,
      ] = await getInstance();
      const materialTokenId = await createRawMaterial();
      const code = await createCertificate("aa", "desc");
      const minimumStake = await certificateAuthorityManagerInstance.methods.minimumStake().call();
      await materialInstance.methods
        .assignCertificate(code, materialTokenId)
        .send({ from: caAccount, gas: 300000, value: minimumStake });
      expectToThrow(
        materialInstance.methods
          .assignCertificate(code, materialTokenId)
          .send({ from: otherCaAccount, gas: 300000, value: minimumStake })
      );
      const result = await materialInstance.methods
        .getMaterialCertificate(materialTokenId, 0)
        .call();
      expect(result.code).equal("1");
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
        .send({ from: caAccount, gas: 300000, value: minimumStake });
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
        .send({ from: caAccount, gas: 300000, value: minimumStake });
      // console.log(await web3.eth.getBalance(account));
      const r = await materialInstance.methods
        .revokeCertificate(code, materialTokenId)
        .send({ from: account, gas: 300000 });
      // console.log(account, initialBalance, await web3.eth.getBalance(account));
    });
  });
});
