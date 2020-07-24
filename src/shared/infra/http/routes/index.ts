import { Router, Response, Request } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import reposRouter from '@modules/tags/infra/http/routes/repos.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/repositories', reposRouter);

// TODO: get api to another file, and just import it here
const api = {
  users: {
    createUser: {
      route: 'post /users',
      request: {
        body: {
          username: 'string',
          password: 'string',
          github_token: 'string | undefined',
          github_username: 'string',
          email: 'string',
        },
        response: {
          body: {
            username: 'string',
            github_token: 'string | undefined',
            email: 'string',
            created_at: 'date',
            update_at: 'date',
          },
        },
      },
    },
  },
};

routes.get('/', (request: Request, response: Response) => {
  return response.json(api);
});
export default routes;
