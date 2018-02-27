import * as childProcess from 'child_process';
import 'basicutil'
import * as os from 'os';
// import * as webhook from 'node-webhooks';
// let Webhook = require('node-webhooks');
// import * as Webhook from 'node-webhooks';
import * as request from 'request';

export class StartX {
  private static instance: StartX = new StartX();

  public static getInstance(): StartX {
    return StartX.instance;
  }

  constructor() {
    if (StartX.instance) {
      throw new Error('The Read is a singleton class and cannot be created!');
    }

    StartX.instance = this;
  }

  public start() {
    console.log('Starting STARTX...');
    childProcess.exec('startx ');
  }
}
