const {
  getInstance,
  createMaterial: _createMaterial,
  createCompany: _createCompany,
  createRawMaterial: _createRawMaterial,
  createBatch: _createBatch,
  createCertificate: _createCertificate,
  createBatchWithMaterials: _createBatchWithMaterials,
  expectToThrow,
} = require("../utils");

contract("Company", (accounts) => {
  const [account, otherAccount, tcAccount] = accounts;
  const createCompany = _createCompany(account);
  const createMaterial = _createMaterial(account);
  const createRawMaterial = _createRawMaterial(account);
  const createBatch = _createBatch(account);
  const createCertificate = _createCertificate(account);
  const createBatchWithMaterials = _createBatchWithMaterials(account);
  describe("shipper", () => {
    let transportId, batchId;
    before(async () => {
      const [
        materialInstance,
        companyInstance,
        certificateAuthorityManagerInstance,
      ] = await getInstance();
      await createCompany();
      await companyInstance.methods.create("", 1).send({ from: tcAccount, gas: 300000 });
      batchId = await createBatchWithMaterials();

      const result = await companyInstance.methods
        .createTransport(otherAccount, tcAccount, [batchId])
        .send({ from: account, gas: 300000 });
      const transport = result.events.TransportCreated.returnValues;
      transportId = transport.transportId;
    });
    describe("createTransport", () => {
      let createTransportEvent, batchId;
      before(async () => {
        const [materialInstance, companyInstance] = await getInstance();
        batchId = await createBatchWithMaterials();

        const result = await companyInstance.methods
          .createTransport(otherAccount, tcAccount, [batchId])
          .send({ from: account, gas: 300000 });
        createTransportEvent = result.events.TransportCreated.returnValues;
      });
      describe("creates a new transport", () => {
        it("creates a new transport", async () => {
          expect(Number.isInteger(parseInt(createTransportEvent.transportId))).equal(true);
        });
        it("removes the batches from the user", async () => {
          const [materialInstance] = await getInstance();
          const hasBatch = await materialInstance.methods
            .getAddressBatches(account, batchId)
            .call();
          expect(hasBatch).equal(false);
        });
      });

      it("can not initiate if you are not the owner of the batch ids", async () => {
        const [
          materialInstance,
          companyInstance,
          certificateAuthorityManagerInstance,
        ] = await getInstance();

        expectToThrow(
          companyInstance.methods
            .createTransport(otherAccount, tcAccount, [batchId])
            .send({ from: otherAccount, gas: 300000 })
        );
      });
    });

    describe("getTransportBatchids", () => {
      it("returns the batch ids of a transport", async () => {
        const [
          materialInstance,
          companyInstance,
          certificateAuthorityManagerInstance,
        ] = await getInstance();
        batchId = await createBatchWithMaterials();

        const result = await companyInstance.methods
          .createTransport(otherAccount, tcAccount, [batchId])
          .send({ from: account, gas: 300000 });
        const transportId = result.events.TransportCreated.returnValues.transportId;
        const fetchedTransportBatchids = await companyInstance.methods
          .getTransportBatchids(transportId)
          .call();
        expect(fetchedTransportBatchids.length).equal(1);
      });
    });
    describe("setTransit", () => {
      it("sets the transit value", async () => {
        const [
          materialInstance,
          companyInstance,
          certificateAuthorityManagerInstance,
        ] = await getInstance();
        const result = await companyInstance.methods
          .setTransportStatus(transportId, 2)
          .send({ from: tcAccount, gas: 300000 });
        const { transportId: sameId, status } = result.events.TransportStatus.returnValues;
        const value = await companyInstance.methods.transports(sameId).call();
        expect(value.status).equal(status);
      });
      it("the caller needs to be the transport company address", async () => {
        const [, companyInstance] = await getInstance();
        expectToThrow(
          companyInstance.methods
            .setTransportStatus(transportId, 2)
            .send({ from: otherAccount, gas: 300000 })
        );
      });
      it("only works for non finalised transports", async () => {
        const [, companyInstance] = await getInstance();
        await companyInstance.methods
          .finaliseTransport(transportId)
          .send({ from: otherAccount, gas: 300000 });
        expectToThrow(
          companyInstance.methods
            .setTransportStatus(transportId, 2)
            .send({ from: tcAccount, gas: 300000 })
        );
      });
    });
    describe("finaliseTransport", () => {
      let finaliseResult;
      before(async () => {
        const [, companyInstance] = await getInstance();
        finaliseResult = await companyInstance.methods
          .finaliseTransport(transportId)
          .send({ from: otherAccount, gas: 300000 });
      });
      it("sets a transport as finalised", async () => {
        const [, companyInstance] = await getInstance();
        const value = await companyInstance.methods.transports(transportId).call();
        expect(value.status).equal("5");
      });
      it("changes the owner of the batches", async () => {
        const [
          materialInstance,
          companyInstance,
          certificateAuthorityManagerInstance,
        ] = await getInstance();
        const batchId = await createBatchWithMaterials();
        const { owner } = await materialInstance.methods.batch(batchId).call();
        const accountHasBatchIdBefore = await materialInstance.methods
          .getAddressBatches(otherAccount, batchId)
          .call();
        const result = await companyInstance.methods
          .createTransport(otherAccount, tcAccount, [batchId])
          .send({ from: account, gas: 300000 });
        const transport = result.events.TransportCreated.returnValues;
        let transportId = transport.transportId;
        await companyInstance.methods
          .finaliseTransport(transportId)
          .send({ from: otherAccount, gas: 300000 });
        const accountHasBatchIdAfter = await materialInstance.methods
          .getAddressBatches(otherAccount, batchId)
          .call();

        const { owner: newOwner } = await materialInstance.methods.batch(batchId).call();
        expect(owner).equal(account);
        expect(newOwner).equal(otherAccount);
        expect(accountHasBatchIdBefore).equal(false);
        expect(accountHasBatchIdAfter).equal(true);
      });
      it("emits BatchTransfer events", () => {
        expect(typeof finaliseResult.events["0"]).equal("object");
      });
      it("only works for the receiver", async () => {
        const [
          materialInstance,
          companyInstance,
          certificateAuthorityManagerInstance,
        ] = await getInstance();
        expectToThrow(
          companyInstance.methods
            .finaliseTransport(transportId)
            .send({ from: tcAccount, gas: 300000 })
        );
      });
      it("uses a password if it was set", async () => {
        const [
          materialInstance,
          companyInstance,
          certificateAuthorityManagerInstance,
        ] = await getInstance();
        const batchId = await createBatchWithMaterials();
        const result = await companyInstance.methods
          .createTransport(otherAccount, tcAccount, [batchId], web3.utils.keccak256("password"))
          .send({ from: account, gas: 300000 });
        const transport = result.events.TransportCreated.returnValues;
        transportId = transport.transportId;
        try {
          await companyInstance.methods
            .finaliseTransport(transportId)
            .send({ from: otherAccount, gas: 300000 });
        } catch (e) {
          expect(e).to.be.instanceOf(Error);
        }
        let value = await companyInstance.methods.transports(transportId).call();
        expect(value.status).not.equal("false");
        await companyInstance.methods
          .finaliseTransport(transportId, "password")
          .send({ from: otherAccount, gas: 300000 });
        value = await companyInstance.methods.transports(transportId).call();
        expect(value.status).equal("5");
      });
    });
  });
});
