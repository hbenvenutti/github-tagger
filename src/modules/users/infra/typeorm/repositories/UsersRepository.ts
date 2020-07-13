import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { Repository, getRepository } from 'typeorm';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import User from '../entities/User';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create(data: ICreateUserDTO): Promise<User>;

  public async findByEmail(email: string): Promise<User | undefined>;

  public async findByUsername(username: string): Promise<User | undefined>;
}

export default UsersRepository;
