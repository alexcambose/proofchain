const { getAggregatorInstance } = require("./utils");

contract("Aggregator", () => {
  it("contains Company contract address", async () => {
    const instance = await getAggregatorInstance();

    const companyContractAddress = await instance.methods.companyContractAddress().call();

    expect(await web3.eth.getCode(companyContractAddress)).to.not.equal(companyContractAddress);
  });
  it("contains Material contract address", async () => {
    const instance = await getAggregatorInstance();

    const materialContractAddress = await instance.methods.materialContractAddress().call();
    expect(await web3.eth.getCode(materialContractAddress)).to.not.equal(materialContractAddress);
  });
  it("contains CertificateeAuthorityManager contract address", async () => {
    const instance = await getAggregatorInstance();

    const certificateAuthorityManagerContractAddress = await instance.methods
      .certificateAuthorityManagerContractAddress()
      .call();
    expect(await web3.eth.getCode(certificateAuthorityManagerContractAddress)).to.not.equal(
      certificateAuthorityManagerContractAddress
    );
  });
});
