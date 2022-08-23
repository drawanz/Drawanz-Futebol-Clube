import { Router, Request, Response } from 'express';
import LeaderBoardController from '../controllers/LeaderBoardController';
import HelpersBoard from '../helpers/HelpersBoard';
import LeaderBoardService from '../services/LeaderBoardService';

const leaderBoardRepository = new HelpersBoard();
const leaderBoardService = new LeaderBoardService(leaderBoardRepository);
const leaderBoardController = new LeaderBoardController(leaderBoardService);

const router = Router();

router.get(
  '/leaderboard/home',
  (req: Request, res: Response) => leaderBoardController.listBoard(req, res),
);

export default router;
