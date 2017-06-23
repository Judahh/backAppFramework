import { Write } from "./../database/write/write";
import { Event } from "./../database/event/event";
import { Operation } from "./../database/event/operation";

export class Webhook {
  private id: number;
  private link: string;
  private data;
  private token;

  private addOptions;
  private readOptions;
  private readAllOptions;
  private updateOptions;
  private deleteOptions;

  private write: Write;

  constructor(link: string) {
    this.link = link;
    this.token = process.env.TOKEN;
    this.token = this.token.replaceAll("-NTK-", "");
    this.data = {
      "name": "web",
      "active": true,
      "events": [
        "push"
      ],
      "config": {
        "url": this.link,
        "content_type": "json"
      }
    }
    var stringData = JSON.stringify(this.data);

    this.addOptions = {
      method: 'post',
      body: this.data,
      json: true,
      url: 'https://api.github.com/repos/Judahh/backAppFramework/hooks',
      headers: {
        'Authorization': 'token ' + this.token,
        'Content-Length': Buffer.byteLength(stringData, 'utf8'),
        'Content-Type': 'application/json.',
        'User-Agent': 'request'
      }
    };

    this.readOptions = {
      method: 'get',
      json: true,
      url: 'https://api.github.com/repos/Judahh/backAppFramework/hooks/' + this.id,
      headers: {
        'Authorization': 'token ' + this.token,
        'Content-Length': Buffer.byteLength(stringData, 'utf8'),
        'Content-Type': 'application/json.',
        'User-Agent': 'request'
      }
    };

    this.readAllOptions = {
      method: 'get',
      json: true,
      url: 'https://api.github.com/repos/Judahh/backAppFramework/hooks',
      headers: {
        'Authorization': 'token ' + this.token,
        'Content-Length': Buffer.byteLength(stringData, 'utf8'),
        'Content-Type': 'application/json.',
        'User-Agent': 'request'
      }
    };

    this.updateOptions = {
      method: 'patch',
      json: true,
      url: 'https://api.github.com/repos/Judahh/backAppFramework/hooks/' + this.id,
      headers: {
        'Authorization': 'token ' + this.token,
        'Content-Length': Buffer.byteLength(stringData, 'utf8'),
        'Content-Type': 'application/json.',
        'User-Agent': 'request'
      }
    };

    this.deleteOptions = {
      method: 'delete',
      json: true,
      url: 'https://api.github.com/repos/Judahh/backAppFramework/hooks/' + this.id,
      headers: {
        'Authorization': 'token ' + this.token,
        'Content-Length': Buffer.byteLength(stringData, 'utf8'),
        'Content-Type': 'application/json.',
        'User-Agent': 'request'
      }
    };

    this.write = new Write();
  }

  public setId(id: number) {
    this.id = id;
  }

  public getId() {
    return this.id;
  }

  public getLink() {
    return this.link;
  }

  public getData() {
    return this.data;
  }

  public getToken() {
    return this.token;
  }

  public eventResult = (error, result) => {
    console.log("RESULT EVENT");
    if (error) {
      console.error(error);
    } else {
      console.log(result);
    }
  }

  public getAddOptions() {
    var content = {
      id: this.id,
      link: this.link
    };
    var event = new Event(Operation.add, "webhook", content);

    this.write.sendEvent(event);
    return this.addOptions;
  }

  public getDeleteOptions() {
    var content = {
      id: this.id,
      link: this.link
    };
    var event = new Event(Operation.delete, "webhook", content);

    this.write.sendEvent(event);
    return this.deleteOptions;
  }

  public getCorrectOptions() {
    var content = {
      id: this.id,
      link: this.link
    };
    var event = new Event(Operation.correct, "webhook", content);

    this.write.sendEvent(event);
    return this.updateOptions;
  }

  public getUpdateOptions() {
    var content = {
      id: this.id,
      link: this.link
    };
    var event = new Event(Operation.update, "webhook", content);

    this.write.sendEvent(event);
    return this.updateOptions;
  }

  public getNonexistentOptions() {
    var content = {
      id: this.id,
      link: this.link
    };
    var event = new Event(Operation.nonexistent, "webhook", content);

    this.write.sendEvent(event);
    return this.deleteOptions;
  }
}