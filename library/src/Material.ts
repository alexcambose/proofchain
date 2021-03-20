import Base from './Base';
import IEmittedEvent from './interface/IEmittedEvent';
import IEntity from './interface/IEntity';
import MinedTransaction from './MinedTransaction';
import { EMPTY_ADDRESS } from './utils/eth';
import { parseEvent } from './utils/eventsParser';

interface IMaterialTokenInfo {
  materialTokenId: number;
  name: string;
  code: string;
  images: string[];
  amountIdentifier: string;
  recipeMaterialTokenId: number[];
  recipeMaterialAmount: number[];
  isValue: boolean;
}
interface IMaterialInfo {
  materialTokenId: number;
  uuid: number;
  fromBatchId: number[];
  batchMaterialsUuid: number[][];
  mintEvent: MaterialCreateEvent;
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
  from: string;
  to: string;
  uuid: number;
  event: IEmittedEvent;
};
type CreateTransactionEvents = {
  MaterialCreate: MaterialCreateEvent;
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
      .send({ from: this.fromAddress, gas: 400000 });
    return new MinedTransaction<CreateTransactionEvents>(transaction);
  }
  async getById(
    materialTokenId: string | number,
    full: boolean = true
  ): Promise<IMaterialTokenInfo | null> {
    await this.ensureContract();
    const material: IMaterialTokenInfo = await this.contract.methods
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
  }: IMaterialTypeSelector = {}): Promise<(IMaterialTokenInfo | null)[]> {
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
    fromBatchId,
    fromBatchMaterialsUuid,
  }: {
    materialTokenId: number;
    amount?: number;
    fromBatchId?: number[];
    fromBatchMaterialsUuid?: number[];
  }): Promise<MinedTransaction<{ MaterialTransfer: MaterialTransferEvent[] }>> {
    await this.ensureContract();
    const material = await this.getById(materialTokenId);
    const isRaw = material?.recipeMaterialAmount.length === 0;
    let result;
    if (isRaw) {
      result = await this.contract.methods
        .mint(materialTokenId, amount)
        .send({ from: this.fromAddress, gas: 400000 });
    } else {
      result = await this.contract.methods
        .mint(materialTokenId, fromBatchId, fromBatchMaterialsUuid)
        .send({ from: this.fromAddress, gas: 900000 });
    }
    return new MinedTransaction<{ MaterialTransfer: MaterialTransferEvent[] }>(
      result
    );
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
    await this.ensureContract();

    const transferEvents = await this.getPastEvents<MaterialTransferEvent>(
      'MaterialTransfer',
      { from, to, materialTokenId }
    );
    return transferEvents;
  }
  async getOwnedMaterialsUuid(
    materialTokenId: number
  ): Promise<IMaterialInfo[]> {
    await this.ensureContract();
    const materialsUuid = await this.getOwnedMaterialsUuidCodes(
      materialTokenId
    );
    return Promise.all(
      materialsUuid.map(async (e) => this.getMaterialByUuid(e))
    );
  }
  async getOwnedMaterialsUuidCodes(materialTokenId: number): Promise<number[]> {
    await this.ensureContract();
    const materialsUuid: number[] = await this.contract.methods
      .getOwnedMaterialsUuid(materialTokenId, this.fromAddress)
      .call();
    return materialsUuid;
  }
  async getMaterialByUuid(materialUuid: number): Promise<IMaterialInfo> {
    await this.ensureContract();
    const material: IMaterialInfo = await this.contract.methods
      .uuidMaterialInfo(materialUuid)
      .call();
    const events = await this.getPastEvents<MaterialTransferEvent>(
      'MaterialTransfer',
      {
        from: EMPTY_ADDRESS,
        materialTokenId: material.materialTokenId,
      }
    );
    // @ts-ignore
    material.mintEvent = events.find((e) => e.uuid === material.uuid);
    return material;
  }
}
export default Material;
