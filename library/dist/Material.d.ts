import Base from './Base';
import IEmittedEvent from './interface/IEmittedEvent';
import IEntity from './interface/IEntity';
import MinedTransaction from './MinedTransaction';
interface IMaterial {
    materialTokenId: number;
    name: string;
    code: string;
    images: string[];
    amountIdentifier: string;
    recipeMaterialTokenId: number[];
    recipeMaterialAmount: number[];
    isValue: boolean;
}
interface ICreateRawMaterial {
    name: string;
    code: string;
    amountIdentifier: string;
    images?: string[];
    recipeMaterialTokenId?: number[];
    recipeMaterialAmount?: number[];
}
interface IMaterialTypeSelector {
    onlyRawMaterials?: boolean;
    onlyMaterials?: boolean;
}
declare type MaterialCreateEvent = {
    company: string;
    materialTokenId: number;
    event: IEmittedEvent;
};
declare type MaterialTransferEvent = {
    materialTokenId: string;
    from: string;
    to: string;
    value: number;
    event: IEmittedEvent;
};
declare type CreateTransactionEvents = {
    MaterialCreate: MaterialCreateEvent;
};
declare type TransferTransactionEvents = {
    MaterialTransfer: MaterialTransferEvent;
};
declare class Material extends Base implements IEntity {
    create({ name, code, amountIdentifier, images, recipeMaterialTokenId, recipeMaterialAmount, }: ICreateRawMaterial): Promise<MinedTransaction<CreateTransactionEvents>>;
    getById(materialTokenId: string | number, full?: boolean): Promise<IMaterial | null>;
    all({ onlyRawMaterials, onlyMaterials, }?: IMaterialTypeSelector): Promise<(IMaterial | null)[]>;
    countAll({ onlyMaterials, onlyRawMaterials, }?: IMaterialTypeSelector): Promise<number>;
    getBalance(materialTokenId: number): Promise<number>;
    mint({ materialTokenId, amount, }: {
        materialTokenId: number;
        amount: number;
    }): Promise<MinedTransaction<TransferTransactionEvents>>;
    getTransfers({ from, to, materialTokenId, }: {
        from?: string;
        to?: string;
        materialTokenId?: number;
    }): Promise<MaterialTransferEvent[]>;
}
export default Material;
