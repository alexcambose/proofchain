// const Company = artifacts.require('Company');
const Factory = artifacts.require('Factory');

module.exports = function (deployer) {
  // deployer.deploy(Company);
  deployer.deploy(Factory);
};
