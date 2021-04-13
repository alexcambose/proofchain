const {
  getInstance,
  createMaterial: _createMaterial,

  createBatch: _createBatch,
  createCertificate: _createCertificate,
  expectToThrow,
} = require("../utils");
const Web3 = require("web3");
contract("Company", (accounts) => {
  const [account, otherAccount, caAccount, otherCaAccount] = accounts;
  const createCertificate = _createCertificate(caAccount);
  before(async () => {
    const [, companyInstance, caInstance] = await getInstance();

    await companyInstance.methods.create("", 0).send({ from: account });
    await caInstance.methods.createCertificateAuthority("").send({ from: caAccount });
    await caInstance.methods.createCertificateAuthority("").send({ from: otherCaAccount });
  });
  describe("assignCertificate", () => {
    it("throws error if payment is lower than minimum stake", async () => {
      const [, companyInstance, certificateAuthorityManagerInstance] = await getInstance();
      const code = await createCertificate();

      expectToThrow(
        companyInstance.methods
          .assignCertificate(code, account)
          .send({ from: caAccount, gas: 300000 })
      );

      const minimumStake = await certificateAuthorityManagerInstance.methods.minimumStake().call();
      await companyInstance.methods
        .assignCertificate(code, account)
        .send({ from: caAccount, gas: 300000, value: minimumStake });
    });
    it("assings a certificate to a product (only owner of the certificate)", async () => {
      const [, companyInstance, certificateAuthorityManagerInstance] = await getInstance();
      const code = await createCertificate("aa", "desc");
      const minimumStake = await certificateAuthorityManagerInstance.methods.minimumStake().call();
      await companyInstance.methods
        .assignCertificate(code, account)
        .send({ from: caAccount, gas: 300000, value: minimumStake });
      await expectToThrow(
        companyInstance.methods
          .assignCertificate(code, account)
          .send({ from: otherCaAccount, gas: 300000, value: minimumStake })
      );
      const result = await companyInstance.methods
        .getCompanyCertificateInstance(account, code)
        .call();
      expect(result.code).equal(code);
    });
    it("cannot assign the same certificate twice", async () => {
      const [, companyInstance, certificateAuthorityManagerInstance] = await getInstance();

      const code = await createCertificate("aa", "desc");
      const minimumStake = await certificateAuthorityManagerInstance.methods.minimumStake().call();
      await companyInstance.methods
        .assignCertificate(code, account)
        .send({ from: caAccount, gas: 300000, value: minimumStake });
      await expectToThrow(
        companyInstance.methods
          .assignCertificate(code, account)
          .send({ from: caAccount, gas: 300000, value: minimumStake })
      );
    });
  });
  describe("cancelCertificate", () => {
    let certificateCode, initialBalance;
    beforeEach(async () => {
      const [, companyInstance, certificateAuthorityManagerInstance] = await getInstance();
      initialBalance = await web3.eth.getBalance(account);

      certificateCode = await createCertificate("aa", 3);
      const minimumStake = await certificateAuthorityManagerInstance.methods.minimumStake().call();
      await companyInstance.methods
        .assignCertificate(certificateCode, account)
        .send({ from: caAccount, gas: 300000, value: minimumStake });
    });
    it("removes the certificate from the material", async () => {
      const [, companyInstance, certificateAuthorityManagerInstance] = await getInstance();
      await companyInstance.methods
        .cancelCertificate(certificateCode, account)
        .send({ from: caAccount, gas: 300000 });
      const result = await companyInstance.methods
        .getCompanyCertificateInstance(account, certificateCode)
        .call();
      expect(result.code).not.equal(certificateCode);
    });
    it("returns the balance to the sender", async () => {
      const [, companyInstance, certificateAuthorityManagerInstance] = await getInstance();

      const r = await companyInstance.methods
        .cancelCertificate(certificateCode, account)
        .send({ from: caAccount, gas: 300000 });
      const updatedBalance = await web3.eth.getBalance(account);

      expect(initialBalance - updatedBalance < Web3.utils.toWei("1", "ether")).equal(true);
    });
  });
  describe("revokeCertificate", () => {
    let certificateCode, initialBalance;
    beforeEach(async () => {
      const [, companyInstance, certificateAuthorityManagerInstance] = await getInstance();
      certificateCode = await createCertificate("aa", 4);
      const minimumStake = await certificateAuthorityManagerInstance.methods.minimumStake().call();
      await companyInstance.methods
        .assignCertificate(certificateCode, account)
        .send({ from: caAccount, gas: 300000, value: minimumStake });
      initialBalance = await web3.eth.getBalance(account);
    });
    it("removes the certificate from the material", async () => {
      const [, companyInstance] = await getInstance();
      await companyInstance.methods
        .revokeCertificate(certificateCode, account)
        .send({ from: account, gas: 300000 });
      const result = await companyInstance.methods
        .getCompanyCertificateInstance(account, certificateCode)
        .call();
      expect(result.code).not.equal(certificateCode);
    });
    it("does not return the staked balance", async () => {
      const [, companyInstance] = await getInstance();

      await companyInstance.methods
        .revokeCertificate(certificateCode, account)
        .send({ from: account, gas: 300000 });
      const updatedBalance = await web3.eth.getBalance(account);
      expect(initialBalance - updatedBalance < Web3.utils.toWei("1", "ether")).equal(true);
    });
  });
});
