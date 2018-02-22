import { Router, Request, Response, NextFunction } from 'express';
import { BasicSocket } from 'basicSocket'
import { BasicHandler } from '../basicHandler/basicHandler';
import { BasicHardwareHandler } from './../hardwareHandler/basicHardwareHandler';
import * as path from 'path';

export class BasicAppHandler extends BasicHandler {
    protected router: Router;

    constructor(hardwareHandler: BasicHardwareHandler) {
        super(hardwareHandler);
        this.router = Router();

        let _self = this;

        this.router.get('/', (request: Request, response: Response, nextFunction: NextFunction) => { _self.getPage(request, response, nextFunction); });
        this.router.get('/refresh', (request: Request, response: Response, nextFunction: NextFunction) => { _self.refresh(request, response, nextFunction); });

        this.router.post('/', (request: Request, response: Response, nextFunction: NextFunction) => { _self.getPage(request, response, nextFunction); });
        this.router.post('/refresh', (request: Request, response: Response, nextFunction: NextFunction) => { _self.refresh(request, response, nextFunction); });

        this.init();

        this.pageRouting();
    }

    public getRouter() {
        return this.router;
    }

    protected refresh(request: Request, response: Response, nextFunction: NextFunction) {
        // WebhookConnector.getInstance().upgrade(request.body);
    }

    private pageRouting() {
        this.router.get('/:page', this.getNewPage);
        this.router.post('/:page', this.getNewPage);
    }

    private getPage(request: Request, response: Response, nextFunction: NextFunction) {
        response.sendFile(path.resolve('index.html'));
        console.info('getPage');
    }

    private getNewPage(request: Request, response: Response, nextFunction: NextFunction) {
        // response.sendFile(path.resolve('index.html'));
        // response.send(request.baseUrl);
        console.info('request.baseUrl:' + request.path);
        // if (request.path.indexOf('undefined') == -1) {
        // console.log('COOKIE:'+request.path.substr(1));
        response.cookie('page', request.path.substr(1));
        // }
        response.redirect('/');
        console.info('getNewPage');
    }
}
