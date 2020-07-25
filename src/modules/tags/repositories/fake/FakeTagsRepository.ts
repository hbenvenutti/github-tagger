import { uuid } from 'uuidv4';
import ICreateTagDTO from '@modules/tags/dtos/ICreateTagDTO';
import Tag from '@modules/tags/infra/typeorm/entities/Tag';
import ITagsRepository from '../ITagsRepository';

class FakeTagsRepository implements ITagsRepository {
  private tags: Tag[] = [];

  public async create(data: ICreateTagDTO): Promise<Tag> {
    const tag = new Tag();

    Object.assign(
      tag,
      { id: uuid(), created_at: new Date(), updated_at: new Date() },
      data,
    );

    this.tags.push(tag);

    return tag;
  }

  public async findByName(name: string): Promise<Tag | undefined> {
    const findTag = this.tags.find(tag => tag.name === name);

    return findTag;
  }
}

export default FakeTagsRepository;
