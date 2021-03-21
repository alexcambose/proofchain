const faker = require("faker");
const amountIdentifiers = require("./utils/amountIdentifiers");
module.exports = async (
  rawMaterialsObject,
  [materialInstance, companyInstance, caInstance],
  [mainAccount, otherAccount, transportCompany, certificateAuthority]
) => {
  let createdMaterialsBatches = {};
  for (let materialTokenId in rawMaterialsObject) {
    const [uuid1, uuid2, uuid3] = rawMaterialsObject[materialTokenId];
    const result1 = await materialInstance.methods
      .createBatch(faker.random.word() + faker.random.number(1000), [uuid1, uuid2])
      .send({ from: mainAccount, gas: 400000 });
    const result2 = await materialInstance.methods
      .createBatch(faker.random.word() + faker.random.number(1000), [uuid3])
      .send({ from: mainAccount, gas: 400000 });
    createdMaterialsBatches[materialTokenId] = [];
    createdMaterialsBatches[materialTokenId].push(result1.events.BatchCreate.returnValues.batchId);
    createdMaterialsBatches[materialTokenId].push(result2.events.BatchCreate.returnValues.batchId);
  }
  return createdMaterialsBatches;
};
