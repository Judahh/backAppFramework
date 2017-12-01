import { Electron } from './electron/electron';
import { ApiConfiguration } from './apiConfiguration';
import { Router, Request, Response, NextFunction } from 'express';


export class BasicApi {
  protected router: Router;
  protected electron: Electron;
  protected io;
  protected arraySocket: Array<any>;
  // private gstreamer: Gstreamer;

  /**
   * Initialize the HeroRouter
   */
  constructor() {
    this.arraySocket = new Array<any>();
    this.router = Router();
    this.init();
    // this.electron=new Electron();
  }


  public getRouter() {
    return this.router;
  }

  public addSocket(socket) {
    this.arraySocket.push(socket);
    this.configSocket(socket);
  }

  public configSocket(socket) {

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