import { Base } from './Base';
import IEmittedEvent from './interface/IEmittedEvent';
import IEntity from './interface/IEntity';
import MinedTransaction from './MinedTransaction';
import { Transaction } from './Transaction';
import { EMPTY_ADDRESS } from './utils/eth';

export interface IMaterialTokenInfo {
  /**
   * Material tokend identificator. Unique for each material type
   */
  materialTokenId: number;
  /**
   * Material name
   */
  name: string;
  /**
   * Material code
   */
  code: string;
  /**
   * Material images array
   */
  images: string[];
  /**
   * Material creator address
   */
  creator: string;
  /**
   * Material amount identifier
   */
  amountIdentifier: string;
  /**
   * Material tokend ids for the recipe
   */
  recipeMaterialTokenId: number[];
  /**
   * Material amount for each recipe item
   */
  recipeMaterialAmount: number[];
}
export interface IMaterialInfo {
  /**
   * Material instance id that represents this instance
   */
  materialTokenId: number;
  /**
   * Material unique identifier
   */
  uuid: number;
  /**
   * Material created from batch id
   */
  fromBatchId: number[];
  /**
   * Each ingredients that created this material
   */
  batchMaterialsUuid: number[][];
  /**
   * Material mint event
   */
  mintEvent: MaterialCreateEvent;
}
export interface ICreateRawMaterial {
  name: string;
  code: string;
  amountIdentifier: string;
  images?: string[];
  recipeMaterialTokenId?: number[];
  recipeMaterialAmount?: number[];
}
export interface IMaterialTypeSelector {
  onlyRawMaterials?: boolean;
  onlyMaterials?: boolean;
}
export interface ICertificateInstance {
  code: number;
  stake: number;
}
export type MaterialCreateEvent = {
  company: string; // address
  materialTokenId: number;
  event: IEmittedEvent;
};
export type MaterialTransferEvent = {
  from: string;
  to: string;
  uuid: number;
  event: IEmittedEvent;
};
export type MaterialAssignedCertificateEvent = {
  certificateAuthority: string;
  certificateCode: number;
  materialTokenId: number;
  certificateInstanceId: number;
  event: IEmittedEvent;
};
export type MaterialCanceledCertificateEvent = {
  certificateAuthority: string;
  certificateCode: number;
  materialTokenId: number;
  certificateInstanceId: number;
  event: IEmittedEvent;
};
export type MaterialRevokedCertificateEvent = {
  certificateAuthority: string;
  certificateCode: number;
  materialTokenId: number;
  certificateInstanceId: number;
  event: IEmittedEvent;
};
export type CreateTransactionEvents = {
  MaterialCreate: MaterialCreateEvent;
};
export enum CERTIFICATE_ASSIGNMENT_TYPE {
  CREATE,
  CANCEL,
  REVOKE,
}
export interface ICertificateAssignmentHistory {
  [certificateCode: number]: {
    type: CERTIFICATE_ASSIGNMENT_TYPE;
    event:
      | MaterialAssignedCertificateEvent
      | MaterialCanceledCertificateEvent
      | MaterialRevokedCertificateEvent;
  }[];
}
/**
 * Material class
 */
