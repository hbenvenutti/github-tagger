import ITokenProvider from '../models/ITokenProvider';

class FakeTokenProvider implements ITokenProvider {
  private secret = 'mydirtylittlesecret';

  private expiresIn = '7d';

  public async signToken(userId: string): Promise<string> {
    const token = `${userId},${this.secret},${this.expiresIn}`;

    return token;
  }

  public async verifyToken(token: string): Promise<string> {
    const [id] = token.split(',');

    return id;
  }
}

export default FakeTokenProvider;
