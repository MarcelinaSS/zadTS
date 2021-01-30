import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';

import express, {Request, Response, NextFunction, Router, Express} from 'express';
import 'express-async-errors';

import campProjectRouter from './camp-projects/camp-project.router';
import logger from './shared/Logger';
import {InMemoryCampProjectRepository} from './camp-projects/camp-project.repository';
import {StatusCodes} from 'http-status-codes';

const DEFAULT_API_ROUTES = [
  {
    route: '/camp-projects',
    router: campProjectRouter(InMemoryCampProjectRepository.empty())
  }
]

function expressApp(apiRoutes: { route: string, router: Router }[] = DEFAULT_API_ROUTES): Express {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({extended: true}));
  app.use(cookieParser());
  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }
  if (process.env.NODE_ENV === 'production') {
    app.use(helmet());
  }

  const apiRouter = Router();
  apiRoutes.map(route => apiRouter.use(route.route, route.router))
  app.use('/api', apiRouter);

  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error(err.message, err);
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: err.message,
    });
  });

  return app;
}

export default expressApp;
