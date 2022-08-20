import User from '../../database/models/user';

export default interface IUserRepository {
  findOne(email: string): Promise<User | null>;
}
