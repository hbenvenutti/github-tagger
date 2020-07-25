import { getRepository } from 'typeorm';
import ITagsRepository from '@modules/tags/repositories/ITagsRepository';
import ICreateTagDTO from '@modules/tags/dtos/ICreateTagDTO';
import Tag from '../entities/Tag';

class TagsRepository implements ITagsRepository {
  private ormRepository = getRepository(Tag);

  public async create(data: ICreateTagDTO): Promise<Tag> {
    const tag = this.ormRepository.create(data);

    await this.ormRepository.save(tag);

    return tag;
  }

  public async findByName(name: string): Promise<Tag | undefined> {
    const tag = await this.ormRepository.findOne({ where: { name } });

    return tag;
  }
}

export default TagsRepository;
