import { NextFunction, Request, Response } from 'express';
import ErrorException from '../helpers/ErrorException';

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  const { status, message } = err as ErrorException;

  res.status(status || 500).json({ message });
  next();
};

export default errorHandler;
