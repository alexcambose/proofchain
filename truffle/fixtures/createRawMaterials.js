const faker = require("faker");
const amountIdentifiers = require("./utils/amountIdentifiers");
module.exports = async (
  [materialInstance, companyInstance, caInstance],
  [mainAccount, otherAccount, transportCompany, certificateAuthority]
) => {
  let createdRawMaterials = {};

  for (let i = 0; i < 30; i++) {
    const name = faker.commerce.productMaterial();

    const result = await materialInstance.methods
      .create(
        name,
        faker.random.word() + "-" + faker.random.number(),
        amountIdentifiers[faker.random.number(amountIdentifiers.length - 1)],
        [""]
      )
      .send({ from: mainAccount, gas: 400000 });
    const { materialTokenId } = result.events.MaterialCreate.returnValues;
    const mintResult = await materialInstance.methods
      .mint(materialTokenId, 3 + faker.random.number(3))
      .send({ from: mainAccount, gas: 500000 });
    uuidsMaterialTokenId = mintResult.events.MaterialTransfer.map((e) => e.returnValues.uuid);
    console.log(`${i} - ${name} created. Uuids: ${uuidsMaterialTokenId}`);

    createdRawMaterials[materialTokenId] = uuidsMaterialTokenId;
  }
  return createdRawMaterials;
};
