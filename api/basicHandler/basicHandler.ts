import { BasicSocket } from './../socket/basicSocket';
import { BasicHardwareHandler } from './../hardwareHandler/basicHardwareHandler';

export class BasicHandler {
    protected arraySocket: Array<BasicSocket>;
    protected hardwareHandler;

    constructor(hardwareHandler: BasicHardwareHandler) {
        this.arraySocket = new Array<BasicSocket>();
        this.hardwareHandler = hardwareHandler;
    }

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
        var index = this.arraySocket.indexOf(basicSocket);
        if (index > -1) {
            this.arraySocket.splice(index, 1);
        }
        this.serverDisconnected(basicSocket, reason);
    }

    public addSocket(basicSocket: BasicSocket) {
        let _self = this;
        this.onServerConnected(basicSocket);
        basicSocket.on('disconnect', (reason) => { _self.onServerDisconnected(basicSocket, reason); });
        this.configSocket(basicSocket);
    }

    public configSocket(basicSocket: BasicSocket) { }

    protected init() { }
}
