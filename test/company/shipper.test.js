const {
  getInstance,
  createMaterial: _createMaterial,
  createCompany: _createCompany,
  createRawMaterial: _createRawMaterial,
  createBatch: _createBatch,
  createCertificate: _createCertificate,
} = require('../utils');

contract('Company', (accounts) => {
  const [account, otherAccount, tcAccount] = accounts;
  const createCompany = _createCompany(account);
  const createMaterial = _createMaterial(account);
  const createRawMaterial = _createRawMaterial(account);
  const createBatch = _createBatch(account);
  const createCertificate = _createCertificate(account);
  describe('shipper', () => {
    let transportId, batchId;
    beforeEach(async () => {
      const [
        materialInstance,
        companyInstance,
        certificateAuthorityManagerInstance,
      ] = await getInstance();
      await createCompany();
      const code = await createRawMaterial();
      batchId = await createBatch(123, code, 0);
      const result = await companyInstance.methods
        .initiateTransport(otherAccount, tcAccount, [batchId])
        .send({ from: account, gas: 300000 });
      const transport = result.events.TransportInitiated.returnValues;
      transportId = transport._transportId;
    });
    describe('initiateTransport', () => {
      it('creates a new transport', async () => {
        const [
          materialInstance,
          companyInstance,
          certificateAuthorityManagerInstance,
        ] = await getInstance();
        await companyInstance.methods
          .create('', 1)
          .send({ from: tcAccount, gas: 300000 });
        const code = await createRawMaterial();
        const batchId = await createBatch(123, code, 0);
        const result = await companyInstance.methods
          .initiateTransport(otherAccount, tcAccount, [batchId])
          .send({ from: account, gas: 300000 });
        const transport = result.events.TransportInitiated.returnValues;
        expect(Number.isInteger(parseInt(transport._transportId))).equal(true);
      });
    });
    it('can not initiate if you are not the owner of the batch ids', async () => {
      const [
        materialInstance,
        companyInstance,
        certificateAuthorityManagerInstance,
      ] = await getInstance();
      await companyInstance.methods
        .create('', 1)
        .send({ from: tcAccount, gas: 300000 });
      const code = await createRawMaterial();
      const batchId = await createBatch(123, code, 0);
      try {
        await companyInstance.methods
          .initiateTransport(otherAccount, tcAccount, [batchId])
          .send({ from: otherAccount, gas: 300000 });
      } catch (e) {
        expect(e).to.be.instanceOf(Error);
      }
    });
    describe('setTransit', () => {
      it('sets the transit value', async () => {
        const [
          materialInstance,
          companyInstance,
          certificateAuthorityManagerInstance,
        ] = await getInstance();
        const result = await companyInstance.methods
          .setTransit(transportId, true)
          .send({ from: tcAccount, gas: 300000 });
        const {
          _transportId,
          _transitValue,
        } = result.events.TransportTransit.returnValues;
        const value = await companyInstance.methods
          .transports(_transportId)
          .call();
        expect(value.inTransit).equal(true);
      });
      it('the caller needs to be the transport company address', async () => {
        const [, companyInstance] = await getInstance();
        try {
          await companyInstance.methods
            .setTransit(transportId, true)
            .send({ from: otherAccount, gas: 300000 });
        } catch (e) {
          expect(e).to.be.instanceOf(Error);
        }
      });
      it('only works for non finalised transports', async () => {
        const [, companyInstance] = await getInstance();
        await companyInstance.methods
          .finaliseTransport(transportId)
          .send({ from: otherAccount, gas: 300000 });
        try {
          await companyInstance.methods
            .setTransit(transportId, true)
            .send({ from: tcAccount, gas: 300000 });
        } catch (e) {
          expect(e).to.be.instanceOf(Error);
        }
      });
    });
    describe('finaliseTransport', () => {
      it('sets a transport as finalised', async () => {
        const [
          materialInstance,
          companyInstance,
          certificateAuthorityManagerInstance,
        ] = await getInstance();
        await companyInstance.methods
          .finaliseTransport(transportId)
          .send({ from: otherAccount, gas: 300000 });
        const value = await companyInstance.methods
          .transports(transportId)
          .call();
        expect(value.finalised).equal(true);
      });
      it('changes the owner of the batches', async () => {
        const [
          materialInstance,
          companyInstance,
          certificateAuthorityManagerInstance,
        ] = await getInstance();
        const { owner } = await materialInstance.methods.batch(batchId).call();
        await companyInstance.methods
          .finaliseTransport(transportId)
          .send({ from: otherAccount, gas: 300000 });
        const { owner: newOwner } = await materialInstance.methods
          .batch(batchId)
          .call();
        expect(owner).not.equal(newOwner);
      });
      it('only works for the receiver', async () => {
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
      it('uses a password if it was set', async () => {
        const [
          materialInstance,
          companyInstance,
          certificateAuthorityManagerInstance,
        ] = await getInstance();
        await createCompany();
        const code = await createRawMaterial();
        const batchId = await createBatch(123, code, 0);
        const result = await companyInstance.methods
          .initiateTransport(
            otherAccount,
            tcAccount,
            [batchId],
            web3.utils.keccak256('password')
          )
          .send({ from: account, gas: 300000 });
        const transport = result.events.TransportInitiated.returnValues;
        transportId = transport._transportId;
        try {
          await companyInstance.methods
            .finaliseTransport(transportId)
            .send({ from: otherAccount, gas: 300000 });
        } catch (e) {
          expect(e).to.be.instanceOf(Error);
        }
        let value = await companyInstance.methods
          .transports(transportId)
          .call();
        expect(value.finalised).equal(false);
        await companyInstance.methods
          .finaliseTransport(transportId, web3.utils.keccak256('password'))
          .send({ from: otherAccount, gas: 300000 });
        value = await companyInstance.methods.transports(transportId).call();
        expect(value.finalised).equal(true);
      });
    });
  });
});
