import { Base } from './Base';
import IEmittedEvent from './interface/IEmittedEvent';
import IEntity from './interface/IEntity';
import { Transaction } from './Transaction';
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
export declare type MaterialCreateEvent = {
    company: string;
    materialTokenId: number;
    event: IEmittedEvent;
};
export declare type MaterialTransferEvent = {
    from: string;
    to: string;
    uuid: number;
    event: IEmittedEvent;
};
export declare type MaterialAssignedCertificateEvent = {
    certificateAuthority: string;
    certificateCode: number;
    materialTokenId: number;
    certificateInstanceId: number;
    event: IEmittedEvent;
};
export declare type MaterialCanceledCertificateEvent = {
    certificateAuthority: string;
    certificateCode: number;
    materialTokenId: number;
    certificateInstanceId: number;
    event: IEmittedEvent;
};
export declare type MaterialRevokedCertificateEvent = {
    certificateAuthority: string;
    certificateCode: number;
    materialTokenId: number;
    certificateInstanceId: number;
    event: IEmittedEvent;
};
export declare type CreateTransactionEvents = {
    MaterialCreate: MaterialCreateEvent;
};
export declare enum CERTIFICATE_ASSIGNMENT_TYPE {
    CREATE = 0,
    CANCEL = 1,
    REVOKE = 2
}
export interface ICertificateAssignmentHistory {
    [certificateCode: number]: {
        type: CERTIFICATE_ASSIGNMENT_TYPE;
        event: MaterialAssignedCertificateEvent | MaterialCanceledCertificateEvent | MaterialRevokedCertificateEvent;
    }[];
}
/**
 * Material class
 */
export declare class Material extends Base implements IEntity {
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
    create(options: ICreateRawMaterial): Transaction<CreateTransactionEvents>;
    /**
     * Get a material by its token id
     * @param materialTokenId Material token id
     * @param full Set to true it the resulting object should include recipe details
     * @returns Material token info
     */
    getById(materialTokenId: string | number, full?: boolean): Promise<IMaterialTokenInfo | null>;
    /**
     * Get all materials
     * @param options Filtering options
     * @param options.onlyRawMaterials - Set to true to include only raw materials
     * @param options.onlyMaterials - Set to true to include only compound materials
     * @returns Materials tokens info
     */
    all(options?: IMaterialTypeSelector): Promise<(IMaterialTokenInfo | null)[]>;
    /**
     * Count the number of materials
     * @param options Count options
     * @param options.onlyRawMaterials - Set to true to count only raw materials
     * @param options.onlyMaterials - Set to true to count only compound materials
     * @returns Number of materials
     */
    countAll(options?: IMaterialTypeSelector): Promise<number>;
    /**
     * Get the number of materials the account has
     * @param materialTokenId Material token id
     * @returns The balance of the materials that the "fromAddress" account has
     */
    getBalance(materialTokenId: number): Promise<number>;
    /**
     * Create a new material instance.
     * @param options Minting options
     * @param options.materialTokenId Material token id to mint
     * @param options.amount Amount to mint
     * @param options.fromBatchId Recipe batch id
     * @param options.fromBatchMaterialsUuid Recipe amount from the corresponding batch id
     * @returns Mint event
     */
    mint(options: {
        materialTokenId: number;
        amount?: number;
        fromBatchId?: number[];
        fromBatchMaterialsUuid?: number[][];
    }): Promise<Transaction<{
        MaterialTransfer: MaterialTransferEvent[];
    }>>;
    /**
     * Get transfers
     * @param options Transfer filtering options
     * @param options.from Transfer sender account
     * @param options.to Transfer receiver account
     * @param options.materialTokenId Transfer material token id
     * @returns Transfer events
     */
    getTransfers(options: {
        from?: string;
        to?: string;
        materialTokenId?: number;
    }): Promise<MaterialTransferEvent[]>;
    /**
     * Get owned material instances
     * @param materialTokenId Material token id
     * @returns Uuids
     */
    getOwnedMaterialsUuid(materialTokenId: number): Promise<IMaterialInfo[]>;
    /**
     * get the uuids of the owned material
     * @param materialTokenId Material token id
     * @returns Uuids
     */
    getOwnedMaterialsUuidCodes(materialTokenId: number): Promise<number[]>;
    /**
     * Get the instance of the material by uuid
     * @param materialUuid Material uuid
     * @param full Include material batch information
     * @returns Material instance
     */
    getMaterialByUuid(materialUuid: number, full?: boolean): Promise<IMaterialInfo>;
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
    }>;
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
    }>;
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
    }>;
    /**
     * Get all assigned certificates to a material token
     * @param materialTokenId Company address
     * @returns Array of certificate instances
     */
    assigedCertificates(materialTokenId: number): Promise<ICertificateInstance[]>;
    /**
     * Get the materials that have the specified certificate assigned
     * @param certificateCode Certificate code
     * @returns Materials that have the specified certificate assigned
     */
    getFromCertificate(certificateCode: number): Promise<({
        assignEvent: MaterialAssignedCertificateEvent;
    } & ICertificateInstance)[]>;
    /**
     * Get certificate assignment history
     * @param options Filtering options
     * @param options.materialTokenId The material token id that the certificate was assigned
     * @param options.certificateCode The certificate code
     * @returns Certificate history events
     */
    certificateAssignmentHistory(options: {
        materialTokenId: number;
        certificateCode?: number;
    }): Promise<ICertificateAssignmentHistory>;
    /**
     * Get a certificate instance by a certificate id
     * @param certificateInstanceId Certification instance identification number
     * @returns A certificate instance
     */
    getCertificateInstance(certificateInstanceId: number): Promise<ICertificateInstance>;
}
