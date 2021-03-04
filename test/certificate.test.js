const { getInstance } = require('./utils');

contract('Certificate', (accounts) => {
  const [account, otherAccount] = accounts;
  describe('createCertificateAuthority', () => {
    it('creates a new certificate authority', async () => {
      const [, , certificateAuthorityManagerInstance] = await getInstance();
      await certificateAuthorityManagerInstance.methods
        .createCertificateAuthority('My Company')
        .send({ from: account, gas: 300000 });
      const result = await certificateAuthorityManagerInstance.methods
        .certificateAuthorities(account)
        .call();
      expect(result.name).equal('My Company');
    });
  });
  describe('createCertificate', () => {
    it('creates a new certificate', async () => {
      const [, , certificateAuthorityManagerInstance] = await getInstance();
      await certificateAuthorityManagerInstance.methods
        .createCertificate('Company donates to charity', 123)
        .send({ from: account, gas: 300000 });
      const result = await certificateAuthorityManagerInstance.methods
        .authorityCertificates(123)
        .call();
      expect(result.title).equal('Company donates to charity');
    });
    it('can not create a certificate with the same code', async () => {
      const [, , certificateAuthorityManagerInstance] = await getInstance();
      await certificateAuthorityManagerInstance.methods
        .createCertificate('Company donates to charity', 321)
        .send({ from: account, gas: 300000 });
      try {
        await certificateAuthorityManagerInstance.methods
          .createCertificate('Company donates to charity', 321)
          .send({ from: account, gas: 300000 });
      } catch (e) {
        expect(e).to.be.instanceOf(Error);
      }
    });
  });
  describe('setMinimumStake', () => {
    it('sets the minimum stake', async () => {
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
    it('only the deployer can set the minimum stake', async () => {
      const [, , certificateAuthorityManagerInstance] = await getInstance();
      try {
        await certificateAuthorityManagerInstance.methods
          .setMinimumStake(2)
          .send({ from: otherAccount, gas: 30000 });
      } catch (e) {
        expect(e).to.be.instanceOf(Error);
      }
    });
  });
});
