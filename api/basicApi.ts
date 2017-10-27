import { Electron } from './electron/electron';
import { ApiConfiguration } from './apiConfiguration';
import { Router, Request, Response, NextFunction } from 'express';


export class BasicApi {
  protected router: Router;
  protected electron: Electron;
  protected io;
  protected socket;
  // private gstreamer: Gstreamer;

  /**
   * Initialize the HeroRouter
   */
  constructor() {
    this.router = Router();
    this.init();
    // this.electron=new Electron();
  }


  public getRouter() {
    return this.router;
  }

  public setSocket(socket) {
    this.socket = socket;
  }

  public setIo(io) {
    this.io = io;
  }

  public afterListen() {
    let _self = this;
    this.io.on('connection', (socket) => { _self.setSocket(socket); });
  }

  public init() {
  }

}