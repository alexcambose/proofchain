const faker = require("faker");
const amountIdentifiers = require("./utils/amountIdentifiers");
module.exports = async (
  rawMaterialsObject,
  [materialInstance, companyInstance, caInstance],
  [mainAccount, otherAccount, transportCompany, certificateAuthority]
) => {
  const materialsObject = [
    {
      name: "Bread",
      account: mainAccount,
      code: "Ju73",
      amountIdentifier: "100 grams",
      recipeMaterialTokenId: [
        rawMaterialsObject[0].materialTokenId,
        rawMaterialsObject[1].materialTokenId,
        rawMaterialsObject[2].materialTokenId,
        rawMaterialsObject[3].materialTokenId,
      ],
      recipeMaterialAmount: [1, 2, 5, 3],
      batchesId: [
        rawMaterialsObject[0].batchIds[0],
        //=
        rawMaterialsObject[1].batchIds[0],
        //=
        rawMaterialsObject[2].batchIds[0],
        rawMaterialsObject[2].batchIds[1],
        //=
        rawMaterialsObject[3].batchIds[0],
      ],
      batchMaterialsUuid: [
        // 1 required
        [rawMaterialsObject[0].uuids[0]],
        // 2 required
        [rawMaterialsObject[1].uuids[0], rawMaterialsObject[1].uuids[1]],
        // 5 required
        [
          rawMaterialsObject[2].uuids[0],
          rawMaterialsObject[2].uuids[1],
          rawMaterialsObject[2].uuids[2],
        ],
        [rawMaterialsObject[2].uuids[3], rawMaterialsObject[2].uuids[4]],
        // 3 required
        [
          rawMaterialsObject[3].uuids[0],
          rawMaterialsObject[3].uuids[1],
          rawMaterialsObject[3].uuids[2],
        ],
      ],
    },
  ];

  const result = await materialInstance.methods
    .create(
      materialsObject[0].name,
      materialsObject[0].code,
      materialsObject[0].amountIdentifier,
      [],
      materialsObject[0].recipeMaterialTokenId,
      materialsObject[0].recipeMaterialAmount
    )
    .send({ from: materialsObject[0].account, gas: 500000 });
  console.log(`Created material: ${materialsObject[0].name}`);
  const { materialTokenId } = result.events.MaterialCreate.returnValues;
  const mintResult = await materialInstance.methods
    .mint(materialTokenId, materialsObject[0].batchesId, materialsObject[0].batchMaterialsUuid)
    .send({ from: materialsObject[0].account, gas: 1000000 });
  console.log(`Minted 1 ${materialsObject[0].name}!`);
};
