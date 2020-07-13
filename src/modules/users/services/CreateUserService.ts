import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import IUsersRepository from '../repositories/IUsersRepository';
import User from '../infra/typeorm/entities/User';

interface IRequestDTO {
  username: string;
  email: string;
  password: string;
  github_token?: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRespository: IUsersRepository,
  ) {}

  public async execute({
    username,
    email,
    password,
    github_token,
  }: IRequestDTO): Promise<User> {
    const emailInUse = await this.usersRespository.findByEmail(email);
    const usernameInUse = await this.usersRespository.findByUsername(username);

    if (emailInUse) {
      throw new AppError('Email already in use');
    }

    if (usernameInUse) {
      throw new AppError('Username already in use');
    }

    const user = this.usersRespository.create({
      username,
      email,
      password,
      github_token,
    });

    return user;
  }
}

export default CreateUserService;
