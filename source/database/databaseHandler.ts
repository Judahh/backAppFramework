/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Handler } from 'flexiblepersistence';
import { Journaly, SubjectObserver } from 'journaly';
import { DatabaseInitializer, DAOAdapter } from '@flexiblepersistence/dao';
import { PersistenceAdapter } from 'flexiblepersistence';
import DatabaseHandlerInitializer from './databaseHandlerInitializer';
// @ts-ignore
export default abstract class DatabaseHandler {
  // @ts-ignore
  protected journaly: SubjectObserver<any>;

  public getJournaly(): SubjectObserver<any> {
    return this.journaly;
  }
  public service: {
    [name: string]: PersistenceAdapter;
  } = {
    // test: exampleService,
  };

  public dAO: {
    [name: string]: DAOAdapter;
  } = {
    // test: exampleDAO
  };
  // @ts-ignore
  protected eventHandler: Handler;
  // @ts-ignore
  protected readPool: any;
  // Operation[Operation["existent"] = 0] = "existent";
  // Operation[Operation["create"] = 1] = "create";
  // Operation[Operation["read"] = 2] = "read";
  // Operation[Operation["correct"] = 3] = "correct";
  // Operation[Operation["update"] = 4] = "update";
  // Operation[Operation["nonexistent"] = 5] = "nonexistent";
  // Operation[Operation["delete"] = 6] = "delete";
  protected operation: {
    [operation: number]: string;
  } = {
    0: 'storeElement',
    1: 'storeElement',
    2: 'updateElement',
    3: 'updateElement',
    4: 'deleteElement',
    5: 'deleteElement',
  };

  protected static _instance: DatabaseHandler;

  protected constructor(init?: DatabaseHandlerInitializer) {
    if (init) {
      this.journaly = init.journaly;
      if (init.eventHandler) this.eventHandler = init.eventHandler;
      if (init.readPool) this.readPool = init.readPool;
      this.initDAO();
      this.initService();
    }
  }
  protected abstract initDAO(): void;
  protected abstract initService(): void;

  public getEventHandler(): Handler {
    return this.eventHandler;
  }

  public getReadPool(): any {
    return this.readPool;
  }

  public static getInstance(
    init?: DatabaseHandlerInitializer
  ): DatabaseHandler {
    if (!this._instance) {
      // @ts-ignore
      this._instance = new this(init);
    }
    return this._instance;
  }
}
