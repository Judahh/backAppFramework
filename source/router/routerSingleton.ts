/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Router } from 'express';
import DatabaseHandlerInitializer from '../database/databaseHandlerInitializer';
// @ts-ignore
export default class RouterSingleton {
  // @ts-ignore
  public abstract createRoutes(initDefault?: DatabaseHandlerInitializer): void;
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
