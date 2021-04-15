import { Base } from './Base';
import MinedTransaction from './MinedTransaction';
import { Transaction } from './Transaction';
import { EMPTY_ADDRESS } from './utils/eth';
/**
 * Certificate types
 */
export enum CertificateTypeEnum {
  /**
   * This certificate has an environmental impact
   */
  ENVIRONMENTAL_IMPACT,
  /**
   * This certificate describes the fact that the material/company uses a safe way of producing and operatins
   */
  SAFETY_AND_QUALITY,
  /**
   * This certificate has natural products
   */
  HEALTH_AND_NUTRITION,
  /**
   * This certificate has a social impact
   */
  SOCIAL_IMPACT,
  /**
   * This certificate doesn't harm animals
   */
  ANIMAL_WELFARE,
  /**
   * This certificate has some other good qualities.
   */
  OTHER,
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
export type CertificateAuthorityCreatedEvent = {
  owner: string;
};
export type CertificateAuthorityCertificateCreatedEvent = {
  owner: string;
  code: number;
};
/**
 * Certificate authority class
 */
export class CertificateAuthority extends Base {
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
  }> {
    const { name } = options;
    const transaction = this.contract.methods.createCertificateAuthority(name);
    return new Transaction<{
      CertificateAuthorityCreated: CertificateAuthorityCreatedEvent;
    }>(transaction, this.fromAddress);
  }
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
  }> {
    const { name, description, type } = options;
    const transaction = this.contract.methods.createCertificate(
      name,
      description || '',
      type
    );
    return new Transaction<{
      CertificateAuthorityCertificateCreated: CertificateAuthorityCertificateCreatedEvent;
    }>(transaction, this.fromAddress);
  }
  /**
   * Get certificate by code
   * @param code Certificate code
   * @returns Certificate informations
   */
  async getByCode(code: number): Promise<ICertificate | null> {
    const certificate = await this.contract.methods
      .authorityCertificates(code)
      .call();
    if (certificate.certificateAuthority === EMPTY_ADDRESS) return null;
    return certificate;
  }
  /**
   * Get certificate authority by address
   * @param address Owner addres
   * @returns Certificate authority details
   */
  async getCertificateAuthority(
    address: string
  ): Promise<ICertificateAuthority | null> {
    const ca: ICertificateAuthority = await this.contract.methods
      .certificateAuthorities(address)
      .call();
    if (ca.owner === EMPTY_ADDRESS) return null;
    return ca;
  }
  /**
   * Check if an address has a certificate authority
   * @param address Owner address
   * @returns True if the address has a certificate authority
   */
  async hasCertificateAuthority(
    address: string = this.fromAddress
  ): Promise<boolean> {
    return !!(await this.getCertificateAuthority(address));
  }
  /**
   * Get certificates of address
   * @param address Address with certificates
   * @returns Certificates info
   */
  async certificates(
    address: string = this.fromAddress
  ): Promise<ICertificate[]> {
    const createEvents = await this.getPastEvents<CertificateAuthorityCertificateCreatedEvent>(
      'CertificateAuthorityCertificateCreated',
      { owner: address }
    );
    return Promise.all(
      createEvents.map((e) => this.getByCode(e.code) as Promise<ICertificate>)
    );
  }
  /**
   * Get certificate authorities
   * @param full Include certificate authority details
   * @returns Certificate authorities
   */
  async allCertificateAutorities(
    full: boolean = true
  ): Promise<ICertificateAuthority[] | string[]> {
    const createEvents = await this.getPastEvents<CertificateAuthorityCreatedEvent>(
      'CertificateAuthorityCreated'
    );
    if (!full) {
      return createEvents.map((e) => e.owner);
    }
    const certificateAuthorities: ICertificateAuthority[] = [];
    for (let { owner } of createEvents) {
      certificateAuthorities.push(
        (await this.getCertificateAuthority(owner)) as ICertificateAuthority
      );
    }
    return certificateAuthorities;
  }
  /**
   * Get the minimum allowed stake
   * @returns Minimum stake in wei
   */
  async minimumStake(): Promise<string> {
    return this.contract.methods.minimumStake().call();
  }
}
