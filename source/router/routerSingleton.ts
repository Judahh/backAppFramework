/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Router } from 'express';
import { SubjectObserver } from 'journaly';
// @ts-ignore
export default class RouterSingleton {
  // @ts-ignore
  public abstract createRoutes(journaly: SubjectObserver<any>): void;
  protected static _instance: RouterSingleton;

  protected routes: Router;

  protected constructor() {
    this.routes = Router();
  }

  public static getInstance(): RouterSingleton {
    if (!this._instance) {
      this._instance = new this();
    }
    return this._instance;
  }

  public getRoutes(): Router {
    return this.routes;
  }
}
