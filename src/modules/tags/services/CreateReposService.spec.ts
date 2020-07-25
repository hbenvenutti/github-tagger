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
    const [remoteRepo]: IGetStarredReposDTO[] = [
      {
        id: 12345,
        description: 'fake description',
        name: 'fake repo',
        url: 'http://fakerepo.example',
      },
    ];

    const [repo] = await createRepos.execute({
      remoteRepos: [remoteRepo],
      userId: 'id',
    });
    const idIsUuid = isUuid(repo.id);

    expect(idIsUuid).toBe(true);
    expect(repo.name).toEqual(remoteRepo.name);
    expect(repo.description).toEqual(remoteRepo.description);
    expect(repo.remote_id).toEqual(remoteRepo.id);
    expect(repo.user_id).toBe('id');
    expect(repo.url).toEqual(remoteRepo.url);
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
