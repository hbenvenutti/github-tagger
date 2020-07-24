import { Router } from 'express';

import ensureAuthentication from '@modules/users/infra/http/middlewares/ensureAuthentication';
import ReposController from '../controllers/ReposController';
import TagsController from '../controllers/TagsController';

const repositoryRouter = Router();

const repositoryController = new ReposController();
const tagsController = new TagsController();

repositoryRouter.use(ensureAuthentication);

repositoryRouter.post('/', repositoryController.store);
repositoryRouter.post('/tags/:id', tagsController.store);
// repositoryRouter.get('/', repositoryController.index);

export default repositoryRouter;
