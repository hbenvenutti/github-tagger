import ICreateTagRepoDTO from '@modules/tags/dtos/ICreateTagRepoDTO';
import AssociativeTagRepo from '../infra/typeorm/entities/AssociativeTagRepo';

interface IAssociativeTagsReposRepository {
  tagRepo(data: ICreateTagRepoDTO): Promise<AssociativeTagRepo>;
}

export default IAssociativeTagsReposRepository;
