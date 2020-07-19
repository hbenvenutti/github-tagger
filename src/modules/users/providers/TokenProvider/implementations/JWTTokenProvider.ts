import { sign, verify } from 'jsonwebtoken';

import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import ITokenProvider from '../models/ITokenProvider';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}
class JWTTokenProvider implements ITokenProvider {
  private expiresIn = authConfig.jwt.expiresIn;

  private secret = authConfig.jwt.secret;

  public async signToken(userId: string): Promise<string> {
    const token = sign({}, this.secret, {
      subject: userId,
      expiresIn: this.expiresIn,
    });

    return token;
  }

  public async verifyToken(token: string): Promise<string> {
    try {
      const decoded = verify(token, this.secret);

      const { sub } = decoded as ITokenPayload;

      return sub;
    } catch {
      throw new AppError('Invalid Token', 401);
    }
  }
}

export default JWTTokenProvider;
