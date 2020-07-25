import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import ITagsRepository from '../repositories/ITagsRepository';
import IReposRepository from '../repositories/IReposRepository';
import IAssociativeTagsReposRepository from '../repositories/IAssociativeTagsReposRepository';

interface IRequestDTO {
  repoId: string;
  tagName: string;
}

@injectable()
class RemoveTagFromRepoService {
  constructor(
    @inject('ReposRepository')
    private reposRepository: IReposRepository,
    @inject('TagsRepository')
    private tagsRepository: ITagsRepository,
    @inject('AssociativeTagsReposRepository')
    private associativeTagsReposRepository: IAssociativeTagsReposRepository,
  ) {}

  public async execute({ repoId, tagName }: IRequestDTO): Promise<void> {
    const repoExists = await this.reposRepository.findById(repoId);
    if (!repoExists) {
      throw new AppError('repository not found', 404);
    }
    const findTag = await this.tagsRepository.findByName(tagName);

    if (!findTag) {
      throw new AppError('tag not found', 404);
    }
    const tagId = findTag.id;

    const repoIsTagged = await this.associativeTagsReposRepository.findByRepoAndTag(
      repoId,
      tagId,
    );

    if (!repoIsTagged) {
      throw new AppError('repository does not have this tag', 404);
    }

    await this.associativeTagsReposRepository.untag(repoIsTagged);
  }
}

export default RemoveTagFromRepoService;
