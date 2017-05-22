import * as path from 'path';
// import * as express from 'express';
import Page from './backApp/page/Page';
import {Express, RequestHandler, Router, Request, Response, NextFunction} from 'express';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import allowCrossDomain = require("./middleware/allowCrossDomain");
import * as http from 'http';
// import * as debug from 'debug';

// Creates and configures an ExpressJS web server.
export class BackApp {

  // ref to Express instance
  // public express: express.Application;
  private express: Express;
  private port: number|string|boolean;
  private server: http.Server;
  private router: Router;

  //Run configuration methods on the Express instance.
  constructor(express: Express, port: number|string|boolean) {
    this.express=express;
    this.port=port;
    this.configureMiddleware();
    this.configureRoutes();
    this.router = Router();
  }
 
//   

  // Configure Express middleware.
  private configureMiddleware(): void {
    //this.express.use(allowCrossDomain);
    this.express.use(express.static(path.resolve('public')));
    this.express.use(logger('dev'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  // Configure API endpoints.
  private configureRoutes(): void {
    /* This is just to get up and running, and to make sure what we've got is
     * working so far. This function will change when we start to add more
     * API endpoints */
    // let router = express.Router();
    
    // placeholder route handler
    // router.get('/', (req, res, next) => {
    //   res.json({
    //     message: 'Hello World!'
    //   });
    // });
    this.express.use('/', Page);
  }

  public run() {
      // this.express.listen(this.port);  
      console.info('ts-express:server');
      this.server = http.createServer(this.express);
      this.server.listen(this.port);
      this.server.on('error', () => this.onError);
      this.server.on('listening', () => this.onListening());
      // this.router.get('/', this.get);
  }

  // private get(request: Request, response: Response){
  //   response.sendFile(path.resolve('public/index.html'));
  // }

  private onError(error: NodeJS.ErrnoException){
    if (error.syscall !== 'listen') throw error;
    let bind = (typeof this.port === 'string') ? 'Pipe ' + this.port : 'Port ' + this.port;
    switch(error.code) {
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

  private onListening(){
    let address = this.server.address();
    let bind = (typeof address === 'string') ? `pipe ${address}` : `port ${address.port}`;
    console.info(`Listening on ${bind}`);
  }

}

// export default new API().express;