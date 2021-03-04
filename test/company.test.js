const Factory = artifacts.require('Factory');
const Company = artifacts.require('Company');
const { getInstance } = require('./utils');

contract('Company', (accounts) => {
  const [account] = accounts;
  describe('createCompany', () => {
    it('creates a new company', async () => {
      const [, companyInstance] = await getInstance();
      await companyInstance.methods
        .create('My Company', 0)
        .send({ from: account });
      const result = await companyInstance.methods.companies(account).call();
      expect(result.name).equal('My Company');
      expect(result.entityType).equal('0');
    });
  });
});
