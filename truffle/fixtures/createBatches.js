const faker = require("faker");
const amountIdentifiers = require("./utils/amountIdentifiers");
module.exports = async (
  rawMaterialsObject,
  [materialInstance, companyInstance, caInstance],
  [mainAccount, otherAccount, transportCompany, certificateAuthority]
) => {
  // let createdMaterialsBatches = {};
  // for (let materialTokenId in rawMaterialsObject) {
  //   const [uuid1, uuid2, uuid3] = rawMaterialsObject[materialTokenId];
  //   const result1 = await materialInstance.methods
  //     .createBatch(faker.random.word() + faker.random.number(1000), [uuid1, uuid2])
  //     .send({ from: mainAccount, gas: 400000 });
  //   const result2 = await materialInstance.methods
  //     .createBatch(faker.random.word() + faker.random.number(1000), [uuid3])
  //     .send({ from: mainAccount, gas: 400000 });
  //   createdMaterialsBatches[materialTokenId] = [];
  //   createdMaterialsBatches[materialTokenId].push(result1.events.BatchCreate.returnValues.batchId);
  //   createdMaterialsBatches[materialTokenId].push(result2.events.BatchCreate.returnValues.batchId);
  // }
  // return createdMaterialsBatches;
  // flour
  for (let i = 0; i < rawMaterialsObject.length; i++) {
    const { uuids, account } = rawMaterialsObject[i];
    rawMaterialsObject[i].batchIds = [];
    let result;
    result = await materialInstance.methods
      .createBatch("LOT_N_" + faker.random.number(10000000), [uuids[0], uuids[1], uuids[2]])
      .send({ from: rawMaterialsObject[i].account, gas: 400000 });
    rawMaterialsObject[i].batchIds.push(result.events.BatchCreate.returnValues.batchId);
    result = await materialInstance.methods
      .createBatch("LOT_N_" + faker.random.number(10000000), [
        uuids[3],
        uuids[4],
        uuids[5],
        uuids[6],
      ])
      .send({ from: rawMaterialsObject[i].account, gas: 400000 });
    rawMaterialsObject[i].batchIds.push(result.events.BatchCreate.returnValues.batchId);
    result = await materialInstance.methods
      .createBatch("LOT_N_" + faker.random.number(10000000), [uuids[7], uuids[8], uuids[9]])
      .send({ from: rawMaterialsObject[i].account, gas: 400000 });
    rawMaterialsObject[i].batchIds.push(result.events.BatchCreate.returnValues.batchId);
  }
};
