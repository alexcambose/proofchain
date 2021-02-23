// const Company = artifacts.require('Company');
const RawMaterial = artifacts.require('RawMaterial');

module.exports = function (deployer) {
  // deployer.deploy(Company);
  deployer.deploy(RawMaterial);
};
