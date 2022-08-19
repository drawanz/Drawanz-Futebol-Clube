import { Router, Request, Response } from 'express';
import UserController from '../controllers/UsersController';
import UsersService from '../services/UsersService';

const userService = new UsersService();
const userController = new UserController(userService);

const router = Router();

router.post(
  '/login',
  (req: Request, res: Response) => userController.login(req, res),
);

router.get(
  '/login/validate',
  (req: Request, res: Response) => userController.loginValidate(req, res),
);

export default router;
