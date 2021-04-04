const Factory = artifacts.require("Factory");
const Material = artifacts.require("Material");
const Company = artifacts.require("Company");
const Aggregator = artifacts.require("Aggregator");
const CertificateAuthorityManager = artifacts.require("CertificateAuthorityManager");
const web3 = require("./web3");
const createCompanies = require("./createCompanies");
const createRawMaterials = require("./createRawMaterials");
const createBatches = require("./createBatches");
const createMaterials = require("./createMaterials");
const createCertificates = require("./createCertificates");
const createTransports = require("./createTransports");
module.exports = async function (callback) {
  try {
    const [
      mainAccount,
      otherAccount,
      transportCompany,
      certificateAuthority,
    ] = await web3.eth.getAccounts();
    const accounts = [mainAccount, otherAccount, transportCompany, certificateAuthority];
    console.log("Getting instances...");
    const factoryInstance = await Factory.deployed();
    console.log("here");
    const aggregatorAddress = await factoryInstance.contract.methods.aggregator().call();
    const aggregatorInstance = new web3.eth.Contract(Aggregator.abi, aggregatorAddress);
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
    const instances = [materialInstance, companyInstance, certificateAuthorityManagerInstance];
    console.log("Creating companies...");
    await createCompanies(instances, accounts);
    console.log("Creating raw materials...");
    const rawMaterialsObject = await createRawMaterials(instances, accounts);
    console.log("Creating batches...");
    const materialBatches = await createBatches(rawMaterialsObject, instances, accounts);
    console.log("Creating transports...");

    const materialTransports = await createTransports(rawMaterialsObject, instances, accounts);

    console.log("Creating materials...");
    const materialsObject = await createMaterials(rawMaterialsObject, instances, accounts);
    console.log("Creating certificates...");
    await createCertificates(materialsObject, rawMaterialsObject, instances, accounts);
  } catch (e) {
    console.log(e);
  }
  callback();
};
