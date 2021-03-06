import { injectable, inject } from 'tsyringe';
import ITagsRepository from '../repositories/ITagsRepository';
import Tag from '../infra/typeorm/entities/Tag';

interface IRequestDTO {
  tagName: string;
}
@injectable()
class CreateTagService {
  constructor(
    @inject('TagsRepository')
    private tagsRepository: ITagsRepository,
  ) {}

  public async execute({ tagName }: IRequestDTO): Promise<Tag> {
    const tagExists = await this.tagsRepository.findByName(tagName);

    if (tagExists) {
      return tagExists;
    }

    const tag = await this.tagsRepository.create({ name: tagName });

    return tag;
  }
}

export default CreateTagService;
