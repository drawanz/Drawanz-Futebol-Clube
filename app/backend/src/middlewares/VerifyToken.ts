import { NextFunction, Request, Response } from 'express';
import ErrorException from '../helpers/ErrorException';
import JwtService from '../helpers/JwtService';

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) {
    throw new ErrorException(417, 'You need a token');
  }

  const verify = JwtService.verify(req.headers.authorization as string);

  if (!verify.email) {
    throw new ErrorException(401, 'Invalid token');
  }

  next();
};

export default verifyToken;
