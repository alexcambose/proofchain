export default interface IEntity {
  create(name: string): Promise<string>;
}
