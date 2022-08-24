import { Request, Response } from 'express';
import LeaderBoardService from '../services/LeaderBoardService';

export default class LeaderBoardController {
  constructor(private leaderBoardService: LeaderBoardService) { }

  public async listBoard(req: Request, res: Response): Promise<void> {
    const response = await this.leaderBoardService.listBoard();
    const sorted = response.sort((a, b) => (
      b.totalPoints - a.totalPoints
      || b.totalVictories - a.totalVictories
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor
      || b.goalsOwn - a.goalsOwn
    ));
    res.status(200).json(sorted);
  }
}
