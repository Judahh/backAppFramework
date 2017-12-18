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

        let basicSocket = new BasicSocket(socketClient);

        basicSocket.setIdentification(identification);

        basicSocket.on('getIdentification', (key) => { 
            basicSocket.setKey(key);
            basicSocket.emit('identification', identification);
        });
        
        this.arraySocketClient.push(basicSocket);

    }

    public addSocket(basicSocket: BasicSocket) {
        this.arraySocket.push(basicSocket);
        this.configSocket(basicSocket);
    }

    public configSocket(basicSocket: BasicSocket) { }

    public init() { }
}
