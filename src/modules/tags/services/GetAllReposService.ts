import { injectable, inject } from 'tsyringe';
import IReposRepository from '../repositories/IReposRepository';
import GithubRepository from '../infra/typeorm/entities/GithubRepository';

interface IRequestDTO {
  userId: string;
}

@injectable()
class GetAllReposService {
  constructor(
    @inject('ReposRepository')
    private reposRepository: IReposRepository,
  ) {}

  public async execute({ userId }: IRequestDTO): Promise<GithubRepository[]> {
    const repos = await this.reposRepository.findByUser(userId);

    return repos;
  }
}

export default GetAllReposService;
