import Web3 from 'web3';
import Proofchain from '../../src';
import CompanyEntityTypeEnum from '../../src/enums/CompanyEntityTypeEnum';
import { deployedFactoryAddress, provider } from '../provider';

describe('material', () => {
  let proofchain: Proofchain;
  let proofchainCa: Proofchain;
  let account: string;
  let caAccount: string;

  let materialTokenId: number;
  beforeAll(async () => {
    // @ts-ignore
    [account, caAccount] = await new Web3(provider).eth.getAccounts();
    const factoryContractAddress = await deployedFactoryAddress();
    proofchain = await Proofchain.providerInit({
      web3Provider: provider,
      factoryContractAddress,
      fromAddress: account,
    });
    proofchainCa = await Proofchain.providerInit({
      web3Provider: provider,
      factoryContractAddress,
      fromAddress: caAccount,
    });
    await proofchain.company.create({
      name: 'company',
      entityType: CompanyEntityTypeEnum.MANUFACTURER,
    });
    await proofchainCa.certificateAuthority.createCertificateAuthority({
      name: 'certifcate authority',
    });

    const materialCreateResult = await proofchain.material.create({
      name: 'product',
      code: '123',
      amountIdentifier: 'kg',
    });
    materialTokenId =
      materialCreateResult.events.MaterialCreate.materialTokenId;
  });
  describe('certificate', () => {
    describe('assignCertificate', () => {
      it('assigns a certificate to a material', async () => {
        const certificateCreateResult = await proofchainCa.certificateAuthority.createCertificate(
          {
            name: 'certificate',
            description: 'description',
          }
        );
        const certificateCode =
          certificateCreateResult.events.CertificateAuthorityCertificateCreated
            .code;
        const result = await proofchainCa.material.assignCertificate({
          certificateCode,
          materialTokenId,
          stake: Web3.utils.toWei('2', 'ether'),
        });
        expect(result.events.AssignedCertificate.certificateAuthority).toEqual(
          caAccount
        );
        expect(result.events.AssignedCertificate.certificateCode).toEqual(
          certificateCode
        );
        expect(result.events.AssignedCertificate.materialTokenId).toEqual(
          materialTokenId
        );
      });
    });
    describe('cancelCertificate', () => {
      it('removes a certificate from a material', async () => {
        const certificateCreateResult = await proofchainCa.certificateAuthority.createCertificate(
          {
            name: 'certificate',
            description: 'description',
          }
        );
        const certificateCode =
          certificateCreateResult.events.CertificateAuthorityCertificateCreated
            .code;
        const result = await proofchainCa.material.cancelCertificate({
          certificateCode,
          materialTokenId,
        });
        expect(result.events.CanceledCertificate.certificateAuthority).toEqual(
          caAccount
        );
        expect(result.events.CanceledCertificate.certificateCode).toEqual(
          certificateCode
        );
        expect(result.events.CanceledCertificate.materialTokenId).toEqual(
          materialTokenId
        );
      });
    });
    describe('revokeCertificate', () => {
      it('assigns a certificate to a material', async () => {
        const certificateCreateResult = await proofchainCa.certificateAuthority.createCertificate(
          {
            name: 'certificate',
            description: 'description',
          }
        );
        const certificateCode =
          certificateCreateResult.events.CertificateAuthorityCertificateCreated
            .code;
        await proofchainCa.material.assignCertificate({
          certificateCode,
          materialTokenId,
          stake: Web3.utils.toWei('2', 'ether'),
        });
        const result = await proofchain.material.revokeCertificate({
          certificateCode,
          materialTokenId,
        });
        expect(result.events.RevokedCertificate.certificateAuthority).toEqual(
          account
        );
        expect(result.events.RevokedCertificate.certificateCode).toEqual(
          certificateCode
        );
        expect(result.events.RevokedCertificate.materialTokenId).toEqual(
          materialTokenId
        );
      });
    });
    describe('assigedCertificates', () => {
      it('returns the assigned certificates of a material token', async () => {
        const certificateCreateResult = await proofchainCa.certificateAuthority.createCertificate(
          {
            name: 'certificate',
            description: 'description',
          }
        );
        const certificateCode =
          certificateCreateResult.events.CertificateAuthorityCertificateCreated
            .code;
        await proofchainCa.material.assignCertificate({
          certificateCode,
          materialTokenId,
          stake: Web3.utils.toWei('2', 'ether'),
        });
        await proofchainCa.material.cancelCertificate({
          certificateCode,
          materialTokenId,
        });
        const certificateInstances = await proofchain.material.assigedCertificates(
          materialTokenId
        );
        expect(certificateInstances.length > 0).toEqual(true);
      });
    });
  });
  describe('getCertificateInstance', () => {
    it('retuns the assigned certificate instance', async () => {
      const certificateCreateResult = await proofchainCa.certificateAuthority.createCertificate(
        {
          name: 'certificate',
          description: 'description',
        }
      );
      const certificateCode =
        certificateCreateResult.events.CertificateAuthorityCertificateCreated
          .code;
      const result = await proofchainCa.material.assignCertificate({
        certificateCode,
        materialTokenId,
        stake: Web3.utils.toWei('2', 'ether'),
      });
      const certificateInstanceId =
        result.events.AssignedCertificate.certificateInstanceId;
      const fetchedCertificateInstance = await proofchain.material.getCertificateInstance(
        certificateInstanceId
      );
      expect(fetchedCertificateInstance.code).toEqual(certificateCode);
      expect(fetchedCertificateInstance.stake).toEqual(
        Web3.utils.toWei('2', 'ether')
      );
    });
  });
});
