import Base from './Base';
import { CompanyEntityTypeEnum } from './enums';
import IEmittedEvent from './interface/IEmittedEvent';
import IEntity from './interface/IEntity';
import IMinedTransaction from './interface/IMinedTransaction';
import MinedTransaction from './MinedTransaction';
/**
 * Event emitted on company creation
 */
export type CompanyCreateEvent = {
  /**
   * Company owner address
   */
  owner: string;
};
/**
 * Events emitted on company creation
 */
export type CreateTransactionEvents = {
  CompanyCreate: CompanyCreateEvent;
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
  code: number;
  stake: number;
}
export type CompanyAssignedCertificateEvent = {
  certificateAuthority: string;
  certificateCode: number;
  companyAddress: string;
  certificateInstanceId: number;
  event: IEmittedEvent;
};
export type CompanyCanceledCertificateEvent = {
  certificateAuthority: string;
  certificateCode: number;
  companyAddress: string;

  certificateInstanceId: number;
  event: IEmittedEvent;
};
export type CompanyRevokedCertificateEvent = {
  certificateAuthority: string;
  certificateCode: number;
  companyAddress: string;

  certificateInstanceId: number;
  event: IEmittedEvent;
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
      | CompanyAssignedCertificateEvent
      | CompanyCanceledCertificateEvent
      | CompanyRevokedCertificateEvent;
  }[];
}

class Company extends Base implements IEntity {
  /**
   * Create a new company
   * @param options Company data
   * @param options.name Company name
   * @param options.entityType Company entity type
   * @returns
   */
  async create(options: {
    name: string;
    entityType: CompanyEntityTypeEnum;
  }): Promise<MinedTransaction<CreateTransactionEvents>> {
    const { name, entityType } = options;
    await this.ensureContract();
    const result: IMinedTransaction<CreateTransactionEvents> = await this.contract.methods
      .create(name, entityType)
      .send({ from: this.fromAddress, gas: 300000 });
    return new MinedTransaction<CreateTransactionEvents>(result);
  }
  /**
   * Get company by onwer address
   * @param address Owner address. If no address is provided it will default to the fromAddress specified at proofchain initiation.
   * @returns Company Information
   */
  async getCompany(address: string = ''): Promise<ICompany> {
    await this.ensureContract();

    if (!address) address = this.fromAddress;
    return await this.contract.methods.companies(address).call();
  }
  /**
   * Checks whether an address has a company
   * @param address Owner address. If no address is provided it will default to the fromAddress specified at proofchain initiation.
   * @returns True if the owner has a company
   */
  async hasCompany(address: string = ''): Promise<boolean> {
    await this.ensureContract();

    if (!address) address = this.fromAddress;
    const company = await this.contract.methods.companies(address).call();
    return company.isValue;
  }
  /**
   * Assign a certificate to a company
   * @param options Assign Certificate Options
   * @param options.certificateCode The code of the certificate to be assigned
   * @param options.companyAddress The address of the company that will be assigned the certificate to
   * @param options.stake The amount in wei that will be sent as a stake
   * @returns Assigned certificate event
   */
  async assignCertificate(options: {
    certificateCode: number;
    companyAddress: string;
    stake: string;
  }): Promise<
    MinedTransaction<{
      CompanyAssignedCertificate: CompanyAssignedCertificateEvent;
    }>
  > {
    const { certificateCode, companyAddress, stake } = options;
    await this.ensureContract();
    const result = await this.contract.methods
      .assignCertificate(certificateCode, companyAddress)
      .send({ from: this.fromAddress, gas: 400000, value: stake });

    return new MinedTransaction<{
      CompanyAssignedCertificate: CompanyAssignedCertificateEvent;
    }>(result);
  }
  /**
   * Cancel a certificate from a company
   * @param options Cancel certificate options
   * @param options.certificateCode The code of the certificate to be canceled
   * @param options.companyAddress The address of the company that the certificate will be canceled
   * @returns Canceled certificate event
   */
  async cancelCertificate(options: {
    certificateCode: number;
    companyAddress: string;
  }): Promise<
    MinedTransaction<{
      CompanyCanceledCertificate: CompanyCanceledCertificateEvent;
    }>
  > {
    const { certificateCode, companyAddress } = options;
    await this.ensureContract();
    const result = await this.contract.methods
      .cancelCertificate(certificateCode, companyAddress)
      .send({ from: this.fromAddress, gas: 400000 });

    return new MinedTransaction<{
      CompanyCanceledCertificate: CompanyCanceledCertificateEvent;
    }>(result);
  }
  /**
   * Revoke a certificate from a company
   * @param options Revoke certificate options
   * @param options.certificateCode The code of the certificate to be revoked
   * @param options.companyAddress The address of the company that the certificate will be revoked
   * @returns Revoked certificate event
   */
  async revokeCertificate(options: {
    certificateCode: number;
    companyAddress: string;
  }): Promise<
    MinedTransaction<{
      CompanyRevokedCertificate: CompanyRevokedCertificateEvent;
    }>
  > {
    const { certificateCode, companyAddress } = options;
    await this.ensureContract();
    const result = await this.contract.methods
      .revokeCertificate(certificateCode, companyAddress)
      .send({ from: this.fromAddress, gas: 400000 });

    return new MinedTransaction<{
      CompanyRevokedCertificate: CompanyRevokedCertificateEvent;
    }>(result);
  }
  /**
   * Get all assigned certificates to a company
   * @param companyAddress Company address
   * @returns Array of certificate instances
   */
  async assigedCertificates(
    companyAddress: string
  ): Promise<ICertificateInstance[]> {
    await this.ensureContract();
    const certificateInstanceIds = await this.contract.methods
      .getCompanyCertificatesInstanceIds(companyAddress)
      .call();
    return Promise.all(
      certificateInstanceIds.map(async (e: number) =>
        this.contract.methods.certificateInstances(e).call()
      )
    );
  }

