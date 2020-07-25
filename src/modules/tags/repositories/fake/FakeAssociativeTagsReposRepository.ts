import AssociativeTagRepo from '@modules/tags/infra/typeorm/entities/AssociativeTagRepo';
import ICreateTagRepoDTO from '@modules/tags/dtos/ICreateTagRepoDTO';
import { uuid } from 'uuidv4';
import IAssociativeTagsReposRepository from '../IAssociativeTagsReposRepository';

class FakeAssociativeTagsReposRepository
  implements IAssociativeTagsReposRepository {
  private associativeTagsRepos: AssociativeTagRepo[] = [];

  public async tagRepo(data: ICreateTagRepoDTO): Promise<AssociativeTagRepo> {
    const taggedRepo = new AssociativeTagRepo();

    Object.assign(taggedRepo, { id: uuid() }, data);

    this.associativeTagsRepos.push(taggedRepo);

    return taggedRepo;
  }

  public async untag(taggedRepo: AssociativeTagRepo): Promise<void> {
    const index = this.associativeTagsRepos.findIndex(
      tagged => tagged === taggedRepo,
    );

    this.associativeTagsRepos.slice(index, 1);
  }

  public async findByRepoAndTag(
    repository_id: string,
    tag_id: string,
  ): Promise<AssociativeTagRepo | undefined> {
    const taggedRepo = this.associativeTagsRepos.find(
      tagged =>
        tagged.repository_id === repository_id && tagged.tag_id === tag_id,
    );

    return taggedRepo;
  }
}

export default FakeAssociativeTagsReposRepository;
