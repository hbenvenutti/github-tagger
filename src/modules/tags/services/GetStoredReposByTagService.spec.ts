import AppError from '@shared/errors/AppError';
import FakeReposRepository from '../repositories/fake/FakeReposRepository';
import FakeTagsRepository from '../repositories/fake/FakeTagsRepository';
import FakeAssociativeTagsReposRepository from '../repositories/fake/FakeAssociativeTagsReposRepository';
import GetStoredReposByTagService from './GetStoredReposByTagService';
import GithubRepository from '../infra/typeorm/entities/GithubRepository';

describe('GetStoredReposByTag', () => {
  let fakeReposRepository: FakeReposRepository;
  let fakeTagsRepository: FakeTagsRepository;
  let fakeAssociativeTagsRepoRepository: FakeAssociativeTagsReposRepository;
  let getStoredReposByTag: GetStoredReposByTagService;

  beforeEach(() => {
    fakeReposRepository = new FakeReposRepository();
    fakeTagsRepository = new FakeTagsRepository();
    fakeAssociativeTagsRepoRepository = new FakeAssociativeTagsReposRepository();

    getStoredReposByTag = new GetStoredReposByTagService(
      fakeReposRepository,
      fakeTagsRepository,
    );
  });

  it('should be able to filter repositories by tag', async () => {
    // TODO: Find a better way to test queries that have relacion joins;
    const tag = await fakeTagsRepository.create({ name: 'my tag' });

    const [repo] = await fakeReposRepository.create([
      {
        remote_id: 123,
        description: 'description',
        name: 'repo name',
        url: 'http://url.example',
        user_id: 'user id',
      },
    ]);

    const tagRepo = await fakeAssociativeTagsRepoRepository.tagRepo({
      repository_id: repo.id,
      tag_id: tag.id,
    });

    jest
      .spyOn(fakeReposRepository, 'findByTag')
      .mockImplementationOnce(async () => {
        const mockRepo = new GithubRepository();
        const { id, description, name, user_id, url, remote_id } = repo;
        const { repository_id, tag_id } = tagRepo;

        Object.assign(mockRepo, {
          id,
          description,
          name,
          user_id,
          url,
          remote_id,
          tags_repository: [{ repository_id, tag_id }],
        });

        return [mockRepo];
      });

    const [filteredRepo] = await getStoredReposByTag.execute({
      tag: tag.name,
      userId: repo.user_id,
    });

    expect(filteredRepo.id).toEqual(repo.id);
    expect(filteredRepo.tags_repository[0].tag_id).toEqual(tag.id);
    expect(filteredRepo.tags_repository[0].repository_id).toEqual(repo.id);
  });

  it('should not return repository with invalid tag name', async () => {
    await expect(
      getStoredReposByTag.execute({
        tag: 'my tag',
        userId: 'user id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
