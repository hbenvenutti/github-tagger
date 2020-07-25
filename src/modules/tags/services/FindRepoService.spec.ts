import { isUuid } from 'uuidv4';
import AppError from '@shared/errors/AppError';
import FakeReposRepository from '../repositories/fake/FakeReposRepository';
import FindRepoService from './FindRepoService';
import GithubRepository from '../infra/typeorm/entities/GithubRepository';

describe('FindRepo', () => {
  let fakeReposRepository: FakeReposRepository;
  let findRepo: FindRepoService;
  let repos: GithubRepository[];

  beforeEach(async () => {
    fakeReposRepository = new FakeReposRepository();
    findRepo = new FindRepoService(fakeReposRepository);

    repos = await fakeReposRepository.create([
      {
        remote_id: 123,
        name: 'fake repo',
        description: 'fake description',
        url: 'http://fakeurl.example',
        user_id: 'user id',
      },
    ]);
  });

  it('should be able to find repository', async () => {
    const { id } = repos[0];
    const repo = await findRepo.execute({ repoId: id });

    const idIsUuid = isUuid(repo.id);

    expect(idIsUuid).toBe(true);
    expect(repo.description).toBe('fake description');
    expect(repo.name).toBe('fake repo');
    expect(repo.remote_id).toBe(123);
    expect(repo.description).toBe('fake description');
    expect(repo.url).toBe('http://fakeurl.example');
  });

  it('should not return a repositorie receiving a invalid id', async () => {
    const id = 'invalid id';

    await expect(findRepo.execute({ repoId: id })).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
