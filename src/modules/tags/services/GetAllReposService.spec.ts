import { isUuid } from 'uuidv4';
import FakeReposRepository from '../repositories/fake/FakeReposRepository';
import GetAllReposService from './GetAllReposService';

describe('GetAllRepos', () => {
  let fakeReposRepository: FakeReposRepository;
  let getAllRepos: GetAllReposService;

  beforeEach(async () => {
    fakeReposRepository = new FakeReposRepository();
    getAllRepos = new GetAllReposService(fakeReposRepository);

    await fakeReposRepository.create([
      {
        remote_id: 123,
        name: 'fake repo',
        description: 'fake description',
        url: 'http://fakeurl.example',
        user_id: 'user id',
      },
    ]);
  });

  it('should be able to list repos', async () => {
    const repos = await getAllRepos.execute({ userId: 'user id' });

    const idIsUuid = isUuid(repos[0].id);

    expect(idIsUuid).toBe(true);
    expect(repos[0].description).toBe('fake description');
    expect(repos[0].name).toBe('fake repo');
    expect(repos[0].remote_id).toBe(123);
    expect(repos[0].description).toBe('fake description');
    expect(repos[0].url).toBe('http://fakeurl.example');
  });

  it('should return an empty array if no repositories are found', async () => {
    const repos = await getAllRepos.execute({ userId: 'invalid id' });

    expect(repos).toEqual([]);
  });
});
