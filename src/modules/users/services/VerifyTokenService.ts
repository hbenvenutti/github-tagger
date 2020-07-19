import { injectable, inject } from 'tsyringe';
import ITokenProvider from '../providers/TokenProvider/models/ITokenProvider';

interface IRequestDTO {
  token: string;
}

@injectable()
class VerifyTokenService {
  constructor(
    @inject('TokenProvider')
    private tokenProvider: ITokenProvider,
  ) {}

  public async execute({ token }: IRequestDTO): Promise<string> {
    const userId = await this.tokenProvider.verifyToken(token);

    return userId;
  }
}

export default VerifyTokenService;
