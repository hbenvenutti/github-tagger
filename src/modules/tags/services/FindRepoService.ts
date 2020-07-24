import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IReposRepository from '../repositories/IReposRepository';
import GithubRepository from '../infra/typeorm/entities/GithubRepository';

@injectable()
class FindRepoService {
  constructor(
    @inject('ReposRepository')
    private reposRepository: IReposRepository,
  ) {}

  public async execute(repoId: string): Promise<GithubRepository> {
    const repo = await this.reposRepository.findById(repoId);

    if (!repo) {
      throw new AppError('Repository not found', 404);
    }

    return repo;
  }
}

export default FindRepoService;
