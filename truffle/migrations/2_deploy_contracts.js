const Factory = artifacts.require("Factory");
const { parse, stringify } = require("envfile");
const fs = require("fs");
const CFonts = require("cfonts");
module.exports = async (deployer) => {
  await deployer.deploy(Factory, { gas: 7000000 });
  CFonts.say("Proofchain", {
    font: "tiny",
    align: "center",
    background: "blackBright",
    space: true,
    env: "node",
  });
  console.log("=========================");
  console.log("Writing to config file...");
  const dotenvContent = parse(fs.readFileSync("../.env"));
  if (process.env.NETWORK_TYPE === "production") {
    dotenvContent["PRODUCTION_FACTORY_CONTRACT_ADDRESS"] = Factory.address;
  } else {
    dotenvContent["DEVELOPMENT_FACTORY_CONTRACT_ADDRESS"] = Factory.address;
  }
  fs.writeFileSync("../.env", stringify(dotenvContent));
  console.log("Done");
  console.log("Contract address: ");
  CFonts.say(Factory.address, {
    font: "console",
    color: "green",
    align: "center",
    space: true,
    env: "node",
  });
  console.log("=========================");
};