export class Material extends Base implements IEntity {
  /**
   * Create a new material
   * @param options Material creation options
   * @param options.name Material name
   * @param options.code Material code
   * @param options.amountIdentifier Material instance amount identifier
   * @param options.images Material images array
   * @param options.recipeMaterialTokenId Material recipe token id
   * @param options.recipeMaterialAmount Material recipe token amount
   * @returns Create material event
   */
  create(options: ICreateRawMaterial): Transaction<CreateTransactionEvents> {
    const {
      name,
      code,
      amountIdentifier,
      images = [],
      recipeMaterialTokenId = [],
      recipeMaterialAmount = [],
    } = options;
    // check if the specified recipe ids exist
    // for (let id of recipeMaterialTokenId) {
    //   const material = await this.getById(id, false);
    //   if (!material) {
    //     throw new Error(`Material with id ${id} does not exist`);
    //   }
    // }
    if (recipeMaterialTokenId.length !== recipeMaterialAmount.length) {
      throw new Error(
        'recipeMaterialTokenId and recipeMaterialAmount are different lengths'
      );
    }
    let transaction;
    if (recipeMaterialAmount.length) {
      transaction = this.contract.methods.create(
        name,
        code,
        amountIdentifier,
        images,
        recipeMaterialTokenId,
        recipeMaterialAmount
      );
    } else {
      transaction = this.contract.methods.create(
        name,
        code,
        amountIdentifier,
        images
      );
    }

    return new Transaction<CreateTransactionEvents>(
      transaction,
      this.fromAddress
    );
  }
  /**
   * Get a material by its token id
   * @param materialTokenId Material token id
   * @param full Set to true it the resulting object should include recipe details
   * @returns Material token info
   */
  async getById(
    materialTokenId: string | number,
    full: boolean = true
  ): Promise<IMaterialTokenInfo | null> {
    const material: IMaterialTokenInfo = await this.contract.methods
      .materialToken(String(materialTokenId))
      .call();
    if (full) {
      const recipe = await this.contract.methods
        .getMaterialRecipe(materialTokenId)
        .call();
      material.recipeMaterialTokenId = recipe['0'];
      material.recipeMaterialAmount = recipe['1'];
    }
    if (material.creator === EMPTY_ADDRESS) return null;
    return material;
  }
  /**
   * Get all materials
   * @param options Filtering options
   * @param options.onlyRawMaterials - Set to true to include only raw materials
   * @param options.onlyMaterials - Set to true to include only compound materials
   * @returns Materials tokens info
   */
  async all(
    options: IMaterialTypeSelector = {}
  ): Promise<(IMaterialTokenInfo | null)[]> {
    const { onlyRawMaterials, onlyMaterials } = options;
    const createEvents = await this.getPastEvents<MaterialCreateEvent>(
      'MaterialCreate',
      { company: this.fromAddress }
    );
    let materials = [];
    for (let createEvent of createEvents) {
      const fetchedMaterial = await this.getById(createEvent.materialTokenId);
      if (
        onlyRawMaterials &&
        fetchedMaterial!.recipeMaterialTokenId.length > 0
      ) {
        continue;
      } else if (
        onlyMaterials &&
        fetchedMaterial!.recipeMaterialTokenId.length === 0
      ) {
        continue;
      } else {
        materials.push(fetchedMaterial);
      }
    }
    return materials;
  }
  /**
   * Count the number of materials
   * @param options Count options
   * @param options.onlyRawMaterials - Set to true to count only raw materials
   * @param options.onlyMaterials - Set to true to count only compound materials
   * @returns Number of materials
   */
  async countAll(options: IMaterialTypeSelector = {}): Promise<number> {
    const { onlyMaterials, onlyRawMaterials } = options;
    const createEvents = await this.getPastEvents<MaterialCreateEvent>(
      'MaterialCreate',
      { company: this.fromAddress }
    );
    return createEvents.length;
  }
  /**
   * Get the number of materials the account has
   * @param materialTokenId Material token id
   * @returns The balance of the materials that the "fromAddress" account has
   */
  async getBalance(materialTokenId: number): Promise<number> {
    const balance = await this.contract.methods
      .getBalance(materialTokenId, this.fromAddress)
      .call();
    return parseInt(balance);
  }
  /**
   * Create a new material instance.
   * @param options Minting options
   * @param options.materialTokenId Material token id to mint
   * @param options.amount Amount to mint
   * @param options.fromBatchId Recipe batch id
   * @param options.fromBatchMaterialsUuid Recipe amount from the corresponding batch id
   * @returns Mint event
   */
  async mint(options: {
    materialTokenId: number;
    amount?: number;
    fromBatchId?: number[];
    fromBatchMaterialsUuid?: number[][];
  }): Promise<Transaction<{ MaterialTransfer: MaterialTransferEvent[] }>> {
    const {
      materialTokenId,
      amount,
      fromBatchId,
      fromBatchMaterialsUuid,
    } = options;

    const material = await this.getById(materialTokenId);
    if (material?.creator.toLowerCase() !== this.fromAddress.toLowerCase()) {
      throw new Error('You are not the owner of this material');
    }
    const isRaw = material?.recipeMaterialAmount.length === 0;
    let transaction;

    if (isRaw) {
      transaction = await this.contract.methods.mint(materialTokenId, amount);
    } else {
      const estimatedGas = await this.contract.methods
        .mint(materialTokenId, fromBatchId, fromBatchMaterialsUuid)
        .estimateGas({ from: this.fromAddress });
      transaction = await this.contract.methods.mint(
        materialTokenId,
        fromBatchId,
        fromBatchMaterialsUuid
      );
    }
    return new Transaction<{ MaterialTransfer: MaterialTransferEvent[] }>(
      transaction,
      this.fromAddress
    );
  }
  /**
   * Get transfers
   * @param options Transfer filtering options
   * @param options.from Transfer sender account
   * @param options.to Transfer receiver account
   * @param options.materialTokenId Transfer material token id
   * @returns Transfer events
   */
  async getTransfers(options: {
    from?: string;
    to?: string;
    materialTokenId?: number;
  }): Promise<MaterialTransferEvent[]> {
    const { from, to, materialTokenId } = options;

    const transferEvents = await this.getPastEvents<MaterialTransferEvent>(
      'MaterialTransfer',
      { from, to, materialTokenId }
    );
    return transferEvents;
  }
  /**
   * Get owned material instances
   * @param materialTokenId Material token id
   * @returns Uuids
   */
  async getOwnedMaterialsUuid(
    materialTokenId: number
  ): Promise<IMaterialInfo[]> {
    const materialsUuid = await this.getOwnedMaterialsUuidCodes(
      materialTokenId
    );
    return Promise.all(
      materialsUuid.map(async (e) => this.getMaterialByUuid(e))
    );
  }
  /**
   * get the uuids of the owned material
   * @param materialTokenId Material token id
   * @returns Uuids
   */
  async getOwnedMaterialsUuidCodes(materialTokenId: number): Promise<number[]> {
    const materialsUuid: number[] = await this.contract.methods
      .getOwnedMaterialsUuid(materialTokenId, this.fromAddress)
      .call();
    return materialsUuid;
  }
  /**
   * Get the instance of the material by uuid
   * @param materialUuid Material uuid
   * @param full Include material batch information
   * @returns Material instance
   */
  async getMaterialByUuid(
    materialUuid: number,
    full: boolean = false
  ): Promise<IMaterialInfo> {
    const material: IMaterialInfo = await this.contract.methods
      .uuidMaterialInfo(materialUuid)
      .call();
    const events = await this.getPastEvents<MaterialTransferEvent>(
      'MaterialTransfer',
      {
        from: EMPTY_ADDRESS,
        materialTokenId: material.materialTokenId,
      },
      full
    );
    if (full) {
      material.fromBatchId = await this.contract.methods
        .getMaterialInfoFromBatchId(materialUuid)
        .call();
      material.batchMaterialsUuid = await this.contract.methods
        .getMaterialInfoBatchMaterialsUuid(materialUuid)
        .call();
    }
    // @ts-ignore
    material.mintEvent = events.find((e) => e.uuid == material.uuid);
    return material;
  }
  /**
   * Assign a certificate to a material
   * @param options Assign Certificate Options
   * @param options.certificateCode The code of the certificate to be assigned
   * @param options.materialTokenId The material token id that will be assigned the certificate to
   * @param options.stake The amount in wei that will be sent as a stake
   * @returns Assigned certificate event
   */
  assignCertificate(options: {
    certificateCode: number;
    materialTokenId: number;
    stake: string;
  }): Transaction<{
    MaterialAssignedCertificate: MaterialAssignedCertificateEvent;
  }> {
    const { certificateCode, materialTokenId, stake } = options;
    const transaction = this.contract.methods.assignCertificate(
      certificateCode,
      materialTokenId
    );

    return new Transaction<{
      MaterialAssignedCertificate: MaterialAssignedCertificateEvent;
    }>(transaction, this.fromAddress, { value: stake });
  }
  /**
   * Cancel a certificate from a material
   * @param options Cancel certificate options
   * @param options.certificateCode The code of the certificate to be canceled
   * @param options.materialTokenId The material token id that the certificate will be canceled
   * @returns Canceled certificate event
   */
  cancelCertificate(options: {
    certificateCode: number;
    materialTokenId: number;
  }): Transaction<{
    MaterialCanceledCertificate: MaterialCanceledCertificateEvent;
  }> {
    const { certificateCode, materialTokenId } = options;
    const transaction = this.contract.methods.cancelCertificate(
      certificateCode,
      materialTokenId
    );

    return new Transaction<{
      MaterialCanceledCertificate: MaterialCanceledCertificateEvent;
    }>(transaction, this.fromAddress);
  }
  /**
   * Revoke a certificate from a material
   * @param options Revoke certificate options
   * @param options.certificateCode The code of the certificate to be revoked
   * @param options.materialTokenId The material token id that the certificate will be revoked
   * @returns Revoked certificate event
   */
  revokeCertificate(options: {
    certificateCode: number;
    materialTokenId: number;
  }): Transaction<{
    MaterialRevokedCertificate: MaterialRevokedCertificateEvent;
  }> {
    const { certificateCode, materialTokenId } = options;
    const transaction = this.contract.methods.revokeCertificate(
      certificateCode,
      materialTokenId
    );

    return new Transaction<{
      MaterialRevokedCertificate: MaterialRevokedCertificateEvent;
    }>(transaction, this.fromAddress);
  }
  /**
   * Get all assigned certificates to a material token
   * @param materialTokenId Company address
   * @returns Array of certificate instances
   */
  async assigedCertificates(
    materialTokenId: number
  ): Promise<ICertificateInstance[]> {
    const certificateInstanceIds = await this.contract.methods
      .getMaterialCertificatesInstanceIds(materialTokenId)
      .call();
    return Promise.all(
      certificateInstanceIds.map(async (e: number) =>
        this.contract.methods.certificateInstances(e).call()
      )
    );
  }
  /**
   * Get the materials that have the specified certificate assigned
   * @param certificateCode Certificate code
   * @returns Materials that have the specified certificate assigned
   */
  async getFromCertificate(
    certificateCode: number
  ): Promise<
    ({
      assignEvent: MaterialAssignedCertificateEvent;
    } & ICertificateInstance)[]
  > {
    // assign certificate will always be the first
    const assignedEvents = await this.getPastEvents<MaterialAssignedCertificateEvent>(
      'MaterialAssignedCertificate',
      { certificateCode }
    );
    // initialise variable
    let materials: ({
      assignEvent: MaterialAssignedCertificateEvent;
    } & ICertificateInstance)[] = [];

    for (let assignEvent of assignedEvents) {
      const { materialTokenId } = assignEvent;
      // if the material is already added, skip it
      if (
        materials.find((e) => e.assignEvent.materialTokenId === materialTokenId)
      ) {
        continue;
      }
      // get instance
      const MaterialAssignedCertificatesInstance = await this.contract.methods
        .getMaterialCertificateInstance(materialTokenId, certificateCode)
        .call();
      if (MaterialAssignedCertificatesInstance.stake != 0) {
        materials.push({
          materialTokenId,
          assignEvent: assignEvent,
          ...MaterialAssignedCertificatesInstance,
        });
      }
    }
    return materials;
  }
  /**
   * Get certificate assignment history
   * @param options Filtering options
   * @param options.materialTokenId The material token id that the certificate was assigned
   * @param options.certificateCode The certificate code
   * @returns Certificate history events
   */
  async certificateAssignmentHistory(options: {
    materialTokenId: number;
    certificateCode?: number;
  }): Promise<ICertificateAssignmentHistory> {
    const { materialTokenId, certificateCode } = options;
    let history: ICertificateAssignmentHistory = {};
    let assignEvents = await this.getPastEvents<MaterialAssignedCertificateEvent>(
      'MaterialAssignedCertificate',
      { materialTokenId, certificateCode },
      true
    );
    let revokeEvents = await this.getPastEvents<MaterialAssignedCertificateEvent>(
      'MaterialRevokedCertificate',
      { materialTokenId, certificateCode },
      true
    );
    let cancelEvents = await this.getPastEvents<MaterialAssignedCertificateEvent>(
      'MaterialCanceledCertificate',
      { materialTokenId, certificateCode },
      true
    );

    for (let { type, events } of [
      {
        type: CERTIFICATE_ASSIGNMENT_TYPE.CREATE,
        events: assignEvents,
      },
      {
        type: CERTIFICATE_ASSIGNMENT_TYPE.REVOKE,
        events: revokeEvents,
      },
      {
        type: CERTIFICATE_ASSIGNMENT_TYPE.CANCEL,
        events: cancelEvents,
      },
    ]) {
      for (let event of events) {
        const { certificateCode } = event;
        if (!history[certificateCode]) {
          history[certificateCode] = [];
        }
        history[certificateCode].push({
          type,
          event,
        });
      }
    }
    //sort
    for (let certificateCode in history) {
      history[certificateCode] = history[certificateCode].sort(
        (a, b) => a.event.event.blockNumber - b.event.event.blockNumber
      );
    }
    return history;
  }
  /**
   * Get a certificate instance by a certificate id
   * @param certificateInstanceId Certification instance identification number
   * @returns A certificate instance
   */
  async getCertificateInstance(
    certificateInstanceId: number
  ): Promise<ICertificateInstance> {
    const certificateInstance = await this.contract.methods
      .certificateInstances(certificateInstanceId)
      .call();
    return certificateInstance;
  }
}
