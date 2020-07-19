import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fake/FakeUsersRepository';
import FakeTokenProvider from '../providers/TokenProvider/fake/FakeTokenProvider';
import FakeHashProvider from '../providers/HashProvider/fake/FakeHashProvider';
import CreateSessionsService from './CreateSessionService';
import CreateUserService from './CreateUserService';

describe('CreateSession', () => {
  let fakeUsersRepository: FakeUsersRepository;
  let fakeHashProvider: FakeHashProvider;
  let fakeTokenProvider: FakeTokenProvider;
  let createUser: CreateUserService;
  let createSession: CreateSessionsService;

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeTokenProvider = new FakeTokenProvider();
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    createSession = new CreateSessionsService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeTokenProvider,
    );
  });

  it('should be able to create a session', async () => {
    const signToken = jest.spyOn(fakeTokenProvider, 'signToken');
    const { id, email, password } = await createUser.execute({
      username: 'JohnDoe',
      email: 'johndoe@example.com',
      password: 'password',
      github_token: 'token',
      github_username: 'johndoe',
    });

    await createSession.execute({ email, password });

    expect(signToken).toHaveBeenCalledWith(id);
  });

  it('should not be able to authenticate without a valid email', async () => {
    const { password } = await createUser.execute({
      username: 'JohnDoe',
      email: 'johndoe@example.com',
      password: 'password',
      github_token: 'token',
      github_username: 'johndoe',
    });

    await expect(
      createSession.execute({ email: 'wrong-email', password }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate without the correct password', async () => {
    const { email } = await createUser.execute({
      username: 'JohnDoe',
      email: 'johndoe@example.com',
      password: 'password',
      github_token: 'token',
      github_username: 'johndoe',
    });

    await expect(
      createSession.execute({ email, password: 'wrong-password' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
