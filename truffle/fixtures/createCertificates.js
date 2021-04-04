const faker = require("faker");
const Web3 = require("web3");
const amountIdentifiers = require("./utils/amountIdentifiers");
module.exports = async (
  rawMaterialsObject,
  materialsObject,
  [materialInstance, companyInstance, caInstance],
  [mainAccount, otherAccount, transportCompany, certificateAuthority]
) => {
  const certificates = [
    {
      title: "Protect animals",
      description:
        "The product was developed and manufactured in a way that does not harm or kill animals.",
      type: 2,
    },
    {
      title: "Natural packaging",
      description: `This product's packaging is capable of decomposing naturally (in a way that is not harmful to the environment) within 1 year or less. `,
      type: 2,
    },
  ];
  for (let i = 0; i < certificates.length; i++) {
    const result = await caInstance.methods
      .createCertificate(certificates[i].title, certificates[i].description, certificates[i].type)
      .send({ from: certificateAuthority, gas: 800000 });
    const code = result.events.CertificateAuthorityCertificateCreated.returnValues.code;

    console.log(rawMaterialsObject);
    for (let j = 0; j < rawMaterialsObject.length; j++) {
      console.log(
        `Assigned certificate ${code} to ${rawMaterialsObject[j].name} (${rawMaterialsObject[j].materialTokenId})`
      );
      await materialInstance.methods
        .assignCertificate(code, rawMaterialsObject[j].materialTokenId)
        .send({ from: certificateAuthority, gas: 800000, value: Web3.utils.toWei("2", "ether") });
    }
    console.log(materialsObject);
    for (let j = 0; j < materialsObject.length; j++) {
      console.log(
        `Assigned certificate ${code} to ${materialsObject[j].name} (${materialsObject[j].materialTokenId})`
      );
      await materialInstance.methods
        .assignCertificate(code, materialsObject[j].materialTokenId)
        .send({ from: certificateAuthority, gas: 800000, value: Web3.utils.toWei("2", "ether") });
    }
  }
};
