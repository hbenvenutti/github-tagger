import { container } from 'tsyringe';
import IAPIProvider from './APIProvider/models/IAPIProvider';
import GithubAPIProvider from './APIProvider/implementations/GithubAPIProvider';
import IRepositoriesRepository from '../repositories/IRepositoriesRepository';
import GithubReposRepository from '../infra/typeorm/repositories/GithubReposRepository';

container.registerSingleton<IAPIProvider>('GithubProvider', GithubAPIProvider);

container.registerSingleton<IRepositoriesRepository>(
  'ReposRepository',
  GithubReposRepository,
);
