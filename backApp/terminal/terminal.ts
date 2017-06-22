import * as childProcess from 'child_process';
import "./../util/utils"
import {Webhook} from "./../webhook/webhook"
// import * as webhook from 'node-webhooks';
// var Webhook = require('node-webhooks');
// import * as Webhook from 'node-webhooks';
import * as request from 'request';

export class Terminal {
  // public static webhook:Webhook;
  public webhookID:number;
  public webhookLink:string;
  /**
   * GET all Heroes.
   */
  public startNgrok() {
    console.log("Starting ngrok...");
    childProcess.exec('sudo ./ngrok http ' + (process.env.PORT || 3000), this.getNgrok);
    this.getNgrok();
  }

  public getNgrok() {
    var options = {
      method: 'get',
      json: true,
      url: 'http://localhost:4040/api/tunnels',
      headers: {
        'Content-Type': 'application/json.',
        'User-Agent': 'request'
      }
    };

    request(options, this.ngrokData);
  }

  public ngrokData(error,response,body) {
    if(error){
      console.error('Error :', error);
    }
    if(body.tunnels.length>0){
      console.log("ngrok:");
      for (var index = 0; index < body.tunnels.length; index++) {
        var element = body.tunnels[index];
        if (element.public_url.indexOf("https") != -1) {
          console.log(index + ":" + element.public_url);
          this.webhookLink= element.public_url + "/refresh";
          this.createWebhook();
        }
      }
    }else{
      this.getNgrok();
    }
  }

  public createWebhook() {
    var data = {
      "name": "web",
      "active": true,
      "events": [
        "push"
      ],
      "config": {
        "url": this.webhookLink,
        "content_type": "json"
      }
    }

    var stringData = JSON.stringify(data);

    var token=process.env.TOKEN;
    token=token.replaceAll("-NTK-","");
    console.log("token:"+token);

    var options = {
      method: 'post',
      body: data,
      json: true,
      url: 'https://api.github.com/repos/Judahh/backAppFramework/hooks',
      headers: {
        'Authorization': 'token ' + token,
        'Content-Length': Buffer.byteLength(stringData, 'utf8'),
        'Content-Type': 'application/json.',
        'User-Agent': 'request'
      }
    };

    request(options, this.webhook);
  }

  public removeWebhook() {
    var data = {
      "name": "web",
      "active": true,
      "events": [
        "push"
      ],
      "config": {
        "url": this.webhookLink,
        "content_type": "json"
      }
    }

    var stringData = JSON.stringify(data);

    console.log("Deleting:"+this.webhookID);
    var token=process.env.TOKEN;
    token=token.replaceAll("-NTK-","");
    console.log("token:"+token);

    var options = {
      method: 'delete',
      json: true,
      url: 'https://api.github.com/repos/Judahh/backAppFramework/hooks/'+this.webhookID,
      headers: {
        'Authorization': 'token ' + token,
        'Content-Length': Buffer.byteLength(stringData, 'utf8'),
        'Content-Type': 'application/json.',
        'User-Agent': 'request'
      }
    };

    request(options, this.webhook);
  }

  public webhook(error, response, body) {
    if(error){
      console.error('Error :', error);
    }
    if(body!=undefined){
      console.log('Body :', body);
      if(body.id!=undefined){
        this.webhookID=body.id;
        console.log("webhookID:"+this.webhookID);
      }
    }
  }

  /**
   * GET all Heroes.
   */
  public upgrade(pusher: any, repository: any) {
    if (pusher != undefined) {
      console.log(pusher.name + " pushed to " + repository.name);
    } else {
      if (repository != undefined) {
        console.log(repository.name + " pushed");
      }
    }
    console.log("Pulling code from Github...");
    process.stdout.write('\x07');

    this.removeWebhook();
    // reset any changes that have been made locally
    childProcess.exec('sudo git reset --hard', this.currentReset);

    childProcess.exec('sudo git reset --hard', { cwd: "public" }, this.childReset);
  }

  public currentReset(err, stdout, stderr) {
    console.log("Current Reset:");
    this.showInfo(stdout, stderr);
    // and ditch any files that have been added locally too
    childProcess.exec('sudo git -C clean -df', this.currentClean);
  }

  public currentClean(err, stdout, stderr) {
    console.log("Current Clean:");
    this.showInfo(stdout, stderr);
    // now pull down the latest
    childProcess.exec('sudo git pull', this.currentPull);
  }

  public currentPull(err, stdout, stderr) {
    console.log("Current Pull:");
    this.showInfo(stdout, stderr);
  }

  public childReset(err, stdout, stderr) {
    console.log("Child Reset:");
    this.showInfo(stdout, stderr);
    // and ditch any files that have been added locally too
    childProcess.exec('sudo git clean -df', { cwd: "public" }, this.childClean);
  }

  public childClean(err, stdout, stderr) {
    console.log("Child Clean:");
    this.showInfo(stdout, stderr);
    // now pull down the latest
    childProcess.exec('sudo git pull https://github.com/Judahh/appFramework.git master', { cwd: "public" }, this.childPull);
  }

  public childPull(err, stdout, stderr) {
    console.log("Child Pull:");
    this.showInfo(stdout, stderr);

    // and npm install with --production
    // childProcess.exec('sudo npm install', this.install);
    process.exit();
    // and run tsc
    // childProcess.exec('sudo tsc', Page.execCallback);
  }

  public showInfo(stdout, stderr) {
    if (stdout) {
      console.log(stdout);
    }
    if (stderr) {
      console.log(stderr);
    }
  }
}