import * as childProcess from 'child_process';
import * as http from 'http';
// import * as webhook from 'node-webhooks';
// let webhook = require('node-webhooks');

export class Terminal {

  /**
   * GET all Heroes.
   */
  public static startNgrok() {
    console.log("Starting ngrok...");
    childProcess.exec('sudo ./ngrok http ' + (process.env.PORT || 3000), Terminal.ngrok);
    var httpOptions={ 
      'connection': 'application/json.',
      'host': 'localhost',
      'port': 4040,
      'path': '/api/tunnels'
    };
    http.get(httpOptions, Terminal.ngrok);
  }

  public static ngrok(response:http.ClientResponse) {//tunnels[0].public_url
    response.on('data', Terminal.ngrokData);
  }

  public static ngrokData(data) {
    console.log("ngrok:" + data);
  }

  /**
   * GET all Heroes.
   */
  public static upgrade(pusher: any, repository: any) {
    console.log(pusher.name + " pushed to " + repository.name);
    console.log("Pulling code from Github...");
    process.stdout.write('\x07');

    // reset any changes that have been made locally
    childProcess.exec('sudo git reset --hard', Terminal.currentReset);

    childProcess.exec('sudo git reset --hard', { cwd: "public" }, Terminal.childReset);
  }

  public static currentReset(err, stdout, stderr) {
    console.log("Current Reset:");
    Terminal.showInfo(stdout, stderr);
    // and ditch any files that have been added locally too
    childProcess.exec('sudo git -C clean -df', Terminal.currentClean);
  }

  public static currentClean(err, stdout, stderr) {
    console.log("Current Clean:");
    Terminal.showInfo(stdout, stderr);
    // now pull down the latest
    childProcess.exec('sudo git pull', Terminal.currentPull);
  }

  public static currentPull(err, stdout, stderr) {
    console.log("Current Pull:");
    Terminal.showInfo(stdout, stderr);
  }

  public static childReset(err, stdout, stderr) {
    console.log("Child Reset:");
    Terminal.showInfo(stdout, stderr);
    // and ditch any files that have been added locally too
    childProcess.exec('sudo git clean -df', { cwd: "public" }, Terminal.childClean);
  }

  public static childClean(err, stdout, stderr) {
    console.log("Child Clean:");
    Terminal.showInfo(stdout, stderr);
    // now pull down the latest
    childProcess.exec('sudo git pull https://github.com/Judahh/appFramework.git master', { cwd: "public" }, Terminal.childPull);
  }

  public static childPull(err, stdout, stderr) {
    console.log("Child Pull:");
    Terminal.showInfo(stdout, stderr);
    // and npm install with --production
    // childProcess.exec('sudo npm install', Terminal.install);
    // process.exit();

    // and run tsc
    // childProcess.exec('sudo tsc', Page.execCallback);
  }

  public static install(err, stdout, stderr) {
    console.log("Install:");
    Terminal.showInfo(stdout, stderr);

    // childProcess.exec('sudo npm start', null);

    process.exit();
  }

  public static showInfo(stdout, stderr) {
    if (stdout) {
      console.log(stdout);
    }
    if (stderr) {
      console.log(stderr);
    }
  }
}