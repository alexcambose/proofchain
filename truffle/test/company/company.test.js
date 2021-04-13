const {
  getInstance,
  createMaterial: _createMaterial,
  createCompany: _createCompany,
  createRawMaterial: _createRawMaterial,
  createBatch: _createBatch,
  createCertificate: _createCertificate,
  expectToThrow,
} = require("../utils");

contract("Company", (accounts) => {
  const [account, caAccount] = accounts;
  const createCompany = _createCompany(account);
  const createMaterial = _createMaterial(account);
  const createRawMaterial = _createRawMaterial(account);
  const createBatch = _createBatch(account);
  const createCertificate = _createCertificate(caAccount);
  before(async () => {
    const [materialInstance, companyInstance, caInstance] = await getInstance();

    await caInstance.methods.createCertificateAuthority("").send({ from: caAccount });
  });

  describe("createCompany", () => {
    it("creates a new company", async () => {
      const [, companyInstance] = await getInstance();
      await createCompany("Company name");
      const result = await companyInstance.methods.companies(account).call();
      expect(result.name).equal("Company name");
      expect(result.entityType).equal("0");
    });
    it("throws erorr if there is already a company created", async () => {
      // const [, companyInstance] = await getInstance();
      expectToThrow(createCompany("Company name"));
    });
  });
  describe("assignCertificate", () => {
    it("throws error if payment is lower than minimum stake", async () => {
      const [
        materialInstance,
        companyInstance,
        certificateAuthorityManagerInstance,
      ] = await getInstance();

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
      const [
        materialInstance,
        companyInstance,
        certificateAuthorityManagerInstance,
      ] = await getInstance();

      const code = await createCertificate("aa", 2);
      const minimumStake = await certificateAuthorityManagerInstance.methods.minimumStake().call();
      await companyInstance.methods
        .assignCertificate(code, account)
        .send({ from: caAccount, gas: 300000, value: minimumStake });
      expectToThrow(
        companyInstance.methods
          .assignCertificate(code, account)
          .send({ from: account, gas: 300000, value: minimumStake })
      );

      // const result = await companyInstance.methods.getCompanyCertificate(account).call();
      // expect(result.code).equal(code);
    });
  });
  describe("cancelCertificate", () => {
    it("removes the certificate from the material", async () => {
      const [
        materialInstance,
        companyInstance,
        certificateAuthorityManagerInstance,
      ] = await getInstance();

      const code = await createCertificate("aa", 3);
      const minimumStake = await certificateAuthorityManagerInstance.methods.minimumStake().call();
      const initialBalance = await web3.eth.getBalance(account);
      await companyInstance.methods
        .assignCertificate(code, account)
        .send({ from: caAccount, gas: 300000, value: minimumStake });
      // console.log(await web3.eth.getBalance(account));
      const r = await companyInstance.methods
        .revokeCertificate(code, account)
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

      const code = await createCertificate("aa", 4);
      const minimumStake = await certificateAuthorityManagerInstance.methods.minimumStake().call();
      const initialBalance = await web3.eth.getBalance(account);
      await companyInstance.methods
        .assignCertificate(code, account)
        .send({ from: caAccount, gas: 300000, value: minimumStake });
      // console.log(await web3.eth.getBalance(account));
      const r = await companyInstance.methods
        .revokeCertificate(code, account)
        .send({ from: account, gas: 300000 });
      // console.log(r.events.T);
      // console.log(account, initialBalance, await web3.eth.getBalance(account));
    });
  });
});
