import IUserMethods from '../interfaces/userInterfaces/IUserMethods';
import User from '../database/models/User';
import IDataValues from '../interfaces/userInterfaces/IDataValues';

export default class UserRepository implements IUserMethods {
  constructor(private user = User) { }

  public async findOne(email: string): Promise<IDataValues> {
    const response = await this.user.findOne({ where: { email } });
    return response as IDataValues;
  }
}
