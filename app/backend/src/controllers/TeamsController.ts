import { Request, Response } from 'express';
import ITeamService from '../interfaces/teamsInterfaces/ITeamsService';

export default class TeamsController {
  private _teamsService: ITeamService;

  constructor(teamsService: ITeamService) {
    this._teamsService = teamsService;
  }

  public async list(req: Request, res: Response): Promise<void> {
    const response = await this._teamsService.list();
    res.status(200).send(response);
  }
}
