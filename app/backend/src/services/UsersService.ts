import IUserService from '../interfaces/IUserService';
import IBodyReq from '../interfaces/IBodyReq';
import IUserMethods from '../interfaces/IUserMethods';
import JwtService from '../helpers/JwtService';
import PasswodService from '../helpers/PasswordService';
import User from '../database/models/user';
import Validation from '../helpers/ValidationEmailPassword';

export default class UsersService implements IUserService {
  private _userRepository: IUserMethods;
  private reqBody: IBodyReq;
  private reqHeaders: string;

  public async login(reqBody: IBodyReq): Promise<string> {
    this.reqBody = reqBody;
    Validation.validateEmail(reqBody.email);
    Validation.validatePassword(reqBody.password);
    const user = await User.findOne({ where: { email: reqBody.email } });
    Validation.validateIfCorrectEmail(user);
    const data = user as User;
    const compare = await PasswodService.compare(reqBody.password, data.password);
    Validation.validateIfCorrectPassword(compare);
    const token = JwtService.sign(reqBody.email, reqBody.password);
    return token;
  }

  public async loginValidate(reqHeaders: string | string): Promise<string> {
    this.reqHeaders = reqHeaders;
    const userDate = JwtService.verify(reqHeaders);
    const user = await User.findOne({ where: { email: userDate.email } });
    const data = user as User;
    return data.role;
  }
}
