import * as childProcess from 'child_process';

export class Upgrade {

  /**
   * GET all Heroes.
   */
  public static start(pusher: any, repository: any) {
    console.info(pusher.name + " pushed to " + repository.name);
    console.info("Pulling code from Github...");

    // reset any changes that have been made locally
    childProcess.exec('sudo git reset --hard', Upgrade.currentReset);
  }

  public static currentReset(err, stdout, stderr) {
    Upgrade.showInfo(stdout, stderr);
    // and ditch any files that have been added locally too
    childProcess.exec('sudo git -C clean -df', Upgrade.currentClean);
  }

  public static currentClean(err, stdout, stderr) {
     Upgrade.showInfo(stdout, stderr);
    // now pull down the latest
    childProcess.exec('sudo git pull', Upgrade.currentPull);
  }

  public static currentPull(err, stdout, stderr) {
     Upgrade.showInfo(stdout, stderr);
    // reset any changes that have been made locally
    childProcess.exec('sudo git reset --hard', {cwd: "public"}, Upgrade.childReset);
  }

  public static childReset(err, stdout, stderr) {
     Upgrade.showInfo(stdout, stderr);
    // and ditch any files that have been added locally too
    childProcess.exec('sudo git clean -df', {cwd: "public"}, Upgrade.childClean);
  }

  public static childClean(err, stdout, stderr) {
     Upgrade.showInfo(stdout, stderr);
    // now pull down the latest
    childProcess.exec('sudo git pull https://github.com/Judahh/appFramework.git master', {cwd: "public"}, Upgrade.childPull);
  }

  public static childPull(err, stdout, stderr) {
     Upgrade.showInfo(stdout, stderr);
    // and npm install with --production
    childProcess.exec('sudo npm install --production', Upgrade.install);

    // and run tsc
    // childProcess.exec('sudo tsc', Page.execCallback);
  }

  public static install(err, stdout, stderr) {
    Upgrade.showInfo(stdout, stderr);
  }

  public static showInfo(stdout, stderr){
    if(stdout){
      console.info(stdout);
    }
    if(stderr){
      console.info(stderr);
    }
  }
}