import IDataValues from './IDataValues';

export default interface IUserMethods {
  findOne(entity: object): Promise<IDataValues>
}
