import { BasicSocket } from 'basicSocket'
import { BasicHandler } from './../basicHandler/basicHandler'
import { BasicHardwareHandler } from './../hardwareHandler/basicHardwareHandler';
import * as ioClient from 'socket.io-client';

export class BasicExternalHandler extends BasicHandler {
    protected identification: any;
    protected arraySocketClient: Array<BasicSocket>;

    constructor(hardwareHandler: BasicHardwareHandler) {
        super(hardwareHandler);
        this.arraySocketClient = new Array<BasicSocket>();
        this.init();
    }

    public connectToServer(serverAddress, identification?: any) {
        let _self = this;
        let socketClient = ioClient(serverAddress);
        socketClient.on('connect', () => { _self.onClientConnected(socketClient, serverAddress, identification); });
    }

    protected clientConnected(basicSocket) {
        console.log('CONNECTED');
    }

    protected clientDisconnected(basicSocket, reason) {
        console.log('DISCONNECTED', reason);
    }

    // tslint:disable-next-line:no-empty
    protected configSocketClient(basicSocket: BasicSocket) { }

    private onClientConnected(socketClient, serverAddress, identification?: any) {
        let _self = this;

        if (identification === undefined || identification === null) {
            identification = {}
        }

        identification['type'] = 'external';
        identification['serverAddress'] = serverAddress;

        let basicSocket = new BasicSocket(socketClient);

        basicSocket.setIdentification(identification);

        basicSocket.on('getIdentification', (key) => {
            basicSocket.setKey(key);
            basicSocket.emit('identification', identification);
            this.configSocketClient(basicSocket);
            this.clientConnected(basicSocket);
        });

        basicSocket.on('disconnect', (reason) => { _self.onClientDisconnected(basicSocket, reason); });

        this.arraySocketClient.push(basicSocket);
    }

    private onClientDisconnected(basicSocket, reason) {
        let index = this.arraySocket.indexOf(basicSocket);
        if (index > -1) {
            this.arraySocket.splice(index, 1);
        }
        this.clientDisconnected(basicSocket, reason);
    }
}
