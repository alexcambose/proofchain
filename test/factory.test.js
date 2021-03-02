const Factory = artifacts.require('Factory');

contract('Factory', () => {
  describe('Constructor', () => {
    it('deploys a new Company contract', async () => {
      const instance = await Factory.deployed();

      const companyContractAddress = await instance.contract.methods
        .companyContractAddress()
        .call();

      expect(await web3.eth.getCode(companyContractAddress)).to.not.equal(
        companyContractAddress
      );
    });
    it('deploys a new Material contract', async () => {
      const instance = await Factory.deployed();

      const materialContractAddress = await instance.contract.methods
        .materialContractAddress()
        .call();
      expect(await web3.eth.getCode(materialContractAddress)).to.not.equal(
        materialContractAddress
      );
    });
  });
});
