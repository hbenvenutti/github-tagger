import { Request, Response } from 'express';
import { container } from 'tsyringe';

import FindRepoService from '@modules/tags/services/FindRepoService';
import CreateTagService from '@modules/tags/services/CreateTagService';
import TagRepoService from '@modules/tags/services/TagRepoService';
import RemoveTagFromRepoService from '@modules/tags/services/RemoveTagFromRepoService';

class TagsController {
  public async store(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const { tagName } = request.body;

    const findRepo = container.resolve(FindRepoService);

    const createTag = container.resolve(CreateTagService);

    const tagRepo = container.resolve(TagRepoService);

    const repo = await findRepo.execute({ repoId: id });

    const tag = await createTag.execute(tagName);

    const associativeTagRepo = await tagRepo.execute(repo, tag);

    return response.status(201).json({ tag, associativeTagRepo });
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { tagName } = request.body;

    const removeTag = container.resolve(RemoveTagFromRepoService);

    await removeTag.execute({ repoId: id, tagName });

    return response.status(204).json();
  }
}

export default TagsController;
