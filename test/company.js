const Factory = artifacts.require('Factory');
const Company = artifacts.require('Company');

const getCompanyInstance = async () => {
  const instance = await Factory.deployed();
  const companyInstance = new web3.eth.Contract(
    Company.abi,
    await instance.contract.methods.companyContractAddress().call()
  );
  return companyInstance;
};

contract('Company', (accounts) => {
  const [account] = accounts;
  describe('createCompany', () => {
    it('creates a new company', async () => {
      const instance = await getCompanyInstance();
      await instance.methods.create('My Company', 0).send({ from: account });
      const result = await instance.methods.companies(account).call();
      expect(result.name).equal('My Company');
      expect(result.entityType).equal('0');
    });
  });
});
