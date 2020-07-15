import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateUserService from '@modules/users/services/CreateUserService';

class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      username,
      email,
      password,
      github_token,
      github_username,
    } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      email,
      password,
      username,
      github_token,
      github_username,
    });

    delete user.password;

    return response.json(user);
  }
}

export default UsersController;
