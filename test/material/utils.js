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
  const tokenId = await rawMaterialInstance.methods
    .create(title, code, images)
    .send({ from: account, gas: 300000 });
  const eventReturn = tokenId.events.MaterialCreate.returnValues;
  return eventReturn.materialTokenID;
};

const createMaterial = (account) => async (
  title = 'Tomatoes',
  code = 1234,
  images = ['abc'],
  recipeMaterialTokenId = [],
  recipeMaterialAmount = []
) => {
  const [rawMaterialInstance, companyInstance] = await getInstance();

  // create a company
  const tokenId = await rawMaterialInstance.methods
    .create(title, code, images, recipeMaterialTokenId, recipeMaterialAmount)
    .send({ from: account, gas: 300000 });
  const eventReturn = tokenId.events.MaterialCreate.returnValues;
  return eventReturn.materialTokenID;
};
const createBatch = (account) => async (
  code = 1234,
  tokenId = [],
  amount = []
) => {
  // const [rawMaterialInstance, companyInstance] = await getInstance();
  // // create a company
  // const tokenId = await rawMaterialInstance.methods
  //   .createBatch(code, tokenId, amount)
  //   .send({ from: account, gas: 300000 });
  // const eventReturn = tokenId.events.MaterialCreate.returnValues;
  // return eventReturn.materialTokenID;
};

module.exports = {
  createMaterial,
  createBatch,
  createRawMaterial,
  getInstance,
};
