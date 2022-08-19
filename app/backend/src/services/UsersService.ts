import IUserService from '../interfaces/IUserService';
import IBodyReq from '../interfaces/IBodyReq';
import IUserMethods from '../interfaces/IUserMethods';
import JwtService from '../helpers/JwtService';
import PasswodService from '../helpers/PasswordService';
import User from '../database/models/user';
import Validation from '../helpers/ValidationEmailPassword';

export default class UsersService implements IUserService {
  private _userRepository: IUserMethods;

  constructor() {
    this._userRepository = User;
  }

  public async login(reqBody: IBodyReq): Promise<string> {
    Validation.validateEmail(reqBody.email);
    Validation.validatePassword(reqBody.password);
    const user = await this._userRepository.findOne({ where: { email: reqBody.email } });
    Validation.validateIfCorrectEmail(user);
    const { dataValues } = user;
    const compare = await PasswodService.compare(reqBody.password, dataValues.password);
    Validation.validateIfCorrectPassword(compare);
    const token = JwtService.sign(reqBody.email, reqBody.password);
    return token;
  }

  public async loginValidate(reqHeaders: string | string): Promise<string> {
    const userDate = JwtService.verify(reqHeaders);
    const user = await this._userRepository.findOne({ where: { email: userDate.email } });
    return user.dataValues.role;
  }
}
