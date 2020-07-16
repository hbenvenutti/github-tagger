import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateSessionsService from '@modules/users/services/CreateSessionService';

class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const createSession = container.resolve(CreateSessionsService);

    const token = await createSession.execute({ email, password });

    return response.json(token);
  }
}

export default SessionsController;
