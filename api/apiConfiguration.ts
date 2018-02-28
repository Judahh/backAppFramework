import * as path from 'path';
// import * as express from 'express';
// import SimpleApi from './simpleApi';
import { Express, RequestHandler, Router, Request, Response, NextFunction } from 'express';
import { StartX } from './startX/startX';
import * as io from 'socket.io';
import * as express from 'express';
import * as compression from 'compression';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as allowCrossDomain from './middleware/allowCrossDomain';
import * as http from 'http';
import { BasicApi } from './basicApi';
// import * as debug from 'debug';

// Creates and configures an ExpressJS web server.
export class ApiConfiguration {

  // ref to Express instance
  // public express: express.Application;
  private express: Express;
  private port: number | string | boolean;
  private server: http.Server;
  private router: Router;
  private api: BasicApi;
  private arrayPath: Array<string>;
  private io;


  // Run configuration methods on the Express instance.
  // tslint:disable-next-line:no-shadowed-variable
  constructor(express: Express, port: number | string | boolean, api: any, arrayPath: Array<string>) {
    this.arrayPath = arrayPath;
    this.api = api;
    this.express = express;
    this.port = port;
    this.configureMiddleware();
    this.configureRoutes();
    this.router = Router();
  }

  public run() {
    this.server = http.createServer(this.express);
    this.io = io(this.server);
    this.api.setIo(this.io);
    this.server.listen(this.port);
    this.api.afterListen();
    this.server.on('error', () => this.onError);
    this.server.on('listening', () => this.onListening());
  }

  // Configure Express middleware.
  private configureMiddleware(): void {
    // this.express.use(allowCrossDomain);
    this.arrayPath.forEach(pathString => {
      this.express.use(express.static(path.resolve(pathString)));
    });
    // this.express.engine('html', require('ejs').renderFile);
    // this.express.set('views', __dirname);
    // this.express.set('view engine', 'html');
    this.express.use(compression({threshold: 0}))
    this.express.use(logger('dev'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  // Configure API endpoints.
  private configureRoutes(): void {
    this.express.use('/', this.api.getRouter());
  }

  // private get(request: Request, response: Response){
  //   response.sendFile(path.resolve('../backApp/index.html'));
  // }

  private onError(error: NodeJS.ErrnoException) {
    if (error.syscall !== 'listen') {
      throw error;
    }
    let bind = (typeof this.port === 'string') ? 'Pipe ' + this.port : 'Port ' + this.port;
    switch (error.code) {
      case 'EACCES':
        console.error(`${bind} requires elevated privileges`);
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(`${bind} is already in use`);
        process.exit(1);
        break;
      default:
        throw error;
    }
  }

  private onListening() {
    let address = this.server.address();
    let bind = (typeof address === 'string') ? `pipe ${address}` : `port ${address.port}`;
    console.log(`Listening on ${bind}`);
    // StartX.getInstance().start();
  }

}