  async getFromCertificate(
    certificateCode: number
  ): Promise<
    ({
      assignEvent: CompanyAssignedCertificateEvent;
    } & ICertificateInstance)[]
  > {
    await this.ensureContract();
    // assign certificate will always be the first
    const assignedEvents = await this.getPastEvents<CompanyAssignedCertificateEvent>(
      'CompanyAssignedCertificate',
      { certificateCode }
    );
    // initialise variable
    let companies: ({
      assignEvent: CompanyAssignedCertificateEvent;
    } & ICertificateInstance)[] = [];

    for (let assignEvent of assignedEvents) {
      const { companyAddress } = assignEvent;
      // if the material is already added, skip it
      if (
        companies.find((e) => e.assignEvent.companyAddress === companyAddress)
      ) {
        continue;
      }
      // get instance
      const CompanyAssignedCertificatesInstance = await this.contract.methods
        .getCompanyCertificateInstance(companyAddress, certificateCode)
        .call();
      if (CompanyAssignedCertificatesInstance.stake != 0) {
        companies.push({
          companyAddress,
          assignEvent: assignEvent,
          ...CompanyAssignedCertificatesInstance,
        });
      }
    }
    return companies;
  }
  async certificateAssignmentHistory({
    company,
    certificateCode,
  }: {
    company: number;
    certificateCode?: number;
  }): Promise<ICertificateAssignmentHistory> {
    await this.ensureContract();
    let history: ICertificateAssignmentHistory = {};
    let assignEvents = await this.getPastEvents<CompanyAssignedCertificateEvent>(
      'CompanyAssignedCertificate',
      { company, certificateCode }
    );
    let revokeEvents = await this.getPastEvents<CompanyAssignedCertificateEvent>(
      'CompanyRevokedCertificate',
      { company, certificateCode }
    );
    let cancelEvents = await this.getPastEvents<CompanyAssignedCertificateEvent>(
      'CompanyCanceledCertificate',
      { company, certificateCode }
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
   * Get a certificate instance by a acertificate id
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
export { Company };
