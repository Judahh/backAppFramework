import { Electron } from './electron/electron';
import { ApiConfiguration } from './apiConfiguration';
import { Router, Request, Response, NextFunction } from 'express';
import * as ioClient from 'socket.io-client';


export class BasicApi {
  protected router: Router;
  protected electron: Electron;
  protected io;
  protected arraySocketApp: Array<any>;
  protected arraySocketExternal: Array<any>;
  protected arraySocketClient: Array<any>;
  // private gstreamer: Gstreamer;

  /**
   * Initialize the HeroRouter
   */
  constructor() {
    this.arraySocketApp = new Array<any>();
    this.arraySocketExternal = new Array<any>();
    this.arraySocketClient = new Array<any>();
    this.router = Router();
    this.init();
    // this.electron=new Electron();
  }

  public connectToServer(serverAddress) {
    let socketClient = ioClient(serverAddress);
    socketClient.on('connect', () => { console.log('CONNECTED'); });
    socketClient.on('disconnect', () => { console.log('Disconnected'); });
    this.arraySocketClient.push(socketClient);
  }


  public getRouter() {
    return this.router;
  }

  public addSocket(socket) {
    this.inspectSocket(socket);

  }

  private inspectSocket(socket) {
    socket.emit('getIdentification', {});
    socket.on('identification', (identification) => {
      switch (identification.type) {
        case 'app':
          this.arraySocketApp.push(socket);
          this.configSocketApp(socket);
          break;

        default:
          this.arraySocketExternal.push(socket);
          this.configSocketExternal(socket);
          break;
      }
    });
  }

  public configSocketApp(socket) {

  }

  public configSocketExternal(socket) {

  }

  public setIo(io) {
    this.io = io;
  }

  public afterListen() {
    let _self = this;
    this.io.on('connection', (socket) => { _self.addSocket(socket); });
  }

  public init() {
  }

}