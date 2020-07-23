import ICreateRepositoryDTO from '@modules/tags/dtos/ICreateRepositoryDTO';
import GithubRepository from '@modules/tags/infra/typeorm/entities/GithubRepository';

class FakeRepositoriesRepository {
  private repositories: GithubRepository[] = [];

  public async create(
    data: ICreateRepositoryDTO[],
  ): Promise<GithubRepository[]> {
    const repository = new GithubRepository();
    data.map(repo => {
      Object.assign(repository, repo);
      return this.repositories.push(repository);
    });

    return this.repositories;
  }
}

export default FakeRepositoriesRepository;
