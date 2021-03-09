export default interface IEntity {
  create(options: { name: string; [key: string]: any }): Promise<string>;
}
