import { Request, Response } from 'express';
import IMatchesMethods from '../interfaces/matchesInterfaces/IMatchesMethods';

export default class MatchesControllers {
  private _matchesService: IMatchesMethods;

  constructor(matchesService: IMatchesMethods) {
    this._matchesService = matchesService;
  }

  public async list(req: Request, res: Response): Promise<void> {
    const response = await this._matchesService.list(req);
    res.status(200).send(response);
  }

  public async listByFilter(req: Request, res: Response): Promise<void> {
    const { inProgress } = req.query;
    const response = await this._matchesService.listByFilter(inProgress as string);
    res.status(200).send(response);
  }

  public async addMatch(req: Request, res: Response): Promise<void> {
    const response = await this._matchesService.addMatch(req.body);
    res.status(201).send(response);
  }

  public async changeProgress(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const response = await this._matchesService.changeProgress(+id);
    res.status(200).send(response);
  }
}
