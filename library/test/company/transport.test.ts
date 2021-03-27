import { deployedFactoryAddress, provider } from '../provider';
import Proofchain from '../../src/index';
import CompanyEntityTypeEnum from '../../src/enums/CompanyEntityTypeEnum';
import Web3 from 'web3';

describe('Company - transport', () => {
  let proofchain: Proofchain;
  let proofchainReceiver: Proofchain;
  let proofchainTc: Proofchain;
  let account: string, otherAccount: string, tcAccount: string;
  let batchId: number;
  let batchId2: number;
  beforeAll(async () => {
    const factoryContractAddress = await deployedFactoryAddress();
    // @ts-ignore
    const accounts = await new Web3(provider).eth.getAccounts();
    [, , , account, otherAccount, tcAccount] = accounts;
    proofchain = await Proofchain.providerInit({
      web3Provider: provider,
      factoryContractAddress,
      fromAddress: account,
    });
    await proofchain.company.create({
      name: 'company',
      entityType: CompanyEntityTypeEnum.MANUFACTURER,
    });
    proofchainReceiver = await Proofchain.providerInit({
      web3Provider: provider,
      factoryContractAddress,
      fromAddress: otherAccount,
    });
    await proofchainReceiver.company.create({
      name: 'company',
      entityType: CompanyEntityTypeEnum.MANUFACTURER,
    });
    proofchainTc = await Proofchain.providerInit({
      web3Provider: provider,
      factoryContractAddress,
      fromAddress: tcAccount,
    });
    await proofchainTc.company.create({
      name: 'company',
      entityType: CompanyEntityTypeEnum.LOGISTIC,
    });
    const createResult = await proofchain.material.create({
      name: 'product',
      code: '123',
      amountIdentifier: 'kg',
    });
    const materialTokenId = createResult.events.MaterialCreate.materialTokenId;
    const mintResult = await proofchain.material.mint({
      materialTokenId,
      amount: 5,
    });

    const materialsUuid = mintResult.events.MaterialTransfer.map((e) => e.uuid);
    const result1 = await proofchain.batch.create({
      materialsUuid: [materialsUuid[0]],
      code: '1',
    });
    batchId = result1.events.BatchCreate.batchId;
    const result2 = await proofchain.batch.create({
      materialsUuid: [materialsUuid[1]],
      code: '1',
    });
    batchId2 = result2.events.BatchCreate.batchId;
  });

  describe('initiateTransport', () => {
    describe('without password', () => {
      it('creates a new transport', async () => {
        const {
          events: {
            TransportInitiated: { transportId },
          },
        } = await proofchain.transport.initiate({
          receiver: otherAccount,
          transportCompany: tcAccount,
          batchIds: [batchId],
        });
        const fetchedTransport = await proofchain.transport.getById(
          transportId
        );
        expect(fetchedTransport.receiver).toEqual(otherAccount);
        expect(fetchedTransport.batchIds).toEqual([batchId]);
      });
    });
    describe('with password', () => {
      it('creates a new transport', async () => {
        const {
          events: {
            TransportInitiated: { transportId },
          },
        } = await proofchain.transport.initiate({
          receiver: otherAccount,
          transportCompany: tcAccount,
          batchIds: [batchId],
          hashedPassword: '123',
        });
        const fetchedTransport = await proofchain.transport.getById(
          transportId
        );
        expect(fetchedTransport.receiver).toEqual(otherAccount);
        expect(fetchedTransport.transportCompany).toEqual(tcAccount);
        expect(fetchedTransport.batchIds).toEqual([batchId]);
      });
    });
  });
  describe('setTransportStatus', () => {
    it('sets the status of a trasport', async () => {
      const {
        events: {
          TransportInitiated: { transportId },
        },
      } = await proofchain.transport.initiate({
        receiver: otherAccount,
        transportCompany: tcAccount,
        batchIds: [batchId],
      });
      await proofchainTc.transport.setTransportStatus({
        transportId,
        status: 2,
      });
      const fetchedTransport = await proofchain.transport.getById(transportId);
      expect(fetchedTransport.status).toEqual('2');
    });
    it('thows error if the caller is not the transport company', async () => {
      const {
        events: {
          TransportInitiated: { transportId },
        },
      } = await proofchain.transport.initiate({
        receiver: otherAccount,
        transportCompany: tcAccount,
        batchIds: [batchId],
      });
      await expect(
        proofchain.transport.setTransportStatus({ transportId, status: 2 })
      ).rejects.toThrow();
    });
  });
  describe('finaliseTransport', () => {
    it('sets the status of a transport as finalised', async () => {
      const {
        events: {
          TransportInitiated: { transportId },
        },
      } = await proofchain.transport.initiate({
        receiver: otherAccount,
        transportCompany: tcAccount,
        batchIds: [batchId],
      });
      await proofchainReceiver.transport.finaliseTransport({ transportId });
      const fetchedTransport = await proofchain.transport.getById(transportId);
      expect(fetchedTransport.status).toEqual('3');
    });
    it('only the receiver can finalise transport', async () => {
      const {
        events: {
          TransportInitiated: { transportId },
        },
      } = await proofchain.transport.initiate({
        receiver: otherAccount,
        transportCompany: tcAccount,
        batchIds: [batchId2],
      });

      await expect(
        proofchainTc.transport.finaliseTransport({ transportId })
      ).rejects.toThrow();
    });
  });
  describe('getById', () => {
    it('gets a transport by id', async () => {
      const {
        events: {
          TransportInitiated: { transportId },
        },
      } = await proofchain.transport.initiate({
        receiver: otherAccount,
        transportCompany: tcAccount,
        batchIds: [batchId2],
      });
      const fetchedTransport = await proofchain.transport.getById(transportId);
      expect(fetchedTransport.receiver).toEqual(otherAccount);
      expect(fetchedTransport.batchIds).toEqual([batchId2]);
    });
  });
  describe('all', () => {
    let accountBatchId: number;
    let otherAccountBatchId: number;
    beforeAll(async () => {
      // create a batch from otherAccount
      const createResult = await proofchainReceiver.material.create({
        name: 'product',
        code: '123',
        amountIdentifier: 'kg',
      });
      const mintResult = await proofchainReceiver.material.mint({
        materialTokenId: createResult.events.MaterialCreate.materialTokenId,
        amount: 5,
      });
      const materialsUuid = mintResult.events.MaterialTransfer.map(
        (e) => e.uuid
      );
      const result = await proofchainReceiver.batch.create({
        materialsUuid: [materialsUuid[1]],
        code: '1',
      });
      otherAccountBatchId = result.events.BatchCreate.batchId;
      //======
      const createResult1 = await proofchain.material.create({
        name: 'product',
        code: '123',
        amountIdentifier: 'kg',
      });
      const mintResult1 = await proofchain.material.mint({
        materialTokenId: createResult1.events.MaterialCreate.materialTokenId,
        amount: 5,
      });
      const materialsUuid1 = mintResult1.events.MaterialTransfer.map(
        (e) => e.uuid
      );
      const result1 = await proofchain.batch.create({
        materialsUuid: [materialsUuid1[1]],
        code: '1',
      });
      accountBatchId = result1.events.BatchCreate.batchId;

      await proofchain.transport.initiate({
        receiver: otherAccount,
        transportCompany: tcAccount,
        batchIds: [accountBatchId],
      });
      await proofchainReceiver.transport.initiate({
        receiver: account,
        transportCompany: tcAccount,
        batchIds: [otherAccountBatchId],
      });
    });
    it('returns all transports if no filters are provided', async () => {
      const transports = await proofchain.transport.all();
      expect(transports.length > 1).toBeTruthy();
    });
    it('filters the transports based on the sender', async () => {
      const transports = await proofchain.transport.all({
        sender: account,
      });
      expect(transports.map((e) => e.sender)).toEqual(
        Array(transports.length).fill(account)
      );
    });
    it('filters the transports based on the receiver', async () => {
      const transports = await proofchain.transport.all({
        receiver: account,
      });
      expect(transports.map((e) => e.receiver)).toEqual(
        Array(transports.length).fill(account)
      );
    });
    it('filters the transports based on the transport company', async () => {
      const transports = await proofchain.transport.all({
        transportCompany: tcAccount,
      });
      expect(transports.map((e) => e.transportCompany)).toEqual(
        Array(transports.length).fill(tcAccount)
      );
    });
  });
});
