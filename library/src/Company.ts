import Base from './Base';
import CompanyEntityTypeEnum from './enums/CompanyEntityTypeEnum';
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
  entityType: CompanyEntityTypeEnum;
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
    entityType: CompanyEntityTypeEnum;
  }): Promise<MinedTransaction<CreateTransactionEvents>> {
    await this.ensureContract();
    const gas = await this.contract.methods
      .create(name, entityType)
      .estimateGas();
    const result: IMinedTransaction<CreateTransactionEvents> = await this.contract.methods
      .create(name, entityType)
      .send({ from: this.fromAddress, gas: 300000 });
    return new MinedTransaction<CreateTransactionEvents>(result);
  }
  async getCompany(address: string = ''): Promise<ICompany> {
    await this.ensureContract();

    if (!address) address = this.fromAddress;
    return await this.contract.methods.companies(address).call();
  }
  async hasCompany(address: string = ''): Promise<boolean> {
    await this.ensureContract();

    if (!address) address = this.fromAddress;
    console.log(`Checking company for `, address);
    const company = await this.contract.methods.companies(address).call();
    return company.isValue;
  }
}
export default Company;
