import IGetStarredReposDTO from '@modules/tags/dtos/IGetStarredReposDTO';
import IAPIProvider from '../models/IAPIProvider';

class FakeAPIProvider implements IAPIProvider {
  private remoteRepositories: IGetStarredReposDTO[] = [
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
  ): Promise<IGetStarredReposDTO[]> {
    return this.remoteRepositories;
  }
}

export default FakeAPIProvider;
