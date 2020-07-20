import axios from 'axios';

import IGetStarredRepositoriesDTO from '@modules/tags/dtos/IGetStarredRepositoriesDTO';
import IAPIProvider from '../models/IAPIProvider';
import IGithubResponseDTO from './dtos/IGithubResponseDTO';

class GithubAPIProvider implements IAPIProvider {
  private api = axios.create({
    baseURL: 'https://api.github.com',
  });

  public async getStarredRepositories(
    username: string,
    githubToken?: string,
  ): Promise<IGetStarredRepositoriesDTO[]> {
    const authorization = githubToken || undefined;

    const response = (await this.api.get(`/users/${username}/starred`, {
      headers: {
        authorization,
      },
    })) as IGithubResponseDTO[];

    const repositories = response.map(repo => {
      const { id, name, description, html_url } = repo;
      const repository = {
        id,
        name,
        url: html_url,
        description,
      };

      return repository;
    });

    return repositories;
  }
}

export default GithubAPIProvider;
