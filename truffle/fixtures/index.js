const Factory = artifacts.require("Factory");
const Material = artifacts.require("Material");
const Company = artifacts.require("Company");
const Aggregator = artifacts.require("Aggregator");
const CertificateAuthorityManager = artifacts.require("CertificateAuthorityManager");
const web3 = require("./web3");
const createCompanies = require("./createCompanies");
const createRawMaterials = require("./createRawMaterials");
const createBatches = require("./createBatches");
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
    // await createCompanies(instances, accounts);
    console.log("Creating raw materials...");
    // const rawMaterialsObject = await createRawMaterials(instances, accounts);
    console.log("Creating batches...");
    // const materialBatches = await createBatches(rawMaterialsObject, instances, accounts);
    const materialBatches = {
      2: ["1", "2"],
      3: ["3", "4"],
      4: ["5", "6"],
      5: ["7", "8"],
      6: ["9", "10"],
      7: ["11", "12"],
      8: ["13", "14"],
      9: ["15", "16"],
      10: ["17", "18"],
      11: ["19", "20"],
      12: ["21", "22"],
      13: ["23", "24"],
      14: ["25", "26"],
      15: ["27", "28"],
      16: ["29", "30"],
      17: ["31", "32"],
      18: ["33", "34"],
      19: ["35", "36"],
      20: ["37", "38"],
      21: ["39", "40"],
      22: ["41", "42"],
      23: ["43", "44"],
      24: ["45", "46"],
      25: ["47", "48"],
      26: ["49", "50"],
      27: ["51", "52"],
      28: ["53", "54"],
      29: ["55", "56"],
      30: ["57", "58"],
      31: ["59", "60"],
    };
    console.log(materialBatches);
  } catch (e) {
    console.log(e);
  }
  callback();
};
