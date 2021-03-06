import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IReposRepository from '../repositories/IReposRepository';
import GithubRepository from '../infra/typeorm/entities/GithubRepository';
import IGetStarredReposDTO from '../dtos/IGetStarredReposDTO';

interface IRequestDTO {
  remoteRepos: IGetStarredReposDTO[];
  userId: string;
}
@injectable()
class CreateReposService {
  constructor(
    @inject('ReposRepository')
    private reposRepository: IReposRepository,
  ) {}

  public async execute({
    remoteRepos,
    userId,
  }: IRequestDTO): Promise<GithubRepository[]> {
    if (!remoteRepos.length) {
      throw new AppError('no repositories provided');
    }

    const savedId = await this.reposRepository.findRemoteIdsByUser(userId);
    const notExistentRepos = remoteRepos.filter(repo => {
      if (!savedId.includes(repo.id)) {
        return repo;
      }
      return undefined;
    });

    if (!notExistentRepos.length) {
      throw new AppError('no new starred repositories', 404);
    }
    const readyToBeSavedRepos = notExistentRepos.map(repo => {
      const { id, description, name, url } = repo;
      const newRepo = {
        remote_id: id,
        url,
        description,
        name,
        user_id: userId,
      };
      return newRepo;
    });

    const repositories = this.reposRepository.create(readyToBeSavedRepos);

    return repositories;
  }
}

export default CreateReposService;
