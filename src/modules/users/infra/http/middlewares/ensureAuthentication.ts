import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import VerifyTokenService from '@modules/users/services/VerifyTokenService';

export default async function ensureAuthentication(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('Auth Token is missing', 401);
  }

  const [, token] = authHeader.split(' ');

  const verifyToken = container.resolve(VerifyTokenService);

  const userId = await verifyToken.execute({ token });

  request.user = {
    id: userId,
  };

  next();
}
