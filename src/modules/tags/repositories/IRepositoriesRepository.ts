import GithubRepository from '../infra/typeorm/entities/GithubRepository';
import ICreateRepositoryDTO from '../dtos/ICreateRepositoryDTO';

interface IRepositoriesRepository {
  create(
    data: ICreateRepositoryDTO[] | ICreateRepositoryDTO,
  ): Promise<GithubRepository[]>;

  findRemoteIdsByUser(user_id: string): Promise<number[]>;
}

export default IRepositoriesRepository;
