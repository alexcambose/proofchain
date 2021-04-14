import { deployedFactoryAddress, provider } from '../provider';
import Proofchain from '../../src/Proofchain';
import { CompanyEntityTypeEnum } from '../../src/enums';
import Web3 from 'web3';

describe('Certificates', () => {
  let proofchain: Proofchain;
  let proofchainCA: Proofchain;
  let materialTokenId;
  let account: string;
  let caAccount: string;
  let otherAccount: string;
  beforeAll(async () => {
    const factoryContractAddress = await deployedFactoryAddress();
    // @ts-ignore
    [, , , , account, caAccount, otherAccount] = await new Web3(
      // @ts-ignore
      provider
    ).eth.getAccounts();
    proofchain = await Proofchain.providerInit({
      web3Provider: provider,
      factoryContractAddress,
      fromAddress: account,
    });
    proofchainCA = await Proofchain.providerInit({
      web3Provider: provider,
      factoryContractAddress,
      fromAddress: caAccount,
    });
    await proofchain.company.create({
      name: 'company',
      entityType: CompanyEntityTypeEnum.MANUFACTURER,
    });
    await proofchainCA.certificateAuthority.createCertificateAuthority({
      name: 'company',
    });
    //create material
    const createResult = await proofchain.material.create({
      name: 'product',
      code: '123',
      amountIdentifier: 'kg',
    });
    const materialTokenId = createResult.events.MaterialCreate.materialTokenId;
  });
  describe('create a new certificate authority', () => {
    it('creates a new certificate authority', async () => {
      const factoryContractAddress = await deployedFactoryAddress();
      const localProofcahin = await Proofchain.providerInit({
        web3Provider: provider,
        factoryContractAddress,
        fromAddress: otherAccount,
      });
      const result = await localProofcahin.certificateAuthority.createCertificateAuthority(
        {
          name: 'company',
        }
      );
      expect(result.events.CertificateAuthorityCreated.owner).toEqual(
        otherAccount
      );
    });
    it('fails to create if the address already has a certificate authority', async () => {
      const factoryContractAddress = await deployedFactoryAddress();
      const localProofcahin = await Proofchain.providerInit({
        web3Provider: provider,
        factoryContractAddress,
        fromAddress: otherAccount,
      });
      await localProofcahin.certificateAuthority.createCertificateAuthority({
        name: 'company',
      });
      await expect(
        localProofcahin.certificateAuthority.createCertificateAuthority({
          name: 'company',
        })
      ).rejects.toThrow();
    });
  });
  describe('create certificate', () => {
    it('creates a new certificate', async () => {
      const createResult = await proofchainCA.certificateAuthority
        .createCertificate({
          name: 'name',
          description: 'description',
          type: 2,
        })
        .send();

      const code =
        createResult.events.CertificateAuthorityCertificateCreated.code;
      expect(code).not.toEqual(undefined);
    });
    it('fails to create a certificate if the sender is not a certificate authority', async () => {
      await expect(
        proofchain.certificateAuthority.createCertificate({
          name: 'name',
          description: 'description',
          type: 2,
        })
      ).rejects.toThrow();
    });
  });
  describe('getByCode', () => {
    it('returns a certificate by a provided code', async () => {
      const createResult = await proofchainCA.certificateAuthority
        .createCertificate({
          name: 'name',
          description: 'description',
          type: 2,
        })
        .send();

      const code =
        createResult.events.CertificateAuthorityCertificateCreated.code;
      const fetchedCertificate = await proofchainCA.certificateAuthority.getByCode(
        code
      );
      expect(fetchedCertificate!.code).toEqual(code);
      expect(fetchedCertificate!.name).toEqual('name');
      expect(fetchedCertificate!.description).toEqual('description');
    });
    it('returns null if the certificate code does not exist', async () => {
      const fetchedCertificate = await proofchainCA.certificateAuthority.getByCode(
        123456
      );
      expect(fetchedCertificate).toBeNull();
    });
  });
  describe('getCertificateAutority', () => {
    it('returns a certificate autority by a provided address', async () => {
      const certificateAuthority = await proofchain.certificateAuthority.getCertificateAuthority(
        caAccount
      );
      expect(certificateAuthority!.owner).toEqual(caAccount);
    });
  });
  describe('allCertificateAutorities', () => {
    it('returns all certificate authorities created', async () => {
      const certificateAuthorities = await proofchain.certificateAuthority.allCertificateAutorities();
      expect(certificateAuthorities.length >= 1).toEqual(true);
    });
  });
  describe('hasCertificateAuthority', () => {
    it('returns true if an address is a certificate authority', async () => {
      const result = await proofchainCA.certificateAuthority.hasCertificateAuthority();
      expect(result).toBeTruthy();
    });
    it('returns false if an address does not have a certificate authority', async () => {
      const result = await proofchain.certificateAuthority.hasCertificateAuthority();
      expect(result).toBeFalsy();
    });
  });
  describe('certificates', () => {
    it('returns certificates of a certificate authority', async () => {
      const result = await proofchainCA.certificateAuthority.certificates();
      expect(result.length > 0).toBeTruthy();
    });
  });
  describe('minimumStake', () => {
    it('returns the minimum stake of the certificate', async () => {
      const result = await proofchainCA.certificateAuthority.minimumStake();
      expect(parseInt(result) > 0).toBeTruthy();
    });
  });
});
