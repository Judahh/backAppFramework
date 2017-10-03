import {Router, Request, Response, NextFunction} from 'express';
// import * as logger from 'morgan';
import * as path from 'path';
import {WebhookConnector} from './git/webhookConnector/webhookConnector';
import {Electron} from './electron/electron';
import {Api} from './../../api/api';

export {Router, Request, Response, NextFunction, path}

export class SimpleApi {
  private router: Router;
  private electron: Electron;
  private api: Api;

  /**
   * Initialize the HeroRouter
   */
  constructor() {
    this.router = Router();
    this.api = new Api(this.router);
    this.init();
    // WebhookConnector.getInstance().startNgrok();
  }

  public getRouter(){
      return this.router;
  }

  /**
   * Take each handler, and attach to one of the Expresponses.Router's
   * endpoints.
   */
  init() {
    this.api.init();
    this.electron=new Electron();
  }

}

// Create the HeroRouter, and export its configured Expresponses.Router .
const simpleApi = new SimpleApi();
// api.init();

export default simpleApi.getRouter();