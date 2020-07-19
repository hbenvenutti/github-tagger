import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import IUsersRepository from '../repositories/IUsersRepository';
import User from '../infra/typeorm/entities/User';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequestDTO {
  username: string;
  email: string;
  password: string;
  github_token?: string;
  github_username: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRespository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    username,
    email,
    password,
    github_token,
    github_username,
  }: IRequestDTO): Promise<User> {
    const emailInUse = await this.usersRespository.findByEmail(email);
    const usernameInUse = await this.usersRespository.findByUsername(username);

    if (emailInUse) {
      throw new AppError('Email already in use');
    }

    if (usernameInUse) {
      throw new AppError('Username already in use');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = this.usersRespository.create({
      username,
      email,
      password: hashedPassword,
      github_token,
      github_username,
    });

    return user;
  }
}

export default CreateUserService;
