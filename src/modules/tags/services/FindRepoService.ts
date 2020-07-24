import { injectable, inject } from 'tsyringe';
import IReposRepository from '../repositories/IReposRepository';

@injectable()
class FindRepoService {
  constructor(
    @inject('ReposRepository')
    private reposRepository: IReposRepository,
  ) {}
}

export default FindRepoService;
