import IGetStarredRepositoriesDTO from '@modules/tags/dtos/IGetStarredRepositoriesDTO';
import IAPIProvider from '../models/IAPIProvider';

class FakeAPIProvider implements IAPIProvider {
  private remoteRepositories: IGetStarredRepositoriesDTO[] = [
    {
      id: 1,
      name: 'fakerepo',
      description: 'just a fake repo',
      url: 'http://localhost:80',
    },
  ];

  public async getStarredRepositories(
    __: string,
    _: string,
  ): Promise<IGetStarredRepositoriesDTO[]> {
    return this.remoteRepositories;
  }
}

export default FakeAPIProvider;
