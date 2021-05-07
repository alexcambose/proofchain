import { Base } from './Base';
import { CompanyEntityTypeEnum } from './enums';
import IEmittedEvent from './interface/IEmittedEvent';
import IEntity from './interface/IEntity';
import { Transaction } from './Transaction';
/**
 * Event emitted on company creation
 */
export declare type CompanyCreateEvent = {
    /**
     * Company owner address
     */
    owner: string;
};
/**
 * Company information
 */
export interface ICompany {
    /**
     * Company entity type
     */
    entityType: CompanyEntityTypeEnum;
    /**
     * Company name
     */
    name: string;
    isValue: boolean;
}
export interface ICertificateInstance {
    /**
     * Certificate unique code
     */
    code: number;
    /**
     * Certificate stake amount
     */
    stake: number;
}
export declare type CompanyAssignedCertificateEvent = {
    certificateAuthority: string;
    certificateCode: number;
    companyAddress: string;
    certificateInstanceId: number;
    event: IEmittedEvent;
};
export declare type CompanyCanceledCertificateEvent = {
    certificateAuthority: string;
    certificateCode: number;
    companyAddress: string;
    certificateInstanceId: number;
    event: IEmittedEvent;
};
export declare type CompanyRevokedCertificateEvent = {
    certificateAuthority: string;
    certificateCode: number;
    companyAddress: string;
    certificateInstanceId: number;
    event: IEmittedEvent;
};
export declare enum CERTIFICATE_ASSIGNMENT_TYPE {
    CREATE = 0,
    CANCEL = 1,
    REVOKE = 2
}
export interface ICertificateAssignmentHistory {
    [certificateCode: number]: {
        type: CERTIFICATE_ASSIGNMENT_TYPE;
        event: CompanyAssignedCertificateEvent | CompanyCanceledCertificateEvent | CompanyRevokedCertificateEvent;
    }[];
}
declare class Company extends Base implements IEntity {
    /**
     * Create a new company
     * @param options Company data
     * @param options.name Company name
     * @param options.entityType Company entity type
     * @returns
     */
    create(options: {
        name: string;
        entityType: CompanyEntityTypeEnum;
    }): Transaction<{
        CompanyCreate: CompanyCreateEvent;
    }>;
    /**
     * Get company by onwer address
     * @param address Owner address. If no address is provided it will default to the fromAddress specified at proofchain initiation.
     * @returns Company Information
     */
    getCompany(address?: string): Promise<ICompany>;
    /**
     * Checks whether an address has a company
     * @param address Owner address. If no address is provided it will default to the fromAddress specified at proofchain initiation.
     * @returns True if the owner has a company
     */
    hasCompany(address?: string): Promise<boolean>;
    /**
     * Assign a certificate to a company
     * @param options Assign Certificate Options
     * @param options.certificateCode The code of the certificate to be assigned
     * @param options.companyAddress The address of the company that will be assigned the certificate to
     * @param options.stake The amount in wei that will be sent as a stake
     * @returns Assigned certificate event
     */
    assignCertificate(options: {
        certificateCode: number;
        companyAddress: string;
        stake: string;
    }): Transaction<{
        CompanyAssignedCertificate: CompanyAssignedCertificateEvent;
    }>;
    /**
     * Cancel a certificate from a company
     * @param options Cancel certificate options
     * @param options.certificateCode The code of the certificate to be canceled
     * @param options.companyAddress The address of the company that the certificate will be canceled
     * @returns Canceled certificate event
     */
    cancelCertificate(options: {
        certificateCode: number;
        companyAddress: string;
    }): Transaction<{
        CompanyCanceledCertificate: CompanyCanceledCertificateEvent;
    }>;
    /**
     * Revoke a certificate from a company
     * @param options Revoke certificate options
     * @param options.certificateCode The code of the certificate to be revoked
     * @param options.companyAddress The address of the company that the certificate will be revoked
     * @returns Revoked certificate event
     */
    revokeCertificate(options: {
        certificateCode: number;
        companyAddress: string;
    }): Transaction<{
        CompanyRevokedCertificate: CompanyRevokedCertificateEvent;
    }>;
    /**
     * Get all assigned certificates to a company
     * @param companyAddress Company address. If not provided, this will default to "fromAddress"
     * @returns Array of certificate instances
     */
    assigedCertificates(companyAddress?: string): Promise<ICertificateInstance[]>;
    /**
     * Get the companies that have the specified certificate assigned
     * @param certificateCode Certificate code
     * @returns Companies that have the specified certificate assigned
     */
    getFromCertificate(certificateCode: number): Promise<({
        assignEvent: CompanyAssignedCertificateEvent;
    } & ICertificateInstance)[]>;
    /**
     * Get certificate assignment history
     * @param options Filtering options
     * @param options.company The company that the certificate was assigned
     * @param options.certificateCode The certificate code
     * @returns Certificate history events
     */
    certificateAssignmentHistory(options: {
        companyAddress: string;
        certificateCode?: number;
    }): Promise<ICertificateAssignmentHistory>;
    /**
     * Get a certificate instance by a certificate id
     * @param certificateInstanceId Certification instance identification number
     * @returns A certificate instance
     */
    getCertificateInstance(certificateInstanceId: number): Promise<ICertificateInstance>;
}
export { Company };
