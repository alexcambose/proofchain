import Base from './Base';
import CompanyEntityTypeEnum from './enums/CompanyEntityTypeEnum';
import IEntity from './interface/IEntity';
import MinedTransaction from './MinedTransaction';
declare type CompanyCreateEvent = {
    owner: string;
};
declare type CreateTransactionEvents = {
    CompanyCreate: CompanyCreateEvent;
};
interface ICompany {
    entityType: CompanyEntityTypeEnum;
    name: string;
}
declare class Company extends Base implements IEntity {
    create({ name, entityType, }: {
        name: string;
        entityType: CompanyEntityTypeEnum;
    }): Promise<MinedTransaction<CreateTransactionEvents>>;
    getCompany(address?: string): Promise<ICompany>;
    hasCompany(address?: string): Promise<boolean>;
}
export default Company;
