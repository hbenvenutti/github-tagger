import { isUuid } from 'uuidv4';
import FakeTagsRepository from '../repositories/fake/FakeTagsRepository';
import CreateTagService from './CreateTagService';

describe('Create Tag', () => {
  let fakeTagsRepository: FakeTagsRepository;
  let createTag: CreateTagService;

  beforeEach(() => {
    fakeTagsRepository = new FakeTagsRepository();
    createTag = new CreateTagService(fakeTagsRepository);
  });

  it('should be able to tag repository', async () => {
    const tag = await createTag.execute({ tagName: 'tag' });

    const idIsUuid = isUuid(tag.id);

    expect(idIsUuid).toBe(true);
    expect(tag.name).toBe('tag');
  });

  it('should not create repeated tags', async () => {
    const create = jest.spyOn(fakeTagsRepository, 'create');

    await fakeTagsRepository.create({ name: 'tag' });

    await createTag.execute({ tagName: 'tag' });

    expect(create).toHaveBeenCalledTimes(1);
  });
});
