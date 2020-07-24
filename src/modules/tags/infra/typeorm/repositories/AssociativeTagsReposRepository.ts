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
}

export default AssociativeTagsReposRepository;
