const {
  getInstance,
  createMaterial: _createMaterial,
  createCompany: _createCompany,
  createRawMaterial: _createRawMaterial,
  createBatch: _createBatch,
  createCertificate: _createCertificate,
  expectToThrow,
} = require("../utils");

contract("Company", (accounts) => {
  const [account, otherAccount, tcAccount] = accounts;
  const createCompany = _createCompany(account);
  const createMaterial = _createMaterial(account);
  const createRawMaterial = _createRawMaterial(account);
  const createBatch = _createBatch(account);
  const createCertificate = _createCertificate(account);
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
      const code = await createRawMaterial();
      const result1 = await materialInstance.methods
        .mint(code, 5)
        .send({ from: account, gas: 400000 });
      uuidsMaterialTokenId1 = result1.events.MaterialTransfer.map((e) => e.returnValues.uuid);
      batchId = await createBatch(123, uuidsMaterialTokenId1);
      const result = await companyInstance.methods
        .initiateTransport(otherAccount, tcAccount, [batchId])
        .send({ from: account, gas: 300000 });
      const transport = result.events.TransportInitiated.returnValues;
      transportId = transport.transportId;
    });
    describe("initiateTransport", () => {
      it("creates a new transport", async () => {
        const [
          materialInstance,
          companyInstance,
          certificateAuthorityManagerInstance,
        ] = await getInstance();
        const code = await createRawMaterial();
        const result1 = await materialInstance.methods
          .mint(code, 5)
          .send({ from: account, gas: 400000 });
        uuidsMaterialTokenId1 = result1.events.MaterialTransfer.map((e) => e.returnValues.uuid);
        const batchId = await createBatch(123, uuidsMaterialTokenId1);
        const result = await companyInstance.methods
          .initiateTransport(otherAccount, tcAccount, [batchId])
          .send({ from: account, gas: 300000 });
        const transport = result.events.TransportInitiated.returnValues;
        expect(Number.isInteger(parseInt(transport.transportId))).equal(true);
      });
      it("can not initiate if you are not the owner of the batch ids", async () => {
        const [
          materialInstance,
          companyInstance,
          certificateAuthorityManagerInstance,
        ] = await getInstance();
        const code = await createRawMaterial();
        const result1 = await materialInstance.methods
          .mint(code, 5)
          .send({ from: account, gas: 400000 });
        uuidsMaterialTokenId1 = result1.events.MaterialTransfer.map((e) => e.returnValues.uuid);
        const batchId = await createBatch(123, uuidsMaterialTokenId1);
        try {
          await companyInstance.methods
            .initiateTransport(otherAccount, tcAccount, [batchId])
            .send({ from: otherAccount, gas: 300000 });
        } catch (e) {
          expect(e).to.be.instanceOf(Error);
        }
      });
    });

    describe("getTransportBatchids", () => {
      it("returns the batch ids of a transport", async () => {
        const [
          materialInstance,
          companyInstance,
          certificateAuthorityManagerInstance,
        ] = await getInstance();
        const code = await createRawMaterial();
        const result1 = await materialInstance.methods
          .mint(code, 5)
          .send({ from: account, gas: 400000 });
        uuidsMaterialTokenId1 = result1.events.MaterialTransfer.map((e) => e.returnValues.uuid);
        const batchId = await createBatch(123, uuidsMaterialTokenId1);
        const result = await companyInstance.methods
          .initiateTransport(otherAccount, tcAccount, [batchId])
          .send({ from: account, gas: 300000 });
        const transportId = result.events.TransportInitiated.returnValues.transportId;
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
      it("sets a transport as finalised", async () => {
        const [
          materialInstance,
          companyInstance,
          certificateAuthorityManagerInstance,
        ] = await getInstance();
        await companyInstance.methods
          .finaliseTransport(transportId)
          .send({ from: otherAccount, gas: 300000 });
        const value = await companyInstance.methods.transports(transportId).call();
        expect(value.status).equal("3");
      });
      it("changes the owner of the batches", async () => {
        const [
          materialInstance,
          companyInstance,
          certificateAuthorityManagerInstance,
        ] = await getInstance();
        const { owner } = await materialInstance.methods.batch(batchId).call();
        const result = await companyInstance.methods
          .initiateTransport(account, tcAccount, [batchId])
          .send({ from: otherAccount, gas: 300000 });
        const transport = result.events.TransportInitiated.returnValues;
        let transportId = transport.transportId;
        await companyInstance.methods
          .finaliseTransport(transportId)
          .send({ from: account, gas: 300000 });
        const { owner: newOwner } = await materialInstance.methods.batch(batchId).call();
        expect(owner).not.equal(newOwner);
      });
      it("only works for the receiver", async () => {
        const [
          materialInstance,
          companyInstance,
          certificateAuthorityManagerInstance,
        ] = await getInstance();
        try {
          await companyInstance.methods
            .finaliseTransport(transportId)
            .send({ from: tcAccount, gas: 300000 });
        } catch (e) {
          expect(e).to.be.instanceOf(Error);
        }
      });
      it("uses a password if it was set", async () => {
        const [
          materialInstance,
          companyInstance,
          certificateAuthorityManagerInstance,
        ] = await getInstance();
        const code = await createRawMaterial();
        const result1 = await materialInstance.methods
          .mint(code, 5)
          .send({ from: account, gas: 400000 });
        uuidsMaterialTokenId1 = result1.events.MaterialTransfer.map((e) => e.returnValues.uuid);
        const batchId = await createBatch(123, uuidsMaterialTokenId1);
        const result = await companyInstance.methods
          .initiateTransport(otherAccount, tcAccount, [batchId], web3.utils.keccak256("password"))
          .send({ from: account, gas: 300000 });
        const transport = result.events.TransportInitiated.returnValues;
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
          .finaliseTransport(transportId, web3.utils.keccak256("password"))
          .send({ from: otherAccount, gas: 300000 });
        value = await companyInstance.methods.transports(transportId).call();
        expect(value.status).equal("3");
      });
    });
  });
});
