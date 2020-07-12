import IUsersRepository from '../repositories/IUsersRepository';
import User from '../infra/typeorm/entities/User';

interface IRequestDTO {
  username: string;
  email: string;
  password: string;
  github_token?: string;
}

class CreateUserService {
  constructor(private usersRespository: IUsersRepository) {}

  public async execute({
    username,
    email,
    password,
    github_token,
  }: IRequestDTO): Promise<User> {
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
