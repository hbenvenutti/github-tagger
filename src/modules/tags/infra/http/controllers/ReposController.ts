import { Request, Response } from 'express';
import { container } from 'tsyringe';
import GetRemoteReposService from '@modules/tags/services/GetRemoteReposService';
import CreateReposService from '@modules/tags/services/CreateReposService';

class RepositoryController {
  public async store(request: Request, response: Response): Promise<Response> {
    /**
     * First get starred repos from github: DONE
     * Second, Separate Already saved repos from unsaved;
     * Third, store the repos;
     */
    console.log('inside controller INDEX');
    const { id } = request.user;

    const getRepositories = container.resolve(GetRemoteReposService);
    const createRepositories = container.resolve(CreateReposService);

    console.log('calling service: getRemoteRepos');
    const remoteRepositories = await getRepositories.execute(id);

    console.log('calling service: createRepos');
    const repositories = await createRepositories.execute(
      remoteRepositories,
      id,
    );

    console.log('Done');

    return response.json(repositories);
  }
}

export default RepositoryController;
