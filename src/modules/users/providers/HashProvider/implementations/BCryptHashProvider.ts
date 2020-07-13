import { hash, compare } from 'bcryptjs';
import IHashProvider from '../models/IHashProvider';

class BCryptHashProvider implements IHashProvider {
  public async generateHash(payload: string): Promise<string> {
    return hash(payload, 12);
  }

  public async compareHash(
    payload: string,
    hashedString: string,
  ): Promise<boolean> {
    return compare(payload, hashedString);
  }
}

export default BCryptHashProvider;
