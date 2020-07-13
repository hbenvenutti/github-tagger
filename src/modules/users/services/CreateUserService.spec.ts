import 'reflect-metadata';
import { isUuid } from 'uuidv4';
import AppError from '@shared/errors/AppError';
import CreateUserService from './CreateUserService';
import FakeUsersRepository from '../repositories/fake/FakeUsersRepository';

let fakeUsersRepository: FakeUsersRepository;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    createUser = new CreateUserService(fakeUsersRepository);
  });

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      username: 'JohnDoe',
      email: 'johndoe@example.com',
      password: 'password',
      github_token: 'token',
    });

    const idIsUuid = isUuid(user.id);

    expect(user).toHaveProperty('id');
    expect(idIsUuid).toBe(true);
    expect(user.email).toBe('johndoe@example.com');
    expect(user.password).toBe('password');
    expect(user.github_token).toBe('token');
  });

  it('should be able to create a new user without providing a tag', async () => {
    const user = await createUser.execute({
      username: 'JohnDoe',
      email: 'johndoe@example.com',
      password: 'password',
    });

    const idIsUuid = isUuid(user.id);

    expect(user).toHaveProperty('id');
    expect(idIsUuid).toBe(true);
    expect(user.email).toBe('johndoe@example.com');
    expect(user.password).toBe('password');
    expect(user.github_token).toBe(undefined);
  });

  it('should not be able to create user with an email already in use', async () => {
    await createUser.execute({
      username: 'JohnDoe',
      email: 'johndoe@example.com',
      password: 'password',
    });

    await expect(
      createUser.execute({
        username: 'JohnDoe2',
        email: 'johndoe@example.com',
        password: 'password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create user with a username already in use', async () => {
    await createUser.execute({
      username: 'JohnDoe',
      email: 'johndoe@example.com',
      password: 'password',
    });

    await expect(
      createUser.execute({
        username: 'JohnDoe',
        email: 'johndoe2@example.com',
        password: 'password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
