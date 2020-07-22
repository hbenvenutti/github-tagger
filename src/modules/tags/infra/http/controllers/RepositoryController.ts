import { Request, Response } from 'express';
import { container } from 'tsyringe';
import GetRemoteRepositoriesService from '@modules/tags/services/GetRemoteRepositoriesService';

class RepositoryController {
  public async index(request: Request, response: Response): Promise<Response> {
    /**
     * First get starred repos from github
     * Second, store/update repos in the database
     * return all starred repos or filtered by tag
     */
    console.log('inside controller');
    const { id } = request.user;

    console.log(`id: ${id}`);
    const getRepositories = container.resolve(GetRemoteRepositoriesService);

    const repositories = await getRepositories.execute(id);

    console.log(`Controller: \nRepositories: ${repositories}`);
    return response.json(repositories);
  }
}

export default RepositoryController;
