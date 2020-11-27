/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
// file deepcode ignore no-any: any needed
import { Handler } from 'flexiblepersistence';
import { SubjectObserver } from 'journaly';
import DatabaseHandlerInitializer from './databaseHandlerInitializer';
// @ts-ignore
export default abstract class DatabaseHandler {
  // @ts-ignore
  protected init?: DatabaseHandlerInitializer;

  getJournaly(): SubjectObserver<any> | undefined {
    return this.init?.journaly;
  }

  getHandler(): Handler | undefined {
    return this.init?.handler;
  }

  protected static _instance: DatabaseHandler;

  protected constructor(init?: DatabaseHandlerInitializer) {
    this.init = init;
  }

  getInit(): DatabaseHandlerInitializer {
    if (this.init) return this.init;
    throw new Error('DatabaseHandler must have a init.');
  }

  static getInstance(init?: DatabaseHandlerInitializer): DatabaseHandler {
    if (!this._instance) {
      // @ts-ignore
      this._instance = new this(init);
    }
    return this._instance;
  }
}
