import FakeUsersRepository from '@modules/users/repositories/fake/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import FakeAPIProvider from '../providers/APIProvider/fake/FakeAPIProvider';
import GetRemoteReposService from './GetRemoteReposService';

/* TODO: I dont think this test is too helpfull,
 * I should find a better way to test it.
 */

describe('GetRemoteRepositories', () => {
  let fakeUsersRepository: FakeUsersRepository;
  let fakeAPIProvider: FakeAPIProvider;
  let getRepositories: GetRemoteReposService;

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeAPIProvider = new FakeAPIProvider();
    getRepositories = new GetRemoteReposService(
      fakeUsersRepository,
      fakeAPIProvider,
    );
  });

  it('should be able to fetch remote repositories', async () => {
    const { id } = await fakeUsersRepository.create({
      username: 'johndoe',
      email: 'johndoe@example.com',
      github_username: 'johndoe',
      password: 'password',
      github_token: 'token',
    });
    const repositories = await getRepositories.execute(id);

    expect(repositories).toEqual([
      {
        id: 1,
        name: 'fakerepo',
        description: 'just a fake repo',
        url: 'http://localhost:80',
      },
    ]);
  });

  it('should not be able to fetch remote repositories without valid user', async () => {
    const id = 'fake id';

    await expect(getRepositories.execute(id)).rejects.toBeInstanceOf(AppError);
  });
});
