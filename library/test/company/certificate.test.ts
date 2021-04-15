import Web3 from 'web3';
import Proofchain from '../../src/Proofchain';
import { CompanyEntityTypeEnum } from '../../src/enums';
import { deployedFactoryAddress, provider } from '../provider';

describe('company', () => {
  let proofchain: Proofchain;
  let proofchainCa: Proofchain;
  let account: string;
  let caAccount: string;
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
  });
  describe('certificate', () => {
    describe('assignCertificate', () => {
      it('assigns a certificate to a company', async () => {
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
        const result = await proofchainCa.company
          .assignCertificate({
            certificateCode,
            companyAddress: account,
            stake: Web3.utils.toWei('2', 'ether'),
          })
          .send();
        expect(
          result.events.CompanyAssignedCertificate.certificateAuthority
        ).toEqual(caAccount);
        expect(
          result.events.CompanyAssignedCertificate.certificateCode
        ).toEqual(certificateCode);
        expect(result.events.CompanyAssignedCertificate.companyAddress).toEqual(
          account
        );
      });
    });
    describe('cancelCertificate', () => {
      it('removes a certificate from a company', async () => {
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
        const result = await proofchainCa.company
          .cancelCertificate({
            certificateCode,
            companyAddress: account,
          })
          .send();
        expect(
          result.events.CompanyCanceledCertificate.certificateAuthority
        ).toEqual(caAccount);
        expect(
          result.events.CompanyCanceledCertificate.certificateCode
        ).toEqual(certificateCode);
        expect(result.events.CompanyCanceledCertificate.companyAddress).toEqual(
          account
        );
      });
    });
    describe('revokeCertificate', () => {
      it('assigns a certificate to a company', async () => {
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
        await proofchainCa.company
          .assignCertificate({
            certificateCode,
            companyAddress: account,
            stake: Web3.utils.toWei('2', 'ether'),
          })
          .send();
        const result = await proofchain.company
          .revokeCertificate({
            certificateCode,
            companyAddress: account,
          })
          .send();
        expect(
          result.events.CompanyRevokedCertificate.certificateAuthority
        ).toEqual(account);
        expect(result.events.CompanyRevokedCertificate.certificateCode).toEqual(
          certificateCode
        );
        expect(result.events.CompanyRevokedCertificate.companyAddress).toEqual(
          account
        );
      });
    });
    describe('assigedCertificates', () => {
      it('returns the assigned certificates from a comapany', async () => {
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
        await proofchainCa.company.assignCertificate({
          certificateCode,
          companyAddress: account,
          stake: Web3.utils.toWei('2', 'ether'),
        });
        await proofchainCa.company
          .cancelCertificate({
            certificateCode,
            companyAddress: account,
          })
          .send();
        const certificateInstances = await proofchain.company.assigedCertificates(
          account
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
      const result = await proofchainCa.company
        .assignCertificate({
          certificateCode,
          companyAddress: account,
          stake: Web3.utils.toWei('2', 'ether'),
        })
        .send();
      const certificateInstanceId =
        result.events.CompanyAssignedCertificate.certificateInstanceId;
      const fetchedCertificateInstance = await proofchain.company.getCertificateInstance(
        certificateInstanceId
      );
      expect(fetchedCertificateInstance.code).toEqual(certificateCode);
      expect(fetchedCertificateInstance.stake).toEqual(
        Web3.utils.toWei('2', 'ether')
      );
    });
  });
});
