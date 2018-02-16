import { Router, Request, Response, NextFunction } from 'express';
import { BasicSocket } from './../socket/basicSocket'
import * as path from 'path';

export class BasicAppHandler {
    protected router: Router;
    protected arraySocket: Array<BasicSocket>;

    constructor() {
        this.router = Router();
        this.arraySocket = new Array<BasicSocket>();

        let _self = this;

        this.router.get('/', (request: Request, response: Response, nextFunction: NextFunction) => { _self.getPage(request, response, nextFunction); });
        this.router.get('/refresh', (request: Request, response: Response, nextFunction: NextFunction) => { _self.refresh(request, response, nextFunction); });

        this.router.post('/', (request: Request, response: Response, nextFunction: NextFunction) => { _self.getPage(request, response, nextFunction); });
        this.router.post('/refresh', (request: Request, response: Response, nextFunction: NextFunction) => { _self.refresh(request, response, nextFunction); });

        this.init();

        this.pageRouting();
    }

    public pageRouting() {
        this.router.get('/:page', this.getNewPage);
        this.router.post('/:page', this.getNewPage);
    }

    public getPage(request: Request, response: Response, nextFunction: NextFunction) {
        response.sendFile(path.resolve('index.html'));
        console.info('getPage');
    }

    public getNewPage(request: Request, response: Response, nextFunction: NextFunction) {
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

    public refresh(request: Request, response: Response, nextFunction: NextFunction) {
        // WebhookConnector.getInstance().upgrade(request.body);
    }

    protected serverConnected(basicSocket) {
        console.log('CONNECTED');
    }

    protected serverDisconnected(basicSocket, reason) {
        console.log('DISCONNECTED', reason);
    }

    public addSocket(basicSocket: BasicSocket) {
        let _self = this;
        this.arraySocket.push(basicSocket);
        this.serverConnected(basicSocket);
        basicSocket.on('disconnect', (reason) => { _self.serverDisconnected(basicSocket, reason); });
        this.configSocket(basicSocket);
    }

    public configSocket(basicSocket: BasicSocket) { }

    public init() { }

    public getRouter() {
        return this.router;
    }

}
