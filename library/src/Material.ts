import Base from './Base';
import IEntity from './interface/IEntity';
import MinedTransaction from './MinedTransaction';
import { parseEvent } from './utils/eventsParser';

interface IMaterial {
  name: string;
  code: string;
  images: string[];
}
type MaterialCreateEvent = {
  company: string; // address
  materialTokenId: number;
};
type CreateTransactionEvents = {
  MaterialCreate: MaterialCreateEvent;
};

class Material extends Base implements IEntity {
  async create({
    name,
    code,
    images,
  }: IMaterial): Promise<MinedTransaction<CreateTransactionEvents>> {
    await this.ensureContract();
    const transaction = await this.contract.methods
      .create(name, code, images)
      .send({ from: this.fromAddress, gas: 300000 });
    return new MinedTransaction<CreateTransactionEvents>(transaction);
  }
  async getById(materialTokenId: string | number): Promise<IMaterial> {
    await this.ensureContract();
    const material = await this.contract.methods
      .materialToken(String(materialTokenId))
      .call();
    return material;
  }
  async all(): Promise<IMaterial[]> {
    await this.ensureContract();
    const createEvents = await this.getPastEvents<MaterialCreateEvent>(
      'MaterialCreate',
      { company: this.fromAddress }
    );
    let materials = [];
    for (let createEvent of createEvents) {
      materials.push(await this.getById(createEvent.materialTokenId));
    }
    return materials;
  }
  async countAll(): Promise<number> {
    await this.ensureContract();
    const createEvents = await this.getPastEvents<MaterialCreateEvent>(
      'MaterialCreate',
      { company: this.fromAddress }
    );
    return createEvents.length;
  }
  async getPastEvents<T>(eventName: string, filter: object = {}): Promise<T[]> {
    const events = await this.contract.getPastEvents(eventName, {
      filter,
      fromBlock: 0,
      toBlock: 'latest',
    });
    return events.map(parseEvent);
  }
}
export default Material;
