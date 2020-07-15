import { Request, Response } from 'express';

class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    return response.json({ message: 'sessions' });
  }
}

export default SessionsController;
