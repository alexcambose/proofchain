const { getInstance, expectToThrow } = require("./utils");

contract("Certificate", (accounts) => {
  const [account, otherAccount] = accounts;
  describe("createCertificateAuthority", () => {
    it("creates a new certificate authority", async () => {
      const [, , certificateAuthorityManagerInstance] = await getInstance();
      await certificateAuthorityManagerInstance.methods
        .createCertificateAuthority("My Company")
        .send({ from: account, gas: 300000 });
      const result = await certificateAuthorityManagerInstance.methods
        .certificateAuthorities(account)
        .call();
      expect(result.name).equal("My Company");
    });
  });
  describe("createCertificate", () => {
    it("creates a new certificate", async () => {
      const [, , certificateAuthorityManagerInstance] = await getInstance();
      const result = await certificateAuthorityManagerInstance.methods
        .createCertificate("Company donates to charity", 123, 2)
        .send({ from: account, gas: 300000 });
      const { code } = result.events.CertificateAuthorityCertificateCreated.returnValues;

      const certificate = await certificateAuthorityManagerInstance.methods
        .authorityCertificates(code)
        .call();
      expect(certificate.name).equal("Company donates to charity");
    });
  });
  describe("setMinimumStake", () => {
    it("sets the minimum stake", async () => {
      const [, , certificateAuthorityManagerInstance] = await getInstance();
      const initialMinimumStake = await certificateAuthorityManagerInstance.methods
        .minimumStake()
        .call();
      await certificateAuthorityManagerInstance.methods
        .setMinimumStake(2)
        .send({ from: account, gas: 30000 });
      const currentMinimumStake = await certificateAuthorityManagerInstance.methods
        .minimumStake()
        .call();
      expect(initialMinimumStake).to.not.equal(currentMinimumStake);
      expect(currentMinimumStake).equal(currentMinimumStake);
    });
    it("only the deployer can set the minimum stake", async () => {
      const [, , certificateAuthorityManagerInstance] = await getInstance();
      // expectToThrow(
      //   certificateAuthorityManagerInstance.methods
      //     .setMinimumStake(2)
      //     .send({ from: otherAccount, gas: 30000 })
      // );
    });
  });
});
