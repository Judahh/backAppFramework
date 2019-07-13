import { BasicAppHandler } from './appHandler/basicAppHandler'
import { BasicExternalHandler } from './externalHandler/basicExternalHandler'
import { Socket, BasicSocket } from 'basicsocket'
import { Electron } from './electron/electron';
import { ApiConfiguration } from './apiConfiguration';
const IV_LENGTH = 16; // For AES, this is always 16

export class BasicApi {
  protected electron: Electron;
  protected io;
  protected arraySocketExternal: Array<any>;
  protected arraySocketClient: Array<any>;
  protected appHandler: BasicAppHandler;
  protected externalHandler: BasicExternalHandler;

  constructor(appHandler: BasicAppHandler, externalHandler: BasicExternalHandler) {
    this.arraySocketExternal = new Array<any>();
    this.arraySocketClient = new Array<any>();
    this.appHandler = appHandler;
    this.externalHandler = externalHandler;
    // this.electron=new Electron();
  }

  public getRouter() {
    return this.appHandler.getRouter();
  }

  public addSocket(socket) {
    this.inspectSocket(socket);
  }

  public setIo(io) {
    this.io = io;
  }

  public afterListen() {
    let _self = this;
    this.io.on('connection', (socket) => { _self.addSocket(socket); });
  }

  private inspectSocket(ioSocket) {
    let socket = new Socket(ioSocket);
    let basicSocket = socket.getBasicSocket();
    let key = BasicSocket.generateKey(32);

    basicSocket.emit('getIdentification', key);

    basicSocket.setKey(key);

    basicSocket.on('identification', (identification) => {
      basicSocket.setIdentification(identification);
      switch (identification.type) {
        case 'app':
          this.appHandler.addSocket(socket);
          break;

        default:
          this.externalHandler.addSocket(socket);
          break;
      }
    });
  }
}
