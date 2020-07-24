import IGetStarredReposDTO from '@modules/tags/dtos/IGetStarredReposDTO';

export default interface IAPIProvider {
  getStarredRepositories(
    username: string,
    token?: string,
  ): Promise<IGetStarredReposDTO[]>;
}
