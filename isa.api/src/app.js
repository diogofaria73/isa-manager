import express from 'express';
import cors from 'cors';
import Youch from 'youch';
import routes from './routes';

class App {
  constructor() {
    this.server = express();
  }

  middlewares() {
    this.middlewares.use(cors());
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(err, req).toJSON();

        return res.status(500).json(errors);
      }

      return res
        .status(500)
        .json({ error: 'An internal server error was ocorred' });
    });
  }
}

export default new App().server;
