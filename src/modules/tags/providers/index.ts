import { container } from 'tsyringe';
import IAPIProvider from './APIProvider/models/IAPIProvider';
import GithubAPIProvider from './APIProvider/implementations/GithubAPIProvider';

container.registerSingleton<IAPIProvider>('GithubProvider', GithubAPIProvider);
