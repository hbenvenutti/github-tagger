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

  public async findByTag(
    user_id: string,
    tag_id: string,
  ): Promise<GithubRepository[]> {
    // TODO: get all tags and its names;

    const repos = await this.ormRepository
      .createQueryBuilder('github_repositories')
      .innerJoinAndSelect(
        'github_repositories.tags_repository',
        'tag',
        'tag.tag_id = :tagname',
        { tagname: tag_id },
      )
      // .innerJoin('tag.tag_id', 'name')
      .where('github_repositories.user_id = :userId', { userId: user_id })
      .getMany();

    return repos;
  }

  public async findByUser(user_id: string): Promise<GithubRepository[]> {
    const repos = await this.ormRepository.find({
      where: { user_id },
      relations: ['tags_repository'],
    });

    return repos;
  }
}

export default GithubReposRepository;
