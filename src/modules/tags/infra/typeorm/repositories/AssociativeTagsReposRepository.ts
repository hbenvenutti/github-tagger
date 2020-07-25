import IAssociativeTagsReposRepository from '@modules/tags/repositories/IAssociativeTagsReposRepository';
import ICreateTagRepoDTO from '@modules/tags/dtos/ICreateTagRepoDTO';
import { getRepository } from 'typeorm';
import AssociativeTagRepo from '../entities/AssociativeTagRepo';

class AssociativeTagsReposRepository
  implements IAssociativeTagsReposRepository {
  private ormRepository = getRepository(AssociativeTagRepo);

  public async tagRepo(data: ICreateTagRepoDTO): Promise<AssociativeTagRepo> {
    const tagsRepos = this.ormRepository.create(data);

    await this.ormRepository.save(tagsRepos);

    return tagsRepos;
  }

  public async findByRepoAndTag(
    repository_id: string,
    tag_id: string,
  ): Promise<AssociativeTagRepo | undefined> {
    const repoTag = await this.ormRepository.findOne({
      where: { repository_id, tag_id },
    });

    return repoTag;
  }

  public async untag(taggedRepo: AssociativeTagRepo): Promise<void> {
    const { repository_id, tag_id } = taggedRepo;
    await this.ormRepository.delete({ repository_id, tag_id });
  }
}

export default AssociativeTagsReposRepository;
