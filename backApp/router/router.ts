// import {Router, Request, Response, NextFunction} from 'express';
// import * as logger from 'morgan';

// export class Router {
//   router: Router

//   /**
//    * Initialize the HeroRouter
//    */
//   constructor() {
//     this.router = Router();
//     this.init();
//   }

//   /**
//    * GET all Heroes.
//    */
//   public getAll(request: Request, response: Response, nextFunction: NextFunction) {
//     response.send("formA:"+JSON.stringify(request.body));
//   }

//   /**
//    * GET one hero by id
//    */
//   public getOne(request: Request, response: Response, nextFunction: NextFunction) {
//     response.send("formA:"+request.params._body+request.params.body+request.params.form);
//   }

//   /**
//    * Take each handler, and attach to one of the Expresponses.Router's
//    * endpoints.
//    */
//   init() {
//     this.router.get('/', this.getAll);
//     this.router.get('/:id', this.getOne);
//     this.router.post('/', this.getAll);
//     this.router.post('/:id', this.getOne);
//   }

// }

// // Create the HeroRouter, and export its configured Expresponses.Router
// const hire = new Hire();
// hire.init();

// export default hire.router;