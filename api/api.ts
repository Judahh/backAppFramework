import {Router, Request, Response, NextFunction} from 'express';
import * as logger from 'morgan';
import * as path from 'path';
import {Terminal} from './terminal/terminal';
import {Electron} from './electron/electron';

export class Api {
  private router: Router;
  private electron: Electron;

  /**
   * Initialize the HeroRouter
   */
  constructor() {
    this.router = Router();
    this.init();
    Terminal.getInstance().startNgrok();
  }

  public getRouter(){
      return this.router;
  }
  /**
   * GET all Heroes.
   */
  public getPage(request: Request, response: Response, nextFunction: NextFunction) {
    response.sendFile(path.resolve('../backApp/index.html'));
    console.info("getPage");
  }

  /**
   * GET one hero by id
   */
  public getOne(request: Request, response: Response, nextFunction: NextFunction) {
    response.send("formA:"+request.params._body+request.params.body+request.params.form);
    console.info("getOne");
  }

  /**
   * GET all Heroes.
   */
  public refresh(request: Request, response: Response, nextFunction: NextFunction) {
    Terminal.getInstance().upgrade(request.body.pusher,request.body.repository);
  }

  /**
   * Take each handler, and attach to one of the Expresponses.Router's
   * endpoints.
   */
  init() {
    this.router.get('/', this.getPage);
    // this.router.get('/:id', this.getOne);
    this.router.get('/refresh', this.refresh);
    this.router.post('/', this.getPage);
    // this.router.post('/:id', this.getOne);
    this.router.post('/refresh', this.refresh);
    this.electron=new Electron();
  }

}

// Create the HeroRouter, and export its configured Expresponses.Router .
const api = new Api();
// api.init();

export default api.getRouter();