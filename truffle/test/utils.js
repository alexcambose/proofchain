const Factory = artifacts.require("Factory");
const Material = artifacts.require("Material");
const Company = artifacts.require("Company");
const Aggregator = artifacts.require("Aggregator");
const CertificateAuthorityManager = artifacts.require("CertificateAuthorityManager");
const getAggregatorInstance = async () => {
  const instance = await Factory.deployed();
  const aggregatorAddress = await instance.contract.methods.aggregator().call();
  const aggregatorInstance = new web3.eth.Contract(Aggregator.abi, aggregatorAddress);
  return aggregatorInstance;
};
const getInstance = async () => {
  const aggregatorInstance = await getAggregatorInstance();
  const materialInstance = new web3.eth.Contract(
    Material.abi,
    await aggregatorInstance.methods.materialContractAddress().call()
  );
  const companyInstance = new web3.eth.Contract(
    Company.abi,
    await aggregatorInstance.methods.companyContractAddress().call()
  );
  const certificateAuthorityManagerInstance = new web3.eth.Contract(
    CertificateAuthorityManager.abi,
    await aggregatorInstance.methods.certificateAuthorityManagerContractAddress().call()
  );
  return [materialInstance, companyInstance, certificateAuthorityManagerInstance];
};
const createCompany = (account) => async (name = "Company name") => {
  const [, companyInstance] = await getInstance();

  // create a company
  const result = await companyInstance.methods.create(name, 0).send({ from: account, gas: 300000 });
  const eventReturn = result.events.CompanyCreate.returnValues;
  return eventReturn.owner;
};

const createRawMaterial = (account) => async (
  name = "Tomatoes",
  code = "1234",
  images = ["abc"]
) => {
  const [materialInstance] = await getInstance();
  // create a company
  const result = await materialInstance.methods
    .create(name, code, "", images)
    .send({ from: account, gas: 400000 });
  const eventReturn = result.events.MaterialCreate.returnValues;
  return eventReturn.materialTokenId;
};

const createMaterial = (account) => async (
  name = "Tomatoes",
  code = "1234",
  images = ["abc"],
  recipeMaterialTokenId = [],
  recipeMaterialAmount = []
) => {
  const [materialInstance] = await getInstance();
  const result = await materialInstance.methods
    .create(name, code, "", images, recipeMaterialTokenId, recipeMaterialAmount)
    .send({ from: account, gas: 500000 });
  const eventReturn = result.events.MaterialCreate.returnValues;
  return eventReturn.materialTokenId;
};
const createBatch = (account) => async (code, uuids) => {
  const [materialInstance] = await getInstance();
  const result = await materialInstance.methods
    .createBatch(code, uuids)
    .send({ from: account, gas: 400000 });
  const eventReturn = result.events.BatchCreate.returnValues;
  return eventReturn.batchId;
};
const createCertificate = (account) => async (name = "Company donates to charity", code = 123) => {
  const [materialInstance, , certificateAuthorityManagerInstance] = await getInstance();
  const result = await certificateAuthorityManagerInstance.methods
    .createCertificate(name, code, 2)
    .send({ from: account, gas: 300000 });
  return result.events.CertificateAuthorityCertificateCreated.returnValues.code;
};
const createBatchWithMaterials = (account) => async () => {
  const [materialInstance] = await getInstance();
  const code = await createRawMaterial(account)();
  const result1 = await materialInstance.methods.mint(code, 2).send({ from: account, gas: 400000 });
  uuidsMaterialTokenId1 = result1.events.MaterialTransfer.map((e) => e.returnValues.uuid);
  const batchId = await createBatch(account)(123, uuidsMaterialTokenId1);
  return batchId;
};
const expectToThrow = async (promise) => {
  let isOk = false;
  try {
    await promise;
  } catch (error) {
    isOk = error;
  }
  if (!isOk) {
    console.trace(isOk);
    throw new Error("Expected throw not received. ");
  }
};
module.exports = {
  createMaterial,
  createBatch,
  createRawMaterial,
  getInstance,
  getAggregatorInstance,
  createCertificate,
  createCompany,
  expectToThrow,
  createBatchWithMaterials,
};
