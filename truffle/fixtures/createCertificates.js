const faker = require("faker");
const Web3 = require("web3");
const amountIdentifiers = require("./utils/amountIdentifiers");
module.exports = async (
  rawMaterialsObject,
  materialsObject,
  [materialInstance, companyInstance, caInstance],
  [mainAccount, otherAccount, transportCompany, certificateAuthority]
) => {
  const materialCertificates = [
    {
      title: "Protect animals",
      description:
        "The product was developed and manufactured in a way that does not harm or kill animals.",
      type: 4,
    },
    {
      title: "Natural packaging",
      description: `This product's packaging is capable of decomposing naturally (in a way that is not harmful to the environment) within 1 year or less. `,
      type: 1,
    },
  ];
  const companyCertificates = [
    {
      title: "Renewable Energy",
      description:
        "The energy used in production is from renewable sources (such as biomass, wind or solar power).",
      type: 0,
    },
    {
      title: "Reduced Material Waste",
      description: `The business has implemented measures to reduce pre and post consumer product waste. `,
      type: 0,
    },
    {
      title: "Donates to Charity ",
      description: `Provided monetary or in-kind donations to one or more non profits in the last year.`,
      type: 3,
    },
  ];
  for (let i = 0; i < materialCertificates.length; i++) {
    const result = await caInstance.methods
      .createCertificate(materialCertificates[i].title, materialCertificates[i].description, materialCertificates[i].type)
      .send({ from: certificateAuthority, gas: 800000 });
    const code = result.events.CertificateAuthorityCertificateCreated.returnValues.code;

    for (let j = 0; j < rawMaterialsObject.length; j++) {
      console.log(
        `Assigned certificate ${code} to raw material ${rawMaterialsObject[j].name} (${rawMaterialsObject[j].materialTokenId})`
      );
      await materialInstance.methods
        .assignCertificate(code, rawMaterialsObject[j].materialTokenId)
        .send({ from: certificateAuthority, gas: 800000, value: Web3.utils.toWei("2", "ether") });
    }
    for (let j = 0; j < materialsObject.length; j++) {
      console.log(
        `Assigned certificate ${code} to material ${materialsObject[j].name} (${materialsObject[j].materialTokenId})`
      );
      await materialInstance.methods
        .assignCertificate(code, materialsObject[j].materialTokenId)
        .send({ from: certificateAuthority, gas: 800000, value: Web3.utils.toWei("2", "ether") });
    }
  }
 for (let i = 0; i < companyCertificates.length; i++) {
    const result = await caInstance.methods
      .createCertificate(companyCertificates[i].title, companyCertificates[i].description, companyCertificates[i].type)
      .send({ from: certificateAuthority, gas: 800000 });
    const code = result.events.CertificateAuthorityCertificateCreated.returnValues.code;
    const companies = [mainAccount, otherAccount, transportCompany];
    for (let j = 0; j < companies.length; j++) {
      console.log(
        `Assigned certificate ${code} to company ${companies[j]}`
      );
      await companyInstance.methods
        .assignCertificate(code, companies[j])
        .send({ from: certificateAuthority, gas: 800000, value: Web3.utils.toWei("2", "ether") });
    }
  }
};
