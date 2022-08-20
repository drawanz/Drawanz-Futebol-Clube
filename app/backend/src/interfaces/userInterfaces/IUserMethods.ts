import IDataValues from './IDataValues';

export default interface IUserMethods {
  findOne(entity: string): Promise<IDataValues>
}
