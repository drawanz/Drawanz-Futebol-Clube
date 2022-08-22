import { Request, Response } from 'express';
import ITeamMethods from '../interfaces/teamsInterfaces/ITeamMethods';
// import ITeamService from '../interfaces/teamsInterfaces/ITeamsService';

export default class TeamsController {
  private _teamsService: ITeamMethods;

  constructor(teamsService: ITeamMethods) {
    this._teamsService = teamsService;
  }

  public async list(req: Request, res: Response): Promise<void> {
    const response = await this._teamsService.list();
    res.status(200).send(response);
  }

  public async listById(req: Request, res: Response): Promise<void> {
    const response = await this._teamsService.listById(req.params.id);
    res.status(200).send(response);
  }
}
