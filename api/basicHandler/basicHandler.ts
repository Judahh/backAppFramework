import { Socket } from 'basicsocket';
import { BasicHardwareHandler } from './../hardwareHandler/basicHardwareHandler';

export class BasicHandler {
    protected arraySocket: Array<Socket>;
    protected hardwareHandler;

    constructor(hardwareHandler: BasicHardwareHandler) {
        this.arraySocket = new Array<Socket>();
        this.hardwareHandler = hardwareHandler;
    }

    public addSocket(socket: Socket) {
        let _self = this;
        let basicSocket = socket.getBasicSocket();
        basicSocket.on('disconnect', (reason) => { _self.onServerDisconnected(socket, reason); });
        this.configSocket(socket);
        this.onServerConnected(socket);
    }

    // tslint:disable-next-line:no-empty
    protected configSocket(socket: Socket) { }

    // tslint:disable-next-line:no-empty
    protected init() { }

    protected serverConnected(socket: Socket) {
        console.log('CONNECTED');
    }

    protected serverDisconnected(socket: Socket, reason) {
        console.log('DISCONNECTED', reason);
    }

    private onServerConnected(socket: Socket) {
        this.arraySocket.push(socket);
        this.serverConnected(socket);
    }

    private onServerDisconnected(socket: Socket, reason) {
        let index = this.arraySocket.indexOf(socket);
        if (index > -1) {
            this.arraySocket.splice(index, 1);
        }
        this.serverDisconnected(socket, reason);
    }
}
