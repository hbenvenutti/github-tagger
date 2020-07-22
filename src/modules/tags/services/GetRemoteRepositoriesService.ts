import { injectable, inject } from 'tsyringe';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import IAPIProvider from '../providers/APIProvider/models/IAPIProvider';
import IGetStarredRepositoriesDTO from '../dtos/IGetStarredRepositoriesDTO';

@injectable()
class GetRemoteRepositoriesService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('GithubProvider')
    private apiProvider: IAPIProvider,
  ) {}

  public async execute(id: string): Promise<IGetStarredRepositoriesDTO[]> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError('User not found', 401);
    }

    const { github_username, github_token } = user;

    const repositories = await this.apiProvider.getStarredRepositories(
      github_username,
      github_token,
    );

    return repositories;
  }
}

export default GetRemoteRepositoriesService;
