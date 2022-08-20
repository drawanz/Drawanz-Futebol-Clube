import IUserService from '../interfaces/userInterfaces/IUserService';
import IBodyReq from '../interfaces/userInterfaces/IBodyReq';
import IUserMethods from '../interfaces/userInterfaces/IUserMethods';
import JwtService from '../helpers/JwtService';
import PasswodService from '../helpers/PasswordService';
import Validation from '../helpers/ValidationEmailPassword';
import IDataValues from '../interfaces/userInterfaces/IDataValues';

export default class UsersService implements IUserService {
  private _userRepository: IUserMethods;

  constructor(private userRepository: IUserMethods) {
    this._userRepository = userRepository;
  }

  public async login(reqBody: IBodyReq): Promise<string> {
    Validation.validateEmail(reqBody.email);
    Validation.validatePassword(reqBody.password);
    const user = await this._userRepository.findOne(reqBody.email);
    Validation.validateIfCorrectEmail(user);
    const data = user as IDataValues;
    const compare = await PasswodService.compare(reqBody.password, data.password);
    Validation.validateIfCorrectPassword(compare);
    const token = JwtService.sign(reqBody.email, reqBody.password);
    return token;
  }

  public async loginValidate(reqHeaders: string | string): Promise<string> {
    const userDate = JwtService.verify(reqHeaders);
    const user = await this._userRepository.findOne(userDate.email);
    const data = user as IDataValues;
    return data.role;
  }
}
