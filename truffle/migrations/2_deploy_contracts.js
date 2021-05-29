const Factory = artifacts.require("Factory");
const { parse, stringify } = require("envfile");
const fs = require("fs");
const CFonts = require("cfonts");
const filename = "../.env";
module.exports = async (deployer) => {
  await deployer.deploy(Factory, { gas: 8000000 });
  if (process.env.NETWORK_TYPE) {
    CFonts.say("Proofchain", {
      font: "tiny",
      align: "center",
      background: "blackBright",
      space: true,
      env: "node",
    });
    console.log("=========================");
    console.log("Writing to config file...");
    let dotenvContent = {};
    if (fs.existsSync(filename)) {
      dotenvContent = parse(fs.readFileSync(filename));
    }
    if (process.env.NETWORK_TYPE === "production") {
      dotenvContent["PRODUCTION_FACTORY_CONTRACT_ADDRESS"] = Factory.address;
    } else if (process.env.NETWORK_TYPE === "test") {
      dotenvContent["DEVELOPMENT_FACTORY_CONTRACT_ADDRESS"] = Factory.address;
    }
    fs.writeFileSync(filename, stringify(dotenvContent));
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
  }
};
