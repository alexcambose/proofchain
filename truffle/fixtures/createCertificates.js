const faker = require("faker");
const amountIdentifiers = require("./utils/amountIdentifiers");
module.exports = async (
  rawMaterialsObject,
  [materialInstance, companyInstance, caInstance],
  [mainAccount, otherAccount, transportCompany, certificateAuthority]
) => {
  const certificates = [
    {
      name:
        "The product was developed and manufactured in a way that does not harm or kill animals. ",
    },
    {
      name: `This product's packaging is capable of decomposing naturally (in a way that is not harmful to the environment) within 1 year or less. `,
    },
  ];
};
