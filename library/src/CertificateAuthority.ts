import Base from './Base';
import MinedTransaction from './MinedTransaction';
export interface ICertificate {
  name: string;
  code: number;
  description: string;
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
  async createCertificate({
    name,
    description,
  }: {
    name: string;
    description: string;
  }): Promise<
    MinedTransaction<{
      CertificateAuthorityCertificateCreated: CertificateAuthorityCertificateCreatedEvent;
    }>
  > {
    await this.ensureContract();
    const transaction = await this.contract.methods
      .createCertificate(name, description)
      .send({ from: this.fromAddress, gas: 400000 });
    return new MinedTransaction<{
      CertificateAuthorityCertificateCreated: CertificateAuthorityCertificateCreatedEvent;
    }>(transaction);
  }
  async getByCode(code: number): Promise<ICertificate | null> {
    await this.ensureContract();
    const certificate = await this.contract.methods
      .authorityCertificates(code)
      .call();
    if (!certificate.certificateAuthority) return null;
    return certificate;
  }
  async getCertificateAuthority(
    address: string
  ): Promise<ICertificateAuthority | null> {
    await this.ensureContract();
    const ca = await this.contract.methods
      .certificateAuthorities(address)
      .call();
    if (!ca.isValue) return null;
    return ca;
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
}
export default CertificateAuthority;
