import * as childProcess from 'child_process';
import "basicutil"
import * as os from 'os';
// import * as webhook from 'node-webhooks';
// let Webhook = require('node-webhooks');
// import * as Webhook from 'node-webhooks';
import * as request from 'request';

export class StartX {
  private static instance: StartX = new StartX();

  constructor() {
    if (StartX.instance) {
      throw new Error("The Read is a singleton class and cannot be created!");
    }

    StartX.instance = this;
  }

  public static getInstance(): StartX {
    return StartX.instance;
  }

  public start() {
    console.info("Starting STARTX...");
    childProcess.exec('startx ');
  }
}