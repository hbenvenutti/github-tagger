import { container } from 'tsyringe';
import IAPIProvider from './APIProvider/models/IAPIProvider';
import GithubAPIProvider from './APIProvider/implementations/GithubAPIProvider';
import IReposRepository from '../repositories/IReposRepository';
import GithubReposRepository from '../infra/typeorm/repositories/GithubReposRepository';
import ITagsRepository from '../repositories/ITagsRepository';
import TagsRepository from '../infra/typeorm/repositories/TagsRepository';
import IAssociativeTagsReposRepository from '../repositories/IAssociativeTagsReposRepository';
import AssociativeTagsReposRepository from '../infra/typeorm/repositories/AssociativeTagsReposRepository';

container.registerSingleton<IAPIProvider>('GithubProvider', GithubAPIProvider);

container.registerSingleton<IReposRepository>(
  'ReposRepository',
  GithubReposRepository,
);

container.registerSingleton<ITagsRepository>('TagsRepository', TagsRepository);

container.registerSingleton<IAssociativeTagsReposRepository>(
  'AssociativeTagsReposRepository',
  AssociativeTagsReposRepository,
);
