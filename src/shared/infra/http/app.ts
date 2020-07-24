import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import AppError from '@shared/errors/AppError';
import routes from './routes';

class App {
  server = express();

  constructor() {
    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }

  exceptionHandler() {
    this.server.use(
      (err: Error, request: Request, response: Response, _: NextFunction) => {
        if (err instanceof AppError) {
          return response.status(err.statusCode).json({
            status: 'error',
            message: err.message,
          });
        }
        if (process.env.ENVIRONMENT === 'develop') {
          return response.status(500).json({
            status: 'error',
            message: `log: ${err.message}`,
          });
        }
        return response.status(500).json({
          status: 'error',
          message: 'internal server error',
        });
      },
    );
  }
}

export default new App().server;
