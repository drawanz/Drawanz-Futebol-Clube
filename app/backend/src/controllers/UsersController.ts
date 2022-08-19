import { Request, Response } from 'express';
import IUserService from '../interfaces/userInterfaces/IUserService';

export default class UserController {
  private _userService: IUserService;

  constructor(userService: IUserService) {
    this._userService = userService;
  }

  public async login(req: Request, res: Response): Promise<void> {
    const token = await this._userService.login(req.body);
    res.status(200).send({ token });
  }

  public async loginValidate(req: Request, res: Response): Promise<void> {
    const { authorization } = req.headers;
    const role = await this._userService.loginValidate(authorization as string);
    res.status(200).send({ role });
  }
}
