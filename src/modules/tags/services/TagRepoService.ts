import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import GithubRepository from '../infra/typeorm/entities/GithubRepository';
import Tag from '../infra/typeorm/entities/Tag';
import IAssociativeTagsReposRepository from '../repositories/IAssociativeTagsReposRepository';
import AssociativeTagRepo from '../infra/typeorm/entities/AssociativeTagRepo';

@injectable()
class TagRepoService {
  constructor(
    @inject('AssociativeTagsReposRepository')
    private tagsReposRepository: IAssociativeTagsReposRepository,
  ) {}

  public async execute(
    repo: GithubRepository,
    tag: Tag,
  ): Promise<AssociativeTagRepo> {
    const { id: tag_id } = tag;
    const { id: repository_id } = repo;
    const repoTags = repo.tags_repository;

    const repoHasTag = repoTags.find(
      taggedRepo => taggedRepo.tag_id === tag_id,
    );

    if (repoHasTag) {
      throw new AppError('repo already has this tag');
    }

    const associativeTagRepo = this.tagsReposRepository.tagRepo({
      repository_id,
      tag_id,
    });

    return associativeTagRepo;
  }
}

export default TagRepoService;
