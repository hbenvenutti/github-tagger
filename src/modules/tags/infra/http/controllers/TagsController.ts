import { Request, Response } from 'express';

class TagsController {
  public async store(request: Request, responsse: Response): Promise<Response> {
    // const { id } = request.params;

    // buscar repo no db
    // criar tag
    // criar tag_repo
    return responsse.status(203);
  }
}

export default TagsController;
