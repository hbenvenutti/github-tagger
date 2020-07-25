import { isUuid } from 'uuidv4';
import AppError from '@shared/errors/AppError';
import FakeReposRepository from '../repositories/fake/FakeReposRepository';
import CreateReposService from './CreateReposService';
import IGetStarredReposDTO from '../dtos/IGetStarredReposDTO';

describe('CreateRepos', () => {
  let fakeReposRepository: FakeReposRepository;
  let createRepos: CreateReposService;

  beforeEach(async () => {
    fakeReposRepository = new FakeReposRepository();

    createRepos = new CreateReposService(fakeReposRepository);
  });

  it('should be able to create repositories', async () => {
    const remoteRepos: IGetStarredReposDTO[] = [
      {
        id: 12345,
        description: 'fake description',
        name: 'fake repo',
        url: 'http://fakerepo.example',
      },
    ];

    const repos = await createRepos.execute({ remoteRepos, userId: 'id' });
    const idIsUuid = isUuid(repos[0].id);

    expect(idIsUuid).toBe(true);
    expect(repos[0].name).toEqual(remoteRepos[0].name);
    expect(repos[0].description).toEqual(remoteRepos[0].description);
    expect(repos[0].remote_id).toEqual(remoteRepos[0].id);
    expect(repos[0].user_id).toBe('id');
    expect(repos[0].url).toEqual(remoteRepos[0].url);
  });

  it('should not be able to create repos if there are no remote repos', async () => {
    const remoteRepos: IGetStarredReposDTO[] = [];

    await expect(
      createRepos.execute({ remoteRepos, userId: 'id' }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create repeated repositories', async () => {
    const remoteRepos: IGetStarredReposDTO[] = [
      {
        id: 12345,
        description: 'fake description',
        name: 'fake repo',
        url: 'http://fakerepo.example',
      },
    ];

    await createRepos.execute({ remoteRepos, userId: 'id' });

    await expect(
      createRepos.execute({ remoteRepos, userId: 'id' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
