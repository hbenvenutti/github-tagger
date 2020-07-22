import axios from 'axios';

import IGetStarredRepositoriesDTO from '@modules/tags/dtos/IGetStarredRepositoriesDTO';
import AppError from '@shared/errors/AppError';
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
    try {
      const response = await this.api.get(`/users/${username}/starred`, {
        headers: {
          authorization: `bearer ${authorization}`,
        },
      });

      const githubRepositories = response.data as IGithubResponseDTO[];

      const repositories = githubRepositories.map(repo => {
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
    } catch {
      throw new AppError(
        'Request Failed: Did you provide the right github username?',
        404,
      );
    }
  }
}

export default GithubAPIProvider;
