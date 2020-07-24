import GithubRepository from '../infra/typeorm/entities/GithubRepository';
import ICreateRepositoryDTO from '../dtos/ICreateReposDTO';

interface IReposRepository {
  create(
    data: ICreateRepositoryDTO[] | ICreateRepositoryDTO,
  ): Promise<GithubRepository[]>;

  findRemoteIdsByUser(user_id: string): Promise<number[]>;

  findById(repoId: string): Promise<GithubRepository | undefined>;
}

export default IReposRepository;
