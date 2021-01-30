import {Request, Response, Router} from 'express';
import {ParamsDictionary} from 'express-serve-static-core';
import {paramMissingError} from '../shared/constants';
import {InMemoryCampProjectRepository, CampProjectRepository} from './camp-project.repository';
import {StatusCodes} from 'http-status-codes';

function campProjectRouter(campProjectRepository: CampProjectRepository = InMemoryCampProjectRepository.empty()): Router {
  const router = Router();

  router.get('', async (req: Request, res: Response) => {
    const projects = await campProjectRepository.findAll();
    return res.status(StatusCodes.OK).json({content: projects, count: projects.length});
  });

  router.post('', async (req: Request, res: Response) => {
    const {project} = req.body;
    const existingProject = await campProjectRepository.findById(project.id);
    await campProjectRepository.save(project);
    return res.status(StatusCodes.CREATED).end();
  });

  return router;
}

export default campProjectRouter;
