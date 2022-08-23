import { NextFunction, Request, Response } from 'express';
import ErrorException from '../helpers/ErrorException';
import JwtService from '../helpers/JwtService';

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) {
    throw new ErrorException(417, 'You need a token');
  }

  try {
    const verify = JwtService.verify(req.headers.authorization as string);
    if (!verify) {
      throw new ErrorException(401, 'Token must be a valid token');
    }
  } catch (e) {
    throw new ErrorException(401, 'Token must be a valid token');
  }

  next();
};

export default verifyToken;
