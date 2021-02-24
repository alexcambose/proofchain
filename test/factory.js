const Factory = artifacts.require('Factory');

contract('Factory', () => {
  it('deploys a new Company contract', async () => {
    const instance = await Factory.deployed();

    const companyContractAddress = await instance.contract.methods
      .companyContractAddress()
      .call();

    expect(await web3.eth.getCode(companyContractAddress)).to.not.equal(
      companyContractAddress
    );
  });
  it('deploys a new RawMaterial contract', async () => {
    const instance = await Factory.deployed();

    const rawMaterialContractAddress = await instance.contract.methods
      .companyContractAddress()
      .call();
    expect(await web3.eth.getCode(rawMaterialContractAddress)).to.not.equal(
      rawMaterialContractAddress
    );
  });
});
