import { Base } from './Base';
import { Transaction } from './Transaction';
/**
 * Certificate types
 */
export declare enum CertificateTypeEnum {
    /**
     * This certificate has an environmental impact
     */
    ENVIRONMENTAL_IMPACT = 0,
    /**
     * This certificate describes the fact that the material/company uses a safe way of producing and operatins
     */
    SAFETY_AND_QUALITY = 1,
    /**
     * This certificate has natural products
     */
    HEALTH_AND_NUTRITION = 2,
    /**
     * This certificate has a social impact
     */
    SOCIAL_IMPACT = 3,
    /**
     * This certificate doesn't harm animals
     */
    ANIMAL_WELFARE = 4,
    /**
     * This certificate has some other good qualities.
     */
    OTHER = 5
}
/**
 * Certificate interface
 */
export interface ICertificate {
    /**
     * Certificate name
     */
    name: string;
    /**
     * Certificate code
     */
    code: number;
    /**
     * Certificate description
     */
    description: string;
    /**
     * Certificate type
     */
    ctype: CertificateTypeEnum;
    /**
     * Certificate owner
     */
    certificateAuthority: string;
}
export interface ICertificateAuthority {
    /**
     * Certificate authority name
     */
    name: string;
    /**
     * True if this certificate authority is disabled
     */
    disabled: boolean;
    /**
     * Certificate owner address
     */
    owner: string;
}
export declare type CertificateAuthorityCreatedEvent = {
    owner: string;
};
export declare type CertificateAuthorityCertificateCreatedEvent = {
    owner: string;
    code: number;
};
/**
 * Certificate authority class
 */
export declare class CertificateAuthority extends Base {
    /**
     * Create a certificate authority
     * @param options Create certificate authority options
     * @param options.name Certificate authority name
     * @returns Create certifiate authority events
     */
    createCertificateAuthority(options: {
        name: string;
    }): Transaction<{
        CertificateAuthorityCreated: CertificateAuthorityCreatedEvent;
    }>;
    /**
     *
     * @param options Create certificate options
     * @param options.name Certificate name
     * @param options.description Certificate description
     * @param options.type Certificate type
     * @returns Create certificate event
     */
    createCertificate(options: {
        name: string;
        description: string;
        type: CertificateTypeEnum;
    }): Transaction<{
        CertificateAuthorityCertificateCreated: CertificateAuthorityCertificateCreatedEvent;
    }>;
    /**
     * Get certificate by code
     * @param code Certificate code
     * @returns Certificate informations
     */
    getByCode(code: number): Promise<ICertificate | null>;
    /**
     * Get certificate authority by address
     * @param address Owner addres
     * @returns Certificate authority details
     */
    getCertificateAuthority(address: string): Promise<ICertificateAuthority | null>;
    /**
     * Check if an address has a certificate authority
     * @param address Owner address
     * @returns True if the address has a certificate authority
     */
    hasCertificateAuthority(address?: string): Promise<boolean>;
    /**
     * Get certificates of address
     * @param address Address with certificates
     * @returns Certificates info
     */
    certificates(address?: string): Promise<ICertificate[]>;
    /**
     * Get certificate authorities
     * @param full Include certificate authority details
     * @returns Certificate authorities
     */
    allCertificateAutorities(full?: boolean): Promise<ICertificateAuthority[] | string[]>;
    /**
     * Get the minimum allowed stake
     * @returns Minimum stake in wei
     */
    minimumStake(): Promise<string>;
}
