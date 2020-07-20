import IGetStarredRepositoriesDTO from '@modules/tags/dtos/IGetStarredRepositoriesDTO';

export default interface IAPIProvider {
  getStarredRepositories(
    username: string,
  ): Promise<IGetStarredRepositoriesDTO[]>;
}
