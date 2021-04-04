const faker = require("faker");
const amountIdentifiers = require("./utils/amountIdentifiers");
module.exports = async (
  rawMaterialsObject,
  [materialInstance, companyInstance, caInstance],
  [mainAccount, otherAccount, transportCompany, certificateAuthority]
) => {
  const rawMaterialsOtherAccount = rawMaterialsObject.filter((e) => e.account === otherAccount);

  for (let i = 0; i < rawMaterialsOtherAccount.length; i++) {
    const transport1 = [
      rawMaterialsOtherAccount[i].batchIds[0],
      rawMaterialsOtherAccount[i].batchIds[1],
    ];
    const transport2 = [rawMaterialsOtherAccount[i].batchIds[2]];
    const transports = [transport1, transport2];

    for (let j = 0; j < transports.length; j++) {
      console.log(
        `Transport with batches ${transports[j]} for ${rawMaterialsOtherAccount[i].name} sent from ${rawMaterialsOtherAccount[i].account} to ${mainAccount}`
      );
      const result = await companyInstance.methods
        .createTransport(mainAccount, transportCompany, transports[j])
        .send({ from: otherAccount, gas: 300000 });
      const transportId = result.events.TransportCreated.returnValues.transportId;
      await companyInstance.methods
        .setTransportStatus(transportId, 1)
        .send({ from: transportCompany, gas: 300000 });
      await companyInstance.methods
        .setTransportStatus(transportId, 2)
        .send({ from: transportCompany, gas: 300000 });
      await companyInstance.methods
        .setTransportStatus(transportId, 3)
        .send({ from: transportCompany, gas: 300000 });
      await companyInstance.methods
        .setTransportStatus(transportId, 4)
        .send({ from: transportCompany, gas: 300000 });
      await companyInstance.methods
        .finaliseTransport(transportId)
        .send({ from: mainAccount, gas: 300000 });
    }
  }
};
