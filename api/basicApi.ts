import { BasicAppHandler } from './appHandler/basicAppHandler'
import { BasicExternalHandler } from './externalHandler/basicExternalHandler'
import { Electron } from './electron/electron';
import { ApiConfiguration } from './apiConfiguration';

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

  private inspectSocket(socket) {
    socket.emit('getIdentification', {});
    socket.on('identification', (identification) => {
      switch (identification.type) {
        case 'app':
          this.appHandler.addSocket(socket, identification);
          break;

        case 'server':
        default:
          this.externalHandler.addSocket(socket, identification);
          break;
      }
    });
  }

  public setIo(io) {
    this.io = io;
  }

  public afterListen() {
    let _self = this;
    this.io.on('connection', (socket) => { _self.addSocket(socket); });
  }
}