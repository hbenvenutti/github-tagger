import ITokenProvider from '../models/ITokenProvider';

class FakeTokenProvider implements ITokenProvider {
  private secret: 'mydirtylittlesecret';

  private expiresIn: '7d';

  public async signToken(payload: string): Promise<string> {
    const token = `${payload},${this.secret},${this.expiresIn}`;

    return token;
  }
}

export default FakeTokenProvider;
