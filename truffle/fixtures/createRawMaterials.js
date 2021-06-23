const faker = require("faker");
const amountIdentifiers = require("./utils/amountIdentifiers");
module.exports = async (
  [materialInstance, companyInstance, caInstance],
  [mainAccount, otherAccount, transportCompany, certificateAuthority]
) => {
  // let createdRawMaterials = {};

  // for (let i = 0; i < 30; i++) {
  //   const name = faker.commerce.productMaterial();

  //   const result = await materialInstance.methods
  //     .create(
  //       name,
  //       faker.random.word() + "-" + faker.random.number(),
  //       amountIdentifiers[faker.random.number(amountIdentifiers.length - 1)],
  //       [""]
  //     )
  //     .send({ from: mainAccount, gas: 400000 });
  //   const { materialTokenId } = result.events.MaterialCreate.returnValues;
  //   const mintResult = await materialInstance.methods
  //     .mint(materialTokenId, 3 + faker.random.number(3))
  //     .send({ from: mainAccount, gas: 500000 });
  //   uuidsMaterialTokenId = mintResult.events.MaterialTransfer.map((e) => e.returnValues.uuid);
  //   console.log(`${i} - ${name} created. Uuids: ${uuidsMaterialTokenId}`);

  //   createdRawMaterials[materialTokenId] = uuidsMaterialTokenId;
  // }
  // return createdRawMaterials;

  const materials = [
    {
      name: "Wheat Grain",
      code: "2020",
      amountIdentifier: "kg",
      account: mainAccount,
    },
    {
      name: "Yeast",
      code: "L93J",
      amountIdentifier: "gram",
      account: mainAccount,
    },
    {
      name: "Salt",
      code: "v9z4",
      amountIdentifier: "gram",
      account: otherAccount,
    },
    {
      name: "Sugar",
      code: "xtg2",
      amountIdentifier: "kg",
      account: otherAccount,
    },
    {
      name: "Milk",
      code: "mtk2",
      amountIdentifier: "L",
      account: mainAccount,
    },
    {
      name: "Salt",
      code: "v324",
      amountIdentifier: "gram",
      account: mainAccount,
    },
  ].map((e) => ({ ...e, amount: 12, materialTokenId: null, uuids: [] }));
  for (let i = 0; i < materials.length; i++) {
    const { name, code, amountIdentifier, account, amount } = materials[i];
    const result = await materialInstance.methods
      .create(name, code, amountIdentifier, [])
      .send({ from: account, gas: 800000 });
    console.log(`Created raw material: ${name}`);
    const { materialTokenId } = result.events.MaterialCreate.returnValues;
    const mintResult = await materialInstance.methods
      .mint(materialTokenId, amount)
      .send({ from: account, gas: 1900000 });

    uuidsMaterialTokenId = mintResult.events.MaterialTransfer.map((e) => e.returnValues.uuid);
    console.log(`Minted ${amount} ${name}. Uuids: ${uuidsMaterialTokenId}`);

    materials[i].materialTokenId = materialTokenId;
    materials[i].uuids = uuidsMaterialTokenId;
  }
  return materials;
};
