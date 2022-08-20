import { Router, Request, Response } from 'express';
import TeamsRepository from '../repositories/TeamsRepository';
import TeamsController from '../controllers/TeamsController';
import TeamService from '../services/TeamsService';

const teamsRepository = new TeamsRepository();
const teamsService = new TeamService(teamsRepository);
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
