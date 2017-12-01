import { BasicSocket } from './../socket/basicSocket'
import * as ioClient from 'socket.io-client';

export class BasicExternalHandler {
    protected identification: any;
    private arraySocket: Array<BasicSocket>;
    private arraySocketClient: Array<BasicSocket>;

    constructor() {
        this.arraySocket = new Array<BasicSocket>();
        this.arraySocketClient = new Array<BasicSocket>();
        this.init();
    }



    public connectToServer(serverAddress) {
        let socketClient = ioClient(serverAddress);
        socketClient.on('connect', () => { console.log('CONNECTED'); });
        socketClient.on('disconnect', () => { console.log('Disconnected'); });
        let basicSocket = new BasicSocket({ type: 'server', address: serverAddress }, socketClient);
        this.arraySocketClient.push(basicSocket);
    }


    public addSocket(socket, identification) {
        let basicSocket = new BasicSocket(identification, socket);
        this.arraySocket.push(basicSocket);
        this.configSocket(basicSocket);
    }

    public configSocket(basicSocket) { }

    public init() { }
}
