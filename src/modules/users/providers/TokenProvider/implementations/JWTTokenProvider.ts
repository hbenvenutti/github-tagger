import { sign } from 'jsonwebtoken';

import authConfig from '@config/auth';
import ITokenProvider from '../models/ITokenProvider';

class JWTTokenProvider implements ITokenProvider {
  public async signToken(userId: string): Promise<string> {
    const { expiresIn, secret } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: userId,
      expiresIn,
    });

    return token;
  }
}

export default JWTTokenProvider;
