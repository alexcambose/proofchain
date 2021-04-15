import Web3 from 'web3';
import Proofchain from '../../src/Proofchain';
import { CompanyEntityTypeEnum } from '../../src/enums';
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
    await proofchain.company
      .create({
        name: 'company',
        entityType: CompanyEntityTypeEnum.MANUFACTURER,
      })
      .send();
    await proofchainCa.certificateAuthority
      .createCertificateAuthority({
        name: 'certifcate authority',
      })
      .send();

    const materialCreateResult = await proofchain.material
      .create({
        name: 'product',
        code: '123',
        amountIdentifier: 'kg',
      })
      .send();
    materialTokenId =
      materialCreateResult.events.MaterialCreate.materialTokenId;
  });
  describe('certificate', () => {
    describe('assignCertificate', () => {
      it('assigns a certificate to a material', async () => {
        const certificateCreateResult = await proofchainCa.certificateAuthority
          .createCertificate({
            name: 'certificate',
            description: 'description',
            type: 2,
          })
          .send();
        const certificateCode =
          certificateCreateResult.events.CertificateAuthorityCertificateCreated
            .code;
        const result = await proofchainCa.material
          .assignCertificate({
            certificateCode,
            materialTokenId,
            stake: Web3.utils.toWei('2', 'ether'),
          })
          .send();
        expect(
          result.events.MaterialAssignedCertificate.certificateAuthority
        ).toEqual(caAccount);
        expect(
          result.events.MaterialAssignedCertificate.certificateCode
        ).toEqual(certificateCode);
        expect(
          result.events.MaterialAssignedCertificate.materialTokenId
        ).toEqual(materialTokenId);
      });
    });
    describe('cancelCertificate', () => {
      it('removes a certificate from a material', async () => {
        const certificateCreateResult = await proofchainCa.certificateAuthority
          .createCertificate({
            name: 'certificate',
            description: 'description',
            type: 3,
          })
          .send();
        const certificateCode =
          certificateCreateResult.events.CertificateAuthorityCertificateCreated
            .code;
        const result = await proofchainCa.material
          .cancelCertificate({
            certificateCode,
            materialTokenId,
          })
          .send();
        expect(
          result.events.MaterialCanceledCertificate.certificateAuthority
        ).toEqual(caAccount);
        expect(
          result.events.MaterialCanceledCertificate.certificateCode
        ).toEqual(certificateCode);
        expect(
          result.events.MaterialCanceledCertificate.materialTokenId
        ).toEqual(materialTokenId);
      });
    });
    describe('revokeCertificate', () => {
      it('assigns a certificate to a material', async () => {
        const certificateCreateResult = await proofchainCa.certificateAuthority
          .createCertificate({
            name: 'certificate',
            description: 'description',
            type: 1,
          })
          .send();
        const certificateCode =
          certificateCreateResult.events.CertificateAuthorityCertificateCreated
            .code;
        await proofchainCa.material
          .assignCertificate({
            certificateCode,
            materialTokenId,
            stake: Web3.utils.toWei('2', 'ether'),
          })
          .send();
        const result = await proofchain.material
          .revokeCertificate({
            certificateCode,
            materialTokenId,
          })
          .send();
        expect(
          result.events.MaterialRevokedCertificate.certificateAuthority
        ).toEqual(account);
        expect(
          result.events.MaterialRevokedCertificate.certificateCode
        ).toEqual(certificateCode);
        expect(
          result.events.MaterialRevokedCertificate.materialTokenId
        ).toEqual(materialTokenId);
      });
    });
    describe('assigedCertificates', () => {
      it('returns the assigned certificates of a material token', async () => {
        const certificateCreateResult = await proofchainCa.certificateAuthority
          .createCertificate({
            name: 'certificate',
            description: 'description',
            type: 1,
          })
          .send();
        const certificateCode =
          certificateCreateResult.events.CertificateAuthorityCertificateCreated
            .code;
        await proofchainCa.material
          .assignCertificate({
            certificateCode,
            materialTokenId,
            stake: Web3.utils.toWei('2', 'ether'),
          })
          .send();
        await proofchainCa.material
          .cancelCertificate({
            certificateCode,
            materialTokenId,
          })
          .send();
        const certificateInstances = await proofchain.material.assigedCertificates(
          materialTokenId
        );
        expect(certificateInstances.length > 0).toEqual(true);
      });
    });
  });
  describe('getCertificateInstance', () => {
    it('retuns the assigned certificate instance', async () => {
      const certificateCreateResult = await proofchainCa.certificateAuthority
        .createCertificate({
          name: 'certificate',
          description: 'description',
          type: 2,
        })
        .send();
      const certificateCode =
        certificateCreateResult.events.CertificateAuthorityCertificateCreated
          .code;
      const result = await proofchainCa.material
        .assignCertificate({
          certificateCode,
          materialTokenId,
          stake: Web3.utils.toWei('2', 'ether'),
        })
        .send();
      const certificateInstanceId =
        result.events.MaterialAssignedCertificate.certificateInstanceId;
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
