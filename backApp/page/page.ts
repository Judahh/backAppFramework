import {Router, Request, Response, NextFunction} from 'express';
import * as logger from 'morgan';
import * as path from 'path';
import * as childProcess from 'child_process';

export class Page {
  private router: Router

  /**
   * Initialize the HeroRouter
   */
  constructor() {
    this.router = Router();
    this.init();
  }

  public getRouter(){
      return this.router;
  }
  /**
   * GET all Heroes.
   */
  public getPage(request: Request, response: Response, nextFunction: NextFunction) {
    response.sendFile(path.resolve('public/index.html'));
  }

  /**
   * GET one hero by id
   */
  public getOne(request: Request, response: Response, nextFunction: NextFunction) {
    response.send("formA:"+request.params._body+request.params.body+request.params.form);
  }

  /**
   * GET all Heroes.
   */
  public refresh(request: Request, response: Response, nextFunction: NextFunction) {
    console.log(request.body.pusher.name + " pushed to " + request.body.repository.name);
    console.log("Pulling code from Github...");

    // reset any changes that have been made locally
    childProcess.exec('git -C /home/projects/backAppFramework reset --hard', this.execCallback);

    // and ditch any files that have been added locally too
    childProcess.exec('git -C /home/projects/backAppFramework clean -df', this.execCallback);

    // now pull down the latest
    childProcess.exec('git -C /home/projects/backAppFramework pull -f', this.execCallback);

    // and npm install with --production
    childProcess.exec('npm -C /home/projects/backAppFramework install', this.execCallback);

    // and run tsc
    childProcess.exec('tsc', this.execCallback);

  }

  public execCallback(err, stdout, stderr) {
    if(stdout) console.log(stdout);
    if(stderr) console.log(stderr);
  }

  /**
   * Take each handler, and attach to one of the Expresponses.Router's
   * endpoints.
   */
  init() {
    this.router.get('/', this.getPage);
    this.router.get('/:id', this.getOne);
    this.router.post('/', this.getPage);
    this.router.post('/:id', this.getOne);
    this.router.post('/refresh', this.refresh);
  }

}

// Create the HeroRouter, and export its configured Expresponses.Router .
const page = new Page();
page.init();

export default page.getRouter();