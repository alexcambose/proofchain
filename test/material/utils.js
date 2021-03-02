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
const createRawMaterial = (account) => async (
  title = 'Tomatoes',
  code = 1234,
  images = ['abc']
) => {
  const [rawMaterialInstance, companyInstance] = await getInstance();

  // create a company
  const result = await rawMaterialInstance.methods
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
  const [rawMaterialInstance, companyInstance] = await getInstance();

  const result = await rawMaterialInstance.methods
    .create(title, code, images, recipematerialTokenId, recipeMaterialAmount)
    .send({ from: account, gas: 300000 });
  const eventReturn = result.events.MaterialCreate.returnValues;
  return eventReturn.materialTokenId;
};
const createBatch = (account) => async (code, tokenId, amount) => {
  const [rawMaterialInstance, companyInstance] = await getInstance();
  const result = await rawMaterialInstance.methods
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
