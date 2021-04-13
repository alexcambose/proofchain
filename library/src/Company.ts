import Base from './Base';
import { CompanyEntityTypeEnum } from './enums';
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
}
export default Company;
