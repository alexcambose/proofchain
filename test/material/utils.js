const Factory = artifacts.require('Factory');
const Material = artifacts.require('Material');
const Company = artifacts.require('Company');

const getInstance = async () => {
  const instance = await Factory.deployed();
  const materialInstance = new web3.eth.Contract(
    Material.abi,
    await instance.contract.methods.materialContractAddress().call()
  );
  const companyInstance = new web3.eth.Contract(
    Company.abi,
    await instance.contract.methods.companyContractAddress().call()
  );
  return [materialInstance, companyInstance];
};
const createRawMaterial = (account) => async (
  title = 'Tomatoes',
  code = 1234,
  images = ['abc']
) => {
  const [materialInstance, companyInstance] = await getInstance();

  // create a company
  const result = await materialInstance.methods
    .create(title, code, images)
    .send({ from: account, gas: 300000 });
  const eventReturn = result.events.MaterialCreate.returnValues;
  return eventReturn.materialTokenId;
};

const createMaterial = (account) => async (
  title = 'Tomatoes',
  code = 1234,
  images = ['abc'],
  recipematerialTokenId = [],
  recipeMaterialAmount = []
) => {
  const [materialInstance, companyInstance] = await getInstance();

  const result = await materialInstance.methods
    .create(title, code, images, recipematerialTokenId, recipeMaterialAmount)
    .send({ from: account, gas: 300000 });
  const eventReturn = result.events.MaterialCreate.returnValues;
  return eventReturn.materialTokenId;
};
const createBatch = (account) => async (code, tokenId, amount) => {
  const [materialInstance, companyInstance] = await getInstance();
  const result = await materialInstance.methods
    .createBatch(code, tokenId, amount)
    .send({ from: account, gas: 300000 });
  const eventReturn = result.events.BatchCreate.returnValues;
  return eventReturn.batchId;
};

module.exports = {
  createMaterial,
  createBatch,
  createRawMaterial,
  getInstance,
};
