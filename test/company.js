const Factory = artifacts.require('Factory');
const Company = artifacts.require('Company');

const getInstance = async () => {
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
    it('deploys a new Company contract', async () => {
      const instance = await getInstance();
      await instance.methods
        .createCompany('My Company', 0)
        .send({ from: account });
      const result = await instance.methods.companies(account).call();
      expect(result._name).equal('My Company');
      expect(result._entityType).equal('0');
    });
  });
});
