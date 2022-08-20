import { Router, Request, Response } from 'express';
import TeamsController from '../controllers/TeamsController';
import TeamService from '../services/TeamsService';

const teamsService = new TeamService();
const teamsController = new TeamsController(teamsService);

const router = Router();

router.get(
  '/teams',
  (req: Request, res: Response) => teamsController.list(req, res),
);

router.get(
  '/teams/:id',
  (req: Request, res: Response) => teamsController.listById(req, res),
);

export default router;
