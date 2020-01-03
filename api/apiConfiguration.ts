import * as path from 'path';
import * as express from 'express';
import * as io from 'socket.io';
import * as compression from 'compression';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as http from 'http';
import * as staticFile from 'connect-static-file';
import { BasicApi } from './basicApi';
import { Util } from 'basicutil';

// Creates and configures an ExpressJS web server.
export class ApiConfiguration {

  // ref to Express instance
  // private app: express.Application;
  private express: express.Express;
  private server: http.Server;
  private router: express.Router;
  private api: BasicApi;
  private packageJSON: any;
  private io;


  // Run configuration methods on the Express instance.
  // tslint:disable-next-line:no-shadowed-variable
  constructor(expressInstance: express.Express, api: any, packageJSON: any) {
    this.packageJSON = packageJSON;
    this.api = api;
    this.express = expressInstance;
    this.configureMiddleware();
    this.configureRoutes();
    this.router = express.Router();
  }

  public run() {
    this.server = http.createServer(this.express);
    this.io = io(this.server);
    this.api.setIo(this.io);
    this.server.listen(Util.getInstance().normalizePort(this.packageJSON.env.port || 3000));
    this.api.afterListen();
    this.server.on('error', () => this.onError);
    this.server.on('listening', () => this.onListening());
  }

  // Configure Express middleware.
  private configureMiddleware(): void {
    // this.express.use(allowCrossDomain);
    if (this.packageJSON.env.js.compression) {
      console.log('Using Compression')
      this.express.use('*.js', compression({threshold : 0}));
    }
    const manifestFile = 'manifest.json';
    this.express.use('/' + manifestFile, staticFile(path.resolve(manifestFile), {}));
    this.packageJSON.arrayPath.forEach(pathString => {
      this.express.use(express.static(path.resolve(pathString)));
    });
    // this.express.engine('html', require('ejs').renderFile);
    // this.express.set('views', __dirname);
    // this.express.set('view engine', 'html');
    this.express.use(logger('dev'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: true }));
  }

  // Configure API endpoints.
  private configureRoutes(): void {
    this.express.use('/', this.api.getRouter());
  }

  private onError(error: NodeJS.ErrnoException) {
    if (error.syscall !== 'listen') {
      throw error;
    }
    let bind = (typeof this.packageJSON.env.port === 'string') ? 'Pipe ' + this.packageJSON.env.port : 'Port ' + this.packageJSON.env.port;
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
