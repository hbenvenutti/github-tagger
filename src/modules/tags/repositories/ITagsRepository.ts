import Tag from '../infra/typeorm/entities/Tag';
import ICreateTagDTO from '../dtos/ICreateTagDTO';

interface ITagsRepository {
  create(data: ICreateTagDTO): Promise<Tag>;
  findByName(name: string): Promise<Tag | undefined>;
}

export default ITagsRepository;
