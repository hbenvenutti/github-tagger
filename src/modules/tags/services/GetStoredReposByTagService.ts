import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IReposRepository from '../repositories/IReposRepository';
import GithubRepository from '../infra/typeorm/entities/GithubRepository';
import ITagsRepository from '../repositories/ITagsRepository';

interface GetReposDTO {
  tag: string;
  userId: string;
}

@injectable()
class GetStoredReposByTagService {
  constructor(
    @inject('ReposRepository')
    private reposRepository: IReposRepository,
    @inject('TagsRepository')
    private tagsRepository: ITagsRepository,
  ) {}

  public async execute({
    tag,
    userId,
  }: GetReposDTO): Promise<GithubRepository[]> {
    const findTag = await this.tagsRepository.findByName(tag);

    if (!findTag) {
      throw new AppError('tag not found');
    }
    const { id } = findTag;

    const repos = await this.reposRepository.findByTag(userId, id);

    return repos;
  }
}

export default GetStoredReposByTagService;
