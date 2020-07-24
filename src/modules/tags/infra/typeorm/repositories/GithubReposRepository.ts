import { getRepository } from 'typeorm';
import IRepositoriesRepository from '@modules/tags/repositories/IRepositoriesRepository';
import ICreateRepositoryDTO from '@modules/tags/dtos/ICreateRepositoryDTO';
import GithubRepository from '../entities/GithubRepository';

class GithubReposRepository implements IRepositoriesRepository {
  private ormRepository = getRepository(GithubRepository);

  public async create(
    data: ICreateRepositoryDTO[],
  ): Promise<GithubRepository[]> {
    const repositories: GithubRepository[] = this.ormRepository.create(
      data.map(repo => repo),
    );

    await this.ormRepository.save(repositories);

    return repositories;
  }

  public async findRemoteIdsByUser(user_id: string): Promise<number[]> {
    const repositories = await this.ormRepository.find({
      where: { user_id },
    });

    const remoteIds = repositories.map(repo => repo.remote_id);
    return remoteIds;
  }
}

export default GithubReposRepository;
