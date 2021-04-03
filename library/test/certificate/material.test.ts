import { deployedFactoryAddress, provider } from '../provider';
import Proofchain from '../../src/index';
import CompanyEntityTypeEnum from '../../src/enums/CompanyEntityTypeEnum';
import Web3 from 'web3';
import { CERTIFICATE_ASSIGNMENT_TYPE } from '../../src/Material';

describe('certificate', () => {
  let proofchain: Proofchain;
  let proofchainCA: Proofchain;
  let account: string;
  let caAccount: string;
  let certificateCode1: number;
  let certificateCode2: number;
  let certificateCode3: number;
  let materialTokenId1: number;
  let certificateEvents: any = {};
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
        type: 2,
      }
    );
    certificateCode1 =
      createResult1.events.CertificateAuthorityCertificateCreated.code;
    // create a certificate: 2
    const createResult2 = await proofchainCA.certificateAuthority.createCertificate(
      {
        name: 'name',
        description: 'description',
        type: 2,
      }
    );
    certificateCode2 =
      createResult2.events.CertificateAuthorityCertificateCreated.code;
    const createResult3 = await proofchainCA.certificateAuthority.createCertificate(
      {
        name: 'name',
        description: 'description',
        type: 2,
      }
    );
    certificateCode3 =
      createResult3.events.CertificateAuthorityCertificateCreated.code;
    certificateEvents[certificateCode1] = [];
    certificateEvents[certificateCode2] = [];
    // create a material
    const materialCreateResult1 = await proofchain.material.create({
      name: 'product',
      code: '123',
      amountIdentifier: 'kg',
    });
    materialTokenId1 =
      materialCreateResult1.events.MaterialCreate.materialTokenId;
    // temporary methods for easier visibility
    const assignCertificate = async (
      certificateCode: number,
      materialTokenId: number
    ) =>
      certificateEvents[certificateCode].push({
        type: CERTIFICATE_ASSIGNMENT_TYPE.CREATE,
        event: (
          await proofchainCA.material.assignCertificate({
            certificateCode,
            materialTokenId,
            stake: Web3.utils.toWei('1', 'ether'),
          })
        ).events.AssignedCertificate,
      });

    const revokeCertificate = async (
      certificateCode: number,
      materialTokenId: number
    ) =>
      certificateEvents[certificateCode].push({
        type: CERTIFICATE_ASSIGNMENT_TYPE.REVOKE,
        event: (
          await proofchain.material.revokeCertificate({
            certificateCode,
            materialTokenId,
          })
        ).events.RevokedCertificate,
      });
    const cancelCertificate = async (
      certificateCode: number,
      materialTokenId: number
    ) =>
      certificateEvents[certificateCode].push({
        type: CERTIFICATE_ASSIGNMENT_TYPE.CANCEL,
        event: (
          await proofchainCA.material.cancelCertificate({
            certificateCode,
            materialTokenId,
          })
        ).events.CanceledCertificate,
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
    it('returns an object with all assign, cancel and revoke event in chronological order', async () => {
      const assignedMaterialsHistory = await proofchain.material.certificateAssignmentHistory(
        { materialTokenId: materialTokenId1 }
      );
      expect(assignedMaterialsHistory).toEqual(certificateEvents);
      // expect(assignedMaterialsHistory[0].materialTokenId).toEqual(materialTokenId1);
    });
    it('filters the history by materialTokenId and certificateCode', async () => {
      const assignedMaterialsHistory = await proofchain.material.certificateAssignmentHistory(
        { materialTokenId: materialTokenId1, certificateCode: certificateCode2 }
      );
      expect(Object.keys(assignedMaterialsHistory)).toEqual([certificateCode2]);
    });
    it('returns [] if there is not any history', async () => {
      const assignedMaterialsHistory = await proofchain.material.certificateAssignmentHistory(
        {
          materialTokenId: materialTokenId1,
          certificateCode: 99,
        }
      );
      expect(assignedMaterialsHistory).toEqual({});
    });
  });
  describe('getFromCertificate', () => {
    it('returns the assigned materials from a certificate', async () => {
      const assignedMaterials = await proofchain.material.getFromCertificate(
        certificateCode1
      );
      expect(assignedMaterials[0].assignEvent.materialTokenId).toEqual(
        materialTokenId1
      );
    });
    it('returns [] if there are no assigned materials to a certificate', async () => {
      const assignedMaterials = await proofchain.material.getFromCertificate(
        certificateCode3
      );
      expect(assignedMaterials).toEqual([]);
    });
  });
});
