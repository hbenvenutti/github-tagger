import FakeTokenProvider from '../providers/TokenProvider/fake/FakeTokenProvider';
import FakeUsersRepository from '../repositories/fake/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fake/FakeHashProvider';
import VerifyTokenService from './VerifyTokenService';
import CreateSessionsService from './CreateSessionService';

let fakeTokenProvider: FakeTokenProvider;
let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createSession: CreateSessionsService;

describe('VerifyToken', () => {
  beforeAll(() => {
    fakeTokenProvider = new FakeTokenProvider();
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createSession = new CreateSessionsService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeTokenProvider,
    );
  });
  it('should be able to verify token', async () => {
    const { id, email, password } = await fakeUsersRepository.create({
      username: 'JohnDoe',
      email: 'johndoe@example.com',
      password: 'password',
      github_username: 'johndoe',
    });
    const token = await createSession.execute({ email, password });
    const verifyToken = new VerifyTokenService(fakeTokenProvider);

    const userId = await verifyToken.execute({ token });

    expect(userId).toEqual(id);
  });
});
