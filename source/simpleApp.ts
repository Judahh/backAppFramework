import express from 'express';
import cors from 'cors';

import RouterSingleton from './router/routerSingleton';
import DatabaseHandlerInitializer from './database/databaseHandlerInitializer';

export default class SimpleApp {
  express: express.Application;
  router: RouterSingleton;

  protected initDefault?: DatabaseHandlerInitializer;

  constructor(
    router: RouterSingleton,
    initDefault?: DatabaseHandlerInitializer
  ) {
    this.express = express();
    this.middlewares();
    this.router = router;
    this.initDefault = initDefault;
    this.routes(initDefault);
  }

  protected middlewares(): void {
    this.express.use(express.json());
    this.express.use(cors());
  }

  protected routes(initDefault?: DatabaseHandlerInitializer): void {
    this.router.createRoutes(initDefault);
    this.express.use(this.router.getRoutes());
  }
}
