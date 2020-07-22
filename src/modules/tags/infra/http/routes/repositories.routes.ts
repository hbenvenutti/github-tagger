import { Router } from 'express';

import ensureAuthentication from '@modules/users/infra/http/middlewares/ensureAuthentication';
import RepositoryController from '../controllers/RepositoryController';

const repositoryRouter = Router();

const respositoryController = new RepositoryController();

repositoryRouter.use(ensureAuthentication);

repositoryRouter.get('/', respositoryController.index);

export default repositoryRouter;
