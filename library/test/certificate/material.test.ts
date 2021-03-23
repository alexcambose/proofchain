import { deployedFactoryAddress, provider } from '../provider';
import Proofchain from '../../src/index';
import CompanyEntityTypeEnum from '../../src/enums/CompanyEntityTypeEnum';
import Web3 from 'web3';

describe('certificate', () => {
  let proofchain: Proofchain;
  let proofchainCA: Proofchain;
  let account: string;
  let caAccount: string;
  let certificateCode1: number;
  let certificateCode2: number;
  let materialTokenId1: number;
  let materialTokenId2: number;
  beforeAll(async () => {
    const factoryContractAddress = await deployedFactoryAddress();
    // @ts-ignore
    [account, caAccount] = await new Web3(
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
    // ====
    // create a certificate: 1
    const createResult1 = await proofchainCA.certificateAuthority.createCertificate(
      {
        name: 'name',
        description: 'description',
      }
    );
    certificateCode1 =
      createResult1.events.CertificateAuthorityCertificateCreated.code;
    // create a certificate: 2
    const createResult2 = await proofchainCA.certificateAuthority.createCertificate(
      {
        name: 'name',
        description: 'description',
      }
    );
    certificateCode2 =
      createResult2.events.CertificateAuthorityCertificateCreated.code;
    // create a material
    const materialCreateResult1 = await proofchain.material.create({
      name: 'product',
      code: '123',
      amountIdentifier: 'kg',
    });
    materialTokenId1 =
      materialCreateResult1.events.MaterialCreate.materialTokenId;
    const materialCreateResult2 = await proofchain.material.create({
      name: 'product',
      code: '123',
      amountIdentifier: 'kg',
    });
    materialTokenId2 =
      materialCreateResult2.events.MaterialCreate.materialTokenId;
    // temporary methods for easier visibility
    const assignCertificate = async (
      certificateCode: number,
      materialTokenId: number
    ) => {
      await proofchainCA.material.assignCertificate({
        certificateCode,
        materialTokenId,
        stake: Web3.utils.toWei('1', 'ether'),
      });
    };
    const revokeCertificate = async (
      certificateCode: number,
      materialTokenId: number
    ) =>
      await proofchain.material.revokeCertificate({
        certificateCode,
        materialTokenId,
      });
    const cancelCertificate = async (
      certificateCode: number,
      materialTokenId: number
    ) =>
      await proofchainCA.material.cancelCertificate({
        certificateCode,
        materialTokenId,
      });
    await assignCertificate(certificateCode1, materialTokenId1);
    await revokeCertificate(certificateCode1, materialTokenId1);
    await assignCertificate(certificateCode1, materialTokenId1);
    await cancelCertificate(certificateCode1, materialTokenId1);
    await assignCertificate(certificateCode1, materialTokenId1);

    await assignCertificate(certificateCode2, materialTokenId1);
    await cancelCertificate(certificateCode2, materialTokenId1);
  });
  describe('assignmentHistory', () => {
    it('works', () => {});
  });
  describe('getFromCertificate', () => {
    it('returns the assigned materials from a certificate', async () => {
      const assignedMaterials = await proofchain.material.getFromCertificate(
        certificateCode1
      );
      expect(assignedMaterials[0].materialTokenId).toEqual(materialTokenId1);
    });
  });
});
