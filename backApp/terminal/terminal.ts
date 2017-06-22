import * as childProcess from 'child_process';
import "./../util/utils"
import {Webhook} from "./../webhook/webhook"
import * as request from 'request';

export class Terminal {
  public static webhook:Webhook;
  /**
   * GET all Heroes.
   */
  public static startNgrok() {
    console.log("Starting ngrok...");
    childProcess.exec('sudo ./ngrok http ' + (process.env.PORT || 3000), Terminal.getNgrok);
    Terminal.getNgrok();
  }

  public static getNgrok() {
    var options = {
      method: 'get',
      json: true,
      url: 'http://localhost:4040/api/tunnels',
      headers: {
        'Content-Type': 'application/json.',
        'User-Agent': 'request'
      }
    };

    request(options, Terminal.ngrokData);
  }

  public static ngrokData(error,response,body) {
    if(error){
      console.error('Error :', error);
    }
    if(body.tunnels.length>0){
      console.log("ngrok:");
      for (var index = 0; index < body.tunnels.length; index++) {
        var element = body.tunnels[index];
        if (element.public_url.indexOf("https") != -1) {
          console.log(index + ":" + element.public_url);
          Terminal.webhook=new Webhook(element.public_url + "/refresh");
          Terminal.createWebhook();
        }
      }
    }else{
      Terminal.getNgrok();
    }
  }

  public static createWebhook() {
    var stringData = JSON.stringify(Terminal.webhook.getData());

    console.log("getData:"+Terminal.webhook.getData());

    var token=process.env.TOKEN;
    token=token.replaceAll("-NTK-","");
    console.log("token:"+token);

    var options = {
      method: 'post',
      body: Terminal.webhook.getData(),
      json: true,
      url: 'https://api.github.com/repos/Judahh/backAppFramework/hooks',
      headers: {
        'Authorization': 'token ' + token,
        'Content-Length': Buffer.byteLength(stringData, 'utf8'),
        'Content-Type': 'application/json.',
        'User-Agent': 'request'
      }
    };

    console.log("Options:"+JSON.stringify(options));

    request(options, Terminal.webhook);
  }

  public static removeWebhook() {

    var stringData = JSON.stringify(Terminal.webhook.getData());

    console.log("Deleting:"+Terminal.webhook.getId());
    var token=process.env.TOKEN;
    token=token.replaceAll("-NTK-","");
    console.log("token:"+token);

    var options = {
      method: 'delete',
      json: true,
      url: 'https://api.github.com/repos/Judahh/backAppFramework/hooks/'+Terminal.webhook.getId(),
      headers: {
        'Authorization': 'token ' + token,
        'Content-Length': Buffer.byteLength(stringData, 'utf8'),
        'Content-Type': 'application/json.',
        'User-Agent': 'request'
      }
    };

    request(options, Terminal.webhookData);
  }

  public static webhookData(error, response, body) {
    if(error){
      console.error('Error :', error);
    }
    if(body!=undefined){
      console.log('Body :', body);
      if(body.id!=undefined){
        Terminal.webhook.setId(body.id);
        console.log("webhookID:"+Terminal.webhook.getId());
      }
    }
  }

  /**
   * GET all Heroes.
   */
  public static upgrade(pusher: any, repository: any) {
    if (pusher != undefined) {
      console.log(pusher.name + " pushed to " + repository.name);
    } else {
      if (repository != undefined) {
        console.log(repository.name + " pushed");
      }
    }
    console.log("Pulling code from Github...");
    process.stdout.write('\x07');

    Terminal.removeWebhook();
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
    process.exit();
    // and run tsc
    // childProcess.exec('sudo tsc', Page.execCallback);
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