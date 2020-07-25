import AppError from '@shared/errors/AppError';
import FakeReposRepository from '../repositories/fake/FakeReposRepository';
import FakeTagsRepository from '../repositories/fake/FakeTagsRepository';
import FakeAssociativeTagsReposRepository from '../repositories/fake/FakeAssociativeTagsReposRepository';
import RemoveTagFromRepoService from './RemoveTagFromRepoService';
import AssociativeTagRepo from '../infra/typeorm/entities/AssociativeTagRepo';

describe('RemoveTagFromRepo', () => {
  let fakeReposRepository: FakeReposRepository;
  let fakeTagsRepository: FakeTagsRepository;
  let fakeAssociativeRepository: FakeAssociativeTagsReposRepository;
  let removeTagFromRepo: RemoveTagFromRepoService;

  beforeEach(() => {
    fakeReposRepository = new FakeReposRepository();
    fakeTagsRepository = new FakeTagsRepository();
    fakeAssociativeRepository = new FakeAssociativeTagsReposRepository();
    removeTagFromRepo = new RemoveTagFromRepoService(
      fakeReposRepository,
      fakeTagsRepository,
      fakeAssociativeRepository,
    );
  });

  it('should be able to remove a tag from repo', async () => {
    const tag = await fakeTagsRepository.create({ name: 'tag' });
    const [repo] = await fakeReposRepository.create([
      {
        remote_id: 123,
        name: 'name',
        description: 'description',
        url: 'http://url.example',
        user_id: 'user id',
      },
    ]);

    jest
      .spyOn(fakeAssociativeRepository, 'findByRepoAndTag')
      .mockImplementationOnce(async () => {
        const taggedRepo = new AssociativeTagRepo();
        Object.assign(taggedRepo, {
          repository_id: repo.id,
          tag_id: tag.id,
          created_at: new Date(),
          updated_at: new Date(),
        });

        return taggedRepo;
      });

    const untag = jest.spyOn(fakeAssociativeRepository, 'untag');

    await removeTagFromRepo.execute({
      repoId: repo.id,
      tagName: tag.name,
    });

    expect(untag).toHaveBeenCalled();
  });

  it('should not be able to remove a tag from invalid repo', async () => {
    await fakeTagsRepository.create({ name: 'tag' });

    await expect(
      removeTagFromRepo.execute({ repoId: 'invalid repo', tagName: 'tag' }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to remove a invalid tag from repo', async () => {
    const [repo] = await fakeReposRepository.create([
      {
        remote_id: 123,
        name: 'name',
        description: 'description',
        url: 'http://url.example',
        user_id: 'user id',
      },
    ]);

    await expect(
      removeTagFromRepo.execute({ repoId: repo.id, tagName: 'tag' }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to remove a tag tha repo does not have', async () => {
    await fakeTagsRepository.create({ name: 'tag' });
    const [repo] = await fakeReposRepository.create([
      {
        remote_id: 123,
        name: 'name',
        description: 'description',
        url: 'http://url.example',
        user_id: 'user id',
      },
    ]);

    await expect(
      removeTagFromRepo.execute({ repoId: repo.id, tagName: 'tag' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
