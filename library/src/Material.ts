import Base from './Base';
import IEmittedEvent from './interface/IEmittedEvent';
import IEntity from './interface/IEntity';
import MinedTransaction from './MinedTransaction';
import { parseEvent } from './utils/eventsParser';

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
type MaterialCreateEvent = {
  company: string; // address
  materialTokenId: number;
  event: IEmittedEvent;
};
type MaterialTransferEvent = {
  materialTokenId: string;
  from: string;
  to: string;
  value: number;
  event: IEmittedEvent;
};
type CreateTransactionEvents = {
  MaterialCreate: MaterialCreateEvent;
};
type TransferTransactionEvents = {
  MaterialTransfer: MaterialTransferEvent;
};
class Material extends Base implements IEntity {
  async create({
    name,
    code,
    amountIdentifier,
    images = [],
    recipeMaterialTokenId = [],
    recipeMaterialAmount = [],
  }: ICreateRawMaterial): Promise<MinedTransaction<CreateTransactionEvents>> {
    await this.ensureContract();
    // check if the specified recipe ids exist
    for (let id of recipeMaterialTokenId) {
      const material = await this.getById(id, false);
      if (!material) {
        throw new Error(`Material with id ${id} does not exist`);
      }
    }
    const transaction = await this.contract.methods
      .create(
        name,
        code,
        amountIdentifier,
        images,
        recipeMaterialTokenId,
        recipeMaterialAmount
      )
      .send({ from: this.fromAddress, gas: 300000 });
    return new MinedTransaction<CreateTransactionEvents>(transaction);
  }
  async getById(
    materialTokenId: string | number,
    full: boolean = true
  ): Promise<IMaterial | null> {
    await this.ensureContract();
    const material: IMaterial = await this.contract.methods
      .materialToken(String(materialTokenId))
      .call();
    if (full) {
      const recipe = await this.contract.methods
        .getMaterialRecipe(materialTokenId)
        .call();
      material.recipeMaterialTokenId = recipe['0'];
      material.recipeMaterialAmount = recipe['1'];
    }
    if (!material.isValue) return null;
    return material;
  }
  async all({
    onlyRawMaterials,
    onlyMaterials,
  }: IMaterialTypeSelector = {}): Promise<(IMaterial | null)[]> {
    await this.ensureContract();
    const createEvents = await this.getPastEvents<MaterialCreateEvent>(
      'MaterialCreate',
      { company: this.fromAddress }
    );
    let materials = [];
    for (let createEvent of createEvents) {
      const fetchedMaterial = await this.getById(createEvent.materialTokenId);
      if (
        onlyRawMaterials &&
        fetchedMaterial!.recipeMaterialTokenId.length > 0
      ) {
        continue;
      } else if (
        onlyMaterials &&
        fetchedMaterial!.recipeMaterialTokenId.length === 0
      ) {
        continue;
      } else {
        materials.push(fetchedMaterial);
      }
    }
    return materials;
  }
  async countAll({
    onlyMaterials,
    onlyRawMaterials,
  }: IMaterialTypeSelector = {}): Promise<number> {
    await this.ensureContract();
    const createEvents = await this.getPastEvents<MaterialCreateEvent>(
      'MaterialCreate',
      { company: this.fromAddress }
    );
    return createEvents.length;
  }
  async getBalance(materialTokenId: number): Promise<number> {
    const balance = await this.contract.methods
      .getBalance(materialTokenId, this.fromAddress)
      .call();
    return parseInt(balance);
  }
  async mint({
    materialTokenId,
    amount,
  }: {
    materialTokenId: number;
    amount: number;
  }): Promise<MinedTransaction<TransferTransactionEvents>> {
    await this.ensureContract();
    const result = await this.contract.methods
      .mint(materialTokenId, amount)
      .send({ from: this.fromAddress, gas: 300000 });
    return new MinedTransaction<TransferTransactionEvents>(result);
  }
  async getTransfers({
    from,
    to,
    materialTokenId,
  }: {
    from?: string;
    to?: string;
    materialTokenId?: number;
  }): Promise<MaterialTransferEvent[]> {
    const transferEvents = await this.getPastEvents<MaterialTransferEvent>(
      'MaterialTransfer',
      { from, to, materialTokenId }
    );
    return transferEvents;
  }
}
export default Material;
