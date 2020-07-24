import { getRepository } from 'typeorm';
import IReposRepository from '@modules/tags/repositories/IReposRepository';
import ICreateReposDTO from '@modules/tags/dtos/ICreateReposDTO';
import GithubRepository from '../entities/GithubRepository';

class GithubReposRepository implements IReposRepository {
  private ormRepository = getRepository(GithubRepository);

  public async create(data: ICreateReposDTO[]): Promise<GithubRepository[]> {
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

  public async findById(repoId: string): Promise<GithubRepository | undefined> {
    const repo = this.ormRepository.findOne(repoId, {
      relations: ['user_id', 'tags_repository'],
    });

    return repo;
  }
}

export default GithubReposRepository;
