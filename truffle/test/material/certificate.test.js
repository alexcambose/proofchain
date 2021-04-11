const {
  getInstance,
  createMaterial: _createMaterial,
  createRawMaterial: _createRawMaterial,
  createBatch: _createBatch,
  createCertificate: _createCertificate,
  expectToThrow,
} = require("../utils");
const Web3 = require("web3");
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
        .getMaterialCertificateInstance(materialTokenId, code)
        .call();
      expect(result.code).equal(code);
    });
    it("cannot assign the same certificate twice", async () => {
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
          .send({ from: caAccount, gas: 300000, value: minimumStake })
      );
    });
  });
  describe("cancelCertificate", () => {
    let certificateCode, materialTokenId, initialBalance;
    beforeEach(async () => {
      const [
        materialInstance,
        companyInstance,
        certificateAuthorityManagerInstance,
      ] = await getInstance();
      initialBalance = await web3.eth.getBalance(account);
      materialTokenId = await createRawMaterial();
      certificateCode = await createCertificate("aa", 3);
      const minimumStake = await certificateAuthorityManagerInstance.methods.minimumStake().call();
      await materialInstance.methods
        .assignCertificate(certificateCode, materialTokenId)
        .send({ from: caAccount, gas: 300000, value: minimumStake });
    });
    it("removes the certificate from the material", async () => {
      const [
        materialInstance,
        companyInstance,
        certificateAuthorityManagerInstance,
      ] = await getInstance();
      await materialInstance.methods
        .cancelCertificate(certificateCode, materialTokenId)
        .send({ from: caAccount, gas: 300000 });
      const result = await materialInstance.methods
        .getMaterialCertificateInstance(materialTokenId, certificateCode)
        .call();
      expect(result.code).not.equal(certificateCode);
    });
    it("returns the balance to the sender", async () => {
      const [
        materialInstance,
        companyInstance,
        certificateAuthorityManagerInstance,
      ] = await getInstance();

      const r = await materialInstance.methods
        .cancelCertificate(certificateCode, materialTokenId)
        .send({ from: caAccount, gas: 300000 });
      const updatedBalance = await web3.eth.getBalance(account);

      expect(initialBalance - updatedBalance < Web3.utils.toWei("1", "ether")).equal(true);
    });
  });
  describe("revokeCertificate", () => {
    let certificateCode, materialTokenId, initialBalance;
    beforeEach(async () => {
      const [
        materialInstance,
        companyInstance,
        certificateAuthorityManagerInstance,
      ] = await getInstance();
      materialTokenId = await createRawMaterial();
      certificateCode = await createCertificate("aa", 4);
      const minimumStake = await certificateAuthorityManagerInstance.methods.minimumStake().call();
      await materialInstance.methods
        .assignCertificate(certificateCode, materialTokenId)
        .send({ from: caAccount, gas: 300000, value: minimumStake });
      initialBalance = await web3.eth.getBalance(account);
    });
    it("removes the certificate from the material", async () => {
      const [materialInstance] = await getInstance();
      await materialInstance.methods
        .revokeCertificate(certificateCode, materialTokenId)
        .send({ from: account, gas: 300000 });
      const result = await materialInstance.methods
        .getMaterialCertificateInstance(materialTokenId, certificateCode)
        .call();
      expect(result.code).not.equal(certificateCode);
    });
    it("does not return the staked balance", async () => {
      const [materialInstance] = await getInstance();

      await materialInstance.methods
        .revokeCertificate(certificateCode, materialTokenId)
        .send({ from: account, gas: 300000 });
      const updatedBalance = await web3.eth.getBalance(account);
      expect(initialBalance - updatedBalance < Web3.utils.toWei("1", "ether")).equal(true);
    });
  });
});
