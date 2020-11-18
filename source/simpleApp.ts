import express from 'express';
import cors from 'cors';

import RouterSingleton from './router/routerSingleton';
import { SubjectObserver } from 'journaly';

export default class SimpleApp {
  public express: express.Application;
  public router;

  protected journaly: SubjectObserver<any>;

  public constructor(router: RouterSingleton, journaly: SubjectObserver<any>) {
    this.express = express();
    this.middlewares();
    this.router = router;
    this.journaly = journaly;
    this.routes(journaly);
  }

  protected middlewares(): void {
    this.express.use(express.json());
    this.express.use(cors());
  }

  protected routes(journaly: SubjectObserver<any>): void {
    this.router.createRoutes(journaly);
    this.express.use(this.router.getRoutes());
  }
}
