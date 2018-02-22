import { BasicSocket } from 'basicSocket';
import { BasicHardwareHandler } from './../hardwareHandler/basicHardwareHandler';

export class BasicHandler {
    protected arraySocket: Array<BasicSocket>;
    protected hardwareHandler;

    constructor(hardwareHandler: BasicHardwareHandler) {
        this.arraySocket = new Array<BasicSocket>();
        this.hardwareHandler = hardwareHandler;
    }

    public addSocket(basicSocket: BasicSocket) {
        let _self = this;
        basicSocket.on('disconnect', (reason) => { _self.onServerDisconnected(basicSocket, reason); });
        this.configSocket(basicSocket);
        this.onServerConnected(basicSocket);
    }

    // tslint:disable-next-line:no-empty
    protected configSocket(basicSocket: BasicSocket) { }

    // tslint:disable-next-line:no-empty
    protected init() { }

    protected serverConnected(basicSocket) {
        console.log('CONNECTED');
    }

    protected serverDisconnected(basicSocket, reason) {
        console.log('DISCONNECTED', reason);
    }

    private onServerConnected(basicSocket) {
        this.arraySocket.push(basicSocket);
        this.serverConnected(basicSocket);
    }

    private onServerDisconnected(basicSocket, reason) {
        let index = this.arraySocket.indexOf(basicSocket);
        if (index > -1) {
            this.arraySocket.splice(index, 1);
        }
        this.serverDisconnected(basicSocket, reason);
    }
}
