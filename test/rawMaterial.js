const Factory = artifacts.require('Factory');
const RawMaterial = artifacts.require('RawMaterial');
const Company = artifacts.require('Company');

const getInstance = async () => {
  const instance = await Factory.deployed();
  const rawMaterialInstance = new web3.eth.Contract(
    RawMaterial.abi,
    await instance.contract.methods.rawMaterialContractAddress().call()
  );
  const companyInstance = new web3.eth.Contract(
    Company.abi,
    await instance.contract.methods.companyContractAddress().call()
  );
  return [rawMaterialInstance, companyInstance];
};

contract('RawMaterial', (accounts) => {
  const [account, otherAccount] = accounts;

  describe('createRawMaterial', () => {
    it('creates a new raw material', async () => {
      const [rawMaterialInstance, companyInstance] = await getInstance();
      await companyInstance.methods.create('', 0).send({ from: account });
      const tokenId = await rawMaterialInstance.methods
        .create('Tomatoes', 1823, ['0x28181'])
        .send({ from: account, gas: 300000 });
      const eventReturn = tokenId.events.RawMaterialCreate.returnValues;
      const result = await rawMaterialInstance.methods
        .materialToken(eventReturn.materialTokenID)
        .call();
      expect(result.title).equal('Tomatoes');
    });
    it(`fails to create a new material if the sender doesn't have a company registered`, async () => {
      const [rawMaterialInstance, companyInstance] = await getInstance();

      const t = async () => {
        await rawMaterialInstance.methods
          .create('Tomatoes', 1823, ['0x28181'])
          .send({ from: otherAccount, gas: 300000 });
      };
      try {
        await t();
      } catch (e) {
        expect(e).to.be.instanceOf(Error);
      }
    });
  });
});
