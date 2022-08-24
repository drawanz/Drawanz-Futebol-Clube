import { Router, Request, Response } from 'express';
import LeaderBoardController from '../controllers/LeaderBoardController';
import LeaderBoardRepository from '../repositories/LeaderBoardRepository';
import LeaderBoardService from '../services/LeaderBoardService';

const leaderBoardRepository = new LeaderBoardRepository();
const leaderBoardService = new LeaderBoardService(leaderBoardRepository);
const leaderBoardController = new LeaderBoardController(leaderBoardService);

const router = Router();

router.get(
  '/leaderboard/home',
  (req: Request, res: Response) => leaderBoardController.listBoard(req, res),
);

export default router;
