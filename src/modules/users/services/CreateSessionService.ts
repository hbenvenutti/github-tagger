import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import ITokenProvider from '../providers/TokenProvider/models/ITokenProvider';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequestDTO {
  userId: string;
  email: string;
  password: string;
}

@injectable()
class CreateSessionsService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('TokenProvider')
    private tokenProvider: ITokenProvider,
  ) {}

  public async execute({
    userId,
    email,
    password,
  }: IRequestDTO): Promise<string> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Invalid email/password', 401);
    }

    const passwordMatch = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordMatch) {
      throw new AppError('Invalid email/password', 401);
    }

    const token = this.tokenProvider.signToken(userId);

    return token;
  }
}

export default CreateSessionsService;
