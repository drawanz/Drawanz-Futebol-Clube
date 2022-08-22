import { Router, Request, Response } from 'express';
import MatchesRepository from '../repositories/MatchesRepository';
import MatchesService from '../services/MatchesService';
import MatchesControllers from '../controllers/MatchesControllers';

const matchesRepository = new MatchesRepository();
const matchesService = new MatchesService(matchesRepository);
const matchesController = new MatchesControllers(matchesService);

const router = Router();

router.get(
  '/matches',
  (req: Request, res: Response) => matchesController.list(req, res),
);

// router.get(
//   '/teams/:id',
//   (req: Request, res: Response) => teamsController.listById(req, res),
// );

export default router;
