const faker = require("faker");
const amountIdentifiers = require("./utils/amountIdentifiers");
const createMaterial = async (materialInstance, materialObject) => {
  const result = await materialInstance.methods
    .create(
      materialObject.name,
      materialObject.code,
      materialObject.amountIdentifier,
      [],
      materialObject.recipeMaterialTokenId,
      materialObject.recipeMaterialAmount
    )
    .send({ from: materialObject.account, gas: 500000 });
  return result;
};
module.exports = async (
  rawMaterialsObject,
  [materialInstance, companyInstance, caInstance],
  [mainAccount, otherAccount, transportCompany, certificateAuthority]
) => {
  const materialsObjectBread = {
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
  };
  const createdBreadMaterial = await createMaterial(materialInstance, materialsObjectBread);

  console.log(`Created material: ${materialsObjectBread.name}`);
  const { materialTokenId } = createdBreadMaterial.events.MaterialCreate.returnValues;
  const mintResult = await materialInstance.methods
    .mint(materialTokenId, materialsObjectBread.batchesId, materialsObjectBread.batchMaterialsUuid)
    .send({ from: materialsObjectBread.account, gas: 1000000 });
  uuidsMaterialTokenId = mintResult.events.MaterialTransfer.uuid;
  materialsObjectBread.uuids = [uuidsMaterialTokenId];
  materialsObjectBread.materialTokenId = materialTokenId;
  console.log(`Minted 1 ${materialsObjectBread.name}!`);
  return [materialsObjectBread];
};
