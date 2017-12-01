import * as ioClient from 'socket.io-client';

export class BasicExternalHandler {
    private arraySocket: Array<any>;
    private arraySocketClient: Array<any>;

    constructor() {
        this.arraySocket = new Array<any>();
        this.arraySocketClient = new Array<any>();
        this.init();
    }

    public addSocket(socket) {
        this.arraySocket.push(socket);
        this.configSocket(socket);
    }

    public connectToServer(serverAddress) {
        let socketClient = ioClient(serverAddress);
        socketClient.on('connect', () => { console.log('CONNECTED'); });
        socketClient.on('disconnect', () => { console.log('Disconnected'); });
        this.arraySocketClient.push(socketClient);
    }

    public configSocket(socket) { }

    public init() {
    }
}
