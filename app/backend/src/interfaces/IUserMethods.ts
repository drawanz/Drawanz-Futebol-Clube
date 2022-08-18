import IUser from './IUser';

export default interface IUserMethods {
  findOne(entity: object): Promise<IUser>
}
