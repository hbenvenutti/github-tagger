import { isUuid } from 'uuidv4';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fake/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fake/FakeHashProvider';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able to create a new user', async () => {
    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

    const user = await createUser.execute({
      username: 'JohnDoe',
      email: 'johndoe@example.com',
      password: 'password',
      github_token: 'token',
      github_username: 'johndoe',
    });

    const idIsUuid = isUuid(user.id);

    expect(user).toHaveProperty('id');
    expect(idIsUuid).toBe(true);
    expect(user.email).toBe('johndoe@example.com');
    expect(generateHash).toHaveBeenCalledWith(user.password);
    expect(user.github_token).toBe('token');
    expect(user.github_username).toBe('johndoe');
  });

  it('should be able to create a new user without providing a tag', async () => {
    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

    const user = await createUser.execute({
      username: 'JohnDoe',
      email: 'johndoe@example.com',
      password: 'password',
      github_username: 'johndoe',
    });

    const idIsUuid = isUuid(user.id);

    expect(user).toHaveProperty('id');
    expect(idIsUuid).toBe(true);
    expect(user.email).toBe('johndoe@example.com');
    expect(generateHash).toHaveBeenCalledWith(user.password);
    expect(user.github_token).toBe(undefined);
    expect(user.github_username).toBe('johndoe');
  });

  it('should not be able to create user with an email already in use', async () => {
    await createUser.execute({
      username: 'JohnDoe',
      email: 'johndoe@example.com',
      password: 'password',
      github_username: 'johndoe',
    });

    await expect(
      createUser.execute({
        username: 'JohnDoe2',
        email: 'johndoe@example.com',
        password: 'password',
        github_username: 'johndoe',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create user with a username already in use', async () => {
    await createUser.execute({
      username: 'JohnDoe',
      email: 'johndoe@example.com',
      password: 'password',
      github_username: 'johndoe',
    });

    await expect(
      createUser.execute({
        username: 'JohnDoe',
        email: 'johndoe2@example.com',
        password: 'password',
        github_username: 'johndoe',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
