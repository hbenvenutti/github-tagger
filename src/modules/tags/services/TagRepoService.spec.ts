import { uuid } from 'uuidv4';
import AppError from '@shared/errors/AppError';
import FakeAssociativeTagsReposRepository from '../repositories/fake/FakeAssociativeTagsReposRepository';
import TagRepoService from './TagRepoService';
import GithubRepository from '../infra/typeorm/entities/GithubRepository';
import Tag from '../infra/typeorm/entities/Tag';

describe('TagRepos', () => {
  let fakeAssociativeTagsReposRepository: FakeAssociativeTagsReposRepository;
  let tagRepo: TagRepoService;

  beforeEach(() => {
    fakeAssociativeTagsReposRepository = new FakeAssociativeTagsReposRepository();
    tagRepo = new TagRepoService(fakeAssociativeTagsReposRepository);
  });

  it('should be able to tag a repository that has no tags', async () => {
    const tag = new Tag();
    const repo = new GithubRepository();
    const id = uuid();

    Object.assign(tag, { id: uuid, name: 'tag' });

    Object.assign(repo, {
      id,
      remote_id: 123,
      name: 'name',
      url: 'url',
      description: 'description',
      // tags_repository: [{ repository_id: id, tag_id: uuid() }],
    });

    const taggedRepo = await tagRepo.execute({ repo, tag });

    expect(taggedRepo.repository_id).toEqual(repo.id);
    expect(taggedRepo.tag_id).toEqual(tag.id);
  });

  it('should be able to tag a repo with several tags', async () => {
    const tag = new Tag();
    const repo = new GithubRepository();
    const id = uuid();

    Object.assign(tag, { id: uuid, name: 'tag' });

    Object.assign(repo, {
      id,
      remote_id: 123,
      name: 'name',
      url: 'url',
      description: 'description',
      tags_repository: [{ repository_id: id, tag_id: uuid() }],
    });

    const taggedRepo = await tagRepo.execute({ repo, tag });

    expect(taggedRepo.repository_id).toEqual(repo.id);
    expect(taggedRepo.tag_id).toEqual(tag.id);
  });

  it('should not be able to tag a repo with a repeated tag', async () => {
    const tag = new Tag();
    const repo = new GithubRepository();
    const id = uuid();

    Object.assign(tag, { id: uuid, name: 'tag' });

    Object.assign(repo, {
      id,
      remote_id: 123,
      name: 'name',
      url: 'url',
      description: 'description',
      tags_repository: [{ repository_id: id, tag_id: tag.id }],
    });

    await expect(tagRepo.execute({ repo, tag })).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
