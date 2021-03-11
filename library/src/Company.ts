import Base from './Base';
import EntityTypeEnum from './enums/EntityTypeEnum';
import IEntity from './interface/IEntity';
import { Company as CompanyAbi } from './abi';
import IMinedTransaction from './interface/IMinedTransaction';
import MinedTransaction from './MinedTransaction';
type CompanyCreateEvent = {
  address: string;
};
type CreateTransactionEvents = {
  CompanyCreate: CompanyCreateEvent;
};

interface ICompany {
  entityType: EntityTypeEnum;
  name: string;
}

class Company extends Base implements IEntity {
  async ensureContract() {
    await super.ensureContract(CompanyAbi);
  }
  async create({
    name,
    entityType,
  }: {
    name: string;
    entityType: EntityTypeEnum;
  }): Promise<MinedTransaction<CreateTransactionEvents>> {
    await this.ensureContract();

    const result: IMinedTransaction<CreateTransactionEvents> = await this.contract.methods
      .create(name, entityType)
      .send({ from: await this.getAccount() });
    return new MinedTransaction<CreateTransactionEvents>(result);
  }
  async getCompany(address: string = ''): Promise<ICompany> {
    await this.ensureContract();

    if (!address) address = await this.getAccount();
    return await this.contract.methods.companies(address).call();
  }
  async hasCompany(address: string = ''): Promise<boolean> {
    await this.ensureContract();

    if (!address) address = await this.getAccount();
    console.log(`Checking company for `, address);
    const company = await this.contract.methods.companies(address).call();
    return company.isValue;
  }
}
export default Company;
