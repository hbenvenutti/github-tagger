import { uuid } from 'uuidv4';
import ICreateReposDTO from '@modules/tags/dtos/ICreateReposDTO';
import GithubRepository from '@modules/tags/infra/typeorm/entities/GithubRepository';
import IReposRepository from '../IReposRepository';

class FakeReposRepository implements IReposRepository {
  private repositories: GithubRepository[] = [];

  public async create(data: ICreateReposDTO[]): Promise<GithubRepository[]> {
    const repository = new GithubRepository();
    data.map(repo => {
      Object.assign(repository, { id: uuid() }, repo);
      return this.repositories.push(repository);
    });

    return this.repositories;
  }

  public async findRemoteIdsByUser(user_id: string): Promise<number[]> {
    const repos = this.repositories.filter(repo => repo.user_id === user_id);
    const ids = repos.map(repo => repo.remote_id);

    return ids;
  }

  public async findById(repoId: string): Promise<GithubRepository | undefined> {
    const findRepo = this.repositories.find(repo => repo.id === repoId);

    return findRepo;
  }

  public async findByUser(userId: string): Promise<GithubRepository[]> {
    const findRepos = this.repositories.filter(repo => repo.user_id === userId);

    return findRepos;
  }

  public async findByTag(
    userId: string,
    tagId: string,
  ): Promise<GithubRepository[]> {
    const repos = this.repositories.filter(repo => {
      const repoTagged = repo.tags_repository.find(tag => tag.tag_id === tagId);

      if (repo.user_id === userId && repoTagged) return repo;

      return undefined;
    });

    return repos;
  }
}

export default FakeReposRepository;
