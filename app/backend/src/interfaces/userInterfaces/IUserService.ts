import IBodyReq from './IBodyReq';

export default interface IUserService {
  login(reqBody: IBodyReq): Promise<string>,
  loginValidate(reqHeaders: string): Promise<string>
}
