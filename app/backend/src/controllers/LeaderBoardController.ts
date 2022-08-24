import { Request, Response } from 'express';
import LeaderBoardService from '../services/LeaderBoardService';

export default class LeaderBoardController {
  constructor(private leaderBoardService: LeaderBoardService) { }

  public async getHome(req: Request, res: Response): Promise<void> {
    const response = await this.leaderBoardService.listBoard('home');
    res.status(200).json(response);
  }

  public async getAway(req: Request, res: Response): Promise<void> {
    const response = await this.leaderBoardService.listBoard('away');
    res.status(200).json(response);
  }

  public async getLeaderBoard(req: Request, res: Response): Promise<void> {
    const response = await this.leaderBoardService.listBoard('');
    res.status(200).json(response);
  }
}
