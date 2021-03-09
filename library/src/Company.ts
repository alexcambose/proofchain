import Base from './Base';
import EntityTypeEnum from './enums/EntityTypeEnum';
import IEntity from './interface/IEntity';
import { Company as CompanyAbi } from './abi';
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
  }): Promise<string> {
    await this.ensureContract();

    console.log(await this.contract.methods.create(name, entityType).send());
    return name;
  }
}
export default Company;
