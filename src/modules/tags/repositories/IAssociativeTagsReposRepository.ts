import ICreateTagRepoDTO from '@modules/tags/dtos/ICreateTagRepoDTO';
import AssociativeTagRepo from '../infra/typeorm/entities/AssociativeTagRepo';

interface IAssociativeTagsReposRepository {
  tagRepo(data: ICreateTagRepoDTO): Promise<AssociativeTagRepo>;
  findByRepoAndTag(
    repository_id: string,
    tag_id: string,
  ): Promise<AssociativeTagRepo | undefined>;
  untag(taggedRepo: AssociativeTagRepo): Promise<void>;
}

export default IAssociativeTagsReposRepository;
