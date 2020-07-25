import { Request, Response } from 'express';
import { container } from 'tsyringe';
import GetRemoteReposService from '@modules/tags/services/GetRemoteReposService';
import CreateReposService from '@modules/tags/services/CreateReposService';
import GetStoredReposByTagService from '@modules/tags/services/GetStoredReposByTagService';
import GetAllReposService from '@modules/tags/services/GetAllReposService';

class RepositoryController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { tag } = request.query;
    const { id } = request.user;

    if (!tag) {
      const getAllRepos = container.resolve(GetAllReposService);

      const repos = await getAllRepos.execute({ userId: id });

      return response.json(repos);
    }

    const getReposByTag = container.resolve(GetStoredReposByTagService);

    const repos = await getReposByTag.execute({
      userId: id,
      tag: tag.toString(),
    });

    return response.json(repos);
  }

  public async store(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const getRepositories = container.resolve(GetRemoteReposService);
    const createRepositories = container.resolve(CreateReposService);

    const remoteRepositories = await getRepositories.execute(id);

    const repositories = await createRepositories.execute(
      remoteRepositories,
      id,
    );

    return response.status(201).json(repositories);
  }
}

export default RepositoryController;
