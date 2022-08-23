import { Router, Request, Response } from 'express';
import MatchesRepository from '../repositories/MatchesRepository';
import MatchesService from '../services/MatchesService';
import MatchesControllers from '../controllers/MatchesControllers';
import verifyToken from '../middlewares/VerifyToken';

const matchesRepository = new MatchesRepository();
const matchesService = new MatchesService(matchesRepository);
const matchesController = new MatchesControllers(matchesService);

const router = Router();

router.get(
  '/matches/search',
  (req: Request, res: Response) => matchesController.listByFilter(req, res),
);

router.get(
  '/matches',
  (req: Request, res: Response) => matchesController.list(req, res),
);

router.post(
  '/matches',
  verifyToken,
  (req: Request, res: Response) => matchesController.addMatch(req, res),
);

router.patch(
  '/matches/:id/finish',
  verifyToken,
  (req: Request, res: Response) => matchesController.changeProgress(req, res),
);

router.patch(
  '/matches/:id',
  verifyToken,
  (req: Request, res: Response) => matchesController.changeGoals(req, res),
);

export default router;
