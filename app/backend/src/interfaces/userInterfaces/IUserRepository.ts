import User from '../../database/models/User';

export default interface IUserRepository {
  findOne(email: string): Promise<User | null>;
}
