import { Socket } from 'basicsocket'
import { BasicHandler } from './../basicHandler/basicHandler'
import { BasicHardwareHandler } from './../hardwareHandler/basicHardwareHandler';
import * as ioClient from 'socket.io-client';

export class BasicExternalHandler extends BasicHandler {
    protected identification: any;
    protected arraySocketClient: Array<Socket>;

    constructor(hardwareHandler: BasicHardwareHandler) {
        super(hardwareHandler);
        this.arraySocketClient = new Array<Socket>();
        this.init();
    }

    public connectToServer(serverAddress, identification?: any) {
        let _self = this;
        let socketClient = ioClient(serverAddress);
        socketClient.on('connect', () => { _self.onClientConnected(socketClient, serverAddress, identification); });
    }

    protected clientConnected(socket: Socket) {
        console.log('CONNECTED');
    }

    protected clientDisconnected(socket: Socket, reason) {
        console.log('DISCONNECTED', reason);
    }

    // tslint:disable-next-line:no-empty
    protected configSocketClient(socket: Socket) { }

    private onClientConnected(socketClient, serverAddress, identification?: any) {
        let _self = this;

        if (identification === undefined || identification === null) {
            identification = {}
        }

        identification['type'] = 'external';
        identification['serverAddress'] = serverAddress;

        let socket = new Socket(socketClient);
        let basicSocket = socket.getBasicSocket();

        basicSocket.setIdentification(identification);

        basicSocket.on('getIdentification', (key) => {
            basicSocket.setKey(key);
            basicSocket.emit('identification', identification);
            this.configSocketClient(socket);
            this.clientConnected(socket);
        });

        basicSocket.on('disconnect', (reason) => { _self.onClientDisconnected(socket, reason); });

        this.arraySocketClient.push(socket);
    }

    private onClientDisconnected(socket: Socket, reason) {
        let index = this.arraySocket.indexOf(socket);
        if (index > -1) {
            this.arraySocket.splice(index, 1);
        }
        this.clientDisconnected(socket, reason);
    }
}
