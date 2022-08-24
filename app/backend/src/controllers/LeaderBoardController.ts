import { Request, Response } from 'express';
import LeaderBoardService from '../services/LeaderBoardService';

export default class LeaderBoardController {
  constructor(private leaderBoardService: LeaderBoardService) { }

  public async getHome(req: Request, res: Response): Promise<void> {
    const response = await this.leaderBoardService.listBoard('home');
    const sorted = response.sort((a, b) => (
      b.totalPoints - a.totalPoints
      || b.totalVictories - a.totalVictories
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor
      || b.goalsOwn - a.goalsOwn
    ));
    res.status(200).json(sorted);
  }

  public async getAway(req: Request, res: Response): Promise<void> {
    const response = await this.leaderBoardService.listBoard('away');
    const sorted = response.sort((c, d) => (
      d.totalPoints - c.totalPoints
      || d.totalVictories - c.totalVictories
      || d.goalsBalance - c.goalsBalance
      || d.goalsFavor - c.goalsFavor
      || d.goalsOwn - c.goalsOwn
    ));
    res.status(200).json(sorted);
  }
}
