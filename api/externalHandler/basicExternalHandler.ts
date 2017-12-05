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

    public connectToServer(serverAddress, identification?:any) {
        let socketClient = ioClient(serverAddress);
        socketClient.on('connect', () => { console.log('CONNECTED'); });
        socketClient.on('disconnect', () => { console.log('Disconnected'); });

        if (identification == undefined || identification == null) {
            identification = {}
        }

        identification['type'] = 'external';
        identification['serverAddress'] = serverAddress;

        socketClient.on('getIdentification', () => { socketClient.emit('identification', identification) });
        let basicSocket = new BasicSocket(identification, socketClient);
        this.arraySocketClient.push(basicSocket);

    }

    public addSocket(socket, identification) {
        let basicSocket = new BasicSocket(identification, socket);
        this.arraySocket.push(basicSocket);
        this.configSocket(basicSocket);
    }

    public configSocket(basicSocket: BasicSocket) { }

    public init() { }
}
