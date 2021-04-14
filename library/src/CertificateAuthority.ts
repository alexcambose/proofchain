import Base from './Base';
import MinedTransaction from './MinedTransaction';
import { Transaction } from './Transaction';
import { EMPTY_ADDRESS } from './utils/eth';
enum CertificateTypeEnum {
  ENVIRONMENTAL_IMPACT,
  SAFETY_AND_QUALITY,
  HEALTH_AND_NUTRITION,
  SOCIAL_IMPACT,
  ANIMAL_WELFARE,
  OTHER,
}
export interface ICertificate {
  name: string;
  code: number;
  description: string;
  ctype: CertificateTypeEnum;
  certificateAuthority: string;
}
interface ICertificateAuthority {
  name: string;
  disabled: boolean;
  owner: string;
  isValue: boolean;
}
type CertificateAuthorityCreatedEvent = {
  owner: string;
};
type CertificateAuthorityCertificateCreatedEvent = {
  owner: string;
  code: number;
};
class CertificateAuthority extends Base {
  async createCertificateAuthority({
    name,
  }: {
    name: string;
  }): Promise<
    MinedTransaction<{
      CertificateAuthorityCreated: CertificateAuthorityCreatedEvent;
    }>
  > {
    await this.ensureContract();
    const transaction = await this.contract.methods
      .createCertificateAuthority(name)
      .send({ from: this.fromAddress, gas: 400000 });
    return new MinedTransaction<{
      CertificateAuthorityCreated: CertificateAuthorityCreatedEvent;
    }>(transaction);
  }
  createCertificate({
    name,
    description,
    type,
  }: {
    name: string;
    description: string;
    type: CertificateTypeEnum;
  }): Transaction<{
    CertificateAuthorityCertificateCreated: CertificateAuthorityCertificateCreatedEvent;
  }> {
    const transaction = this.contract.methods.createCertificate(
      name,
      description || '',
      type
    );
    return new Transaction<{
      CertificateAuthorityCertificateCreated: CertificateAuthorityCertificateCreatedEvent;
    }>(transaction, this.fromAddress);
  }
  async getByCode(code: number): Promise<ICertificate | null> {
    await this.ensureContract();
    const certificate = await this.contract.methods
      .authorityCertificates(code)
      .call();
    if (certificate.certificateAuthority === EMPTY_ADDRESS) return null;
    return certificate;
  }
  async getCertificateAuthority(
    address: string
  ): Promise<ICertificateAuthority | null> {
    await this.ensureContract();
    const ca: ICertificateAuthority = await this.contract.methods
      .certificateAuthorities(address)
      .call();
    if (ca.owner === EMPTY_ADDRESS) return null;
    return ca;
  }

  async hasCertificateAuthority(
    address: string = this.fromAddress
  ): Promise<boolean> {
    await this.ensureContract();
    return !!(await this.getCertificateAuthority(address));
  }

  async certificates(
    address: string = this.fromAddress
  ): Promise<ICertificate[]> {
    await this.ensureContract();

    const createEvents = await this.getPastEvents<CertificateAuthorityCertificateCreatedEvent>(
      'CertificateAuthorityCertificateCreated',
      { owner: address }
    );
    return Promise.all(
      createEvents.map((e) => this.getByCode(e.code) as Promise<ICertificate>)
    );
  }
  async allCertificateAutorities(
    full: boolean = true
  ): Promise<ICertificateAuthority[] | string[]> {
    await this.ensureContract();
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

  async minimumStake(): Promise<string> {
    await this.ensureContract();
    return this.contract.methods.minimumStake().call();
  }
}
export default CertificateAuthority;
