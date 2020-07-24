import { Request, Response } from 'express';
import { container } from 'tsyringe';
import FindRepoService from '@modules/tags/services/FindRepoService';
import CreateTagService from '@modules/tags/services/CreateTagService';
import TagRepoService from '@modules/tags/services/TagRepoService';

class TagsController {
  public async store(request: Request, responsse: Response): Promise<Response> {
    const { id } = request.params;
    const { tagName } = request.body;

    const findRepo = container.resolve(FindRepoService);
    const createTag = container.resolve(CreateTagService);
    const tagRepo = container.resolve(TagRepoService);

    const repo = await findRepo.execute(id);
    const tag = await createTag.execute(tagName);
    const associativeTagRepo = await tagRepo.execute(repo, tag);

    return responsse.json(associativeTagRepo);
  }
}

export default TagsController;
