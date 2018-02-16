import { BasicSocket } from './../socket/basicSocket'
import * as ioClient from 'socket.io-client';

export class BasicExternalHandler {
    protected identification: any;
    protected arraySocket: Array<BasicSocket>;
    protected arraySocketClient: Array<BasicSocket>;

    constructor() {
        this.arraySocket = new Array<BasicSocket>();
        this.arraySocketClient = new Array<BasicSocket>();
        this.init();
    }

    public connectToServer(serverAddress, identification?: any) {
        let _self = this;
        let socketClient = ioClient(serverAddress);
        socketClient.on('connect', () => { _self.clientConnected(socketClient); });
        socketClient.on('disconnect', () => { _self.clientDisconnected(socketClient); });

        if (identification == undefined || identification == null) {
            identification = {}
        }

        identification['type'] = 'external';
        identification['serverAddress'] = serverAddress;

        let basicSocket = new BasicSocket(socketClient);

        basicSocket.setIdentification(identification);

        basicSocket.on('getIdentification', (key) => {
            basicSocket.setKey(key);
            basicSocket.emit('identification', identification);
        });

        this.arraySocketClient.push(basicSocket);

    }

    protected clientConnected(socketClient) {
        console.log('CONNECTED');
    }

    protected clientDisconnected(socketClient) {
        console.log('DISCONNECTED');
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
}
