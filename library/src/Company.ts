import Base from './Base';
import EntityTypeEnum from './enums/EntityTypeEnum';
import IEntity from './interface/IEntity';
import { Company as CompanyAbi } from './abi';
import IMinedTransaction from './interface/IMinedTransaction';
import MinedTransaction from './MinedTransaction';
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
  }): Promise<MinedTransaction> {
    await this.ensureContract();

    const result: IMinedTransaction = await this.contract.methods
      .create(name, entityType)
      .send({ from: await this.getAccount() });
    return new MinedTransaction(result);
  }
}
export default Company;
