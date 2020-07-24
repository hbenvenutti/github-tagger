import { container } from 'tsyringe';
import IAPIProvider from './APIProvider/models/IAPIProvider';
import GithubAPIProvider from './APIProvider/implementations/GithubAPIProvider';
import IReposRepository from '../repositories/IReposRepository';
import GithubReposRepository from '../infra/typeorm/repositories/GithubReposRepository';

container.registerSingleton<IAPIProvider>('GithubProvider', GithubAPIProvider);

container.registerSingleton<IReposRepository>(
  'ReposRepository',
  GithubReposRepository,
);
