import { EventDB } from "./../database/eventDB/eventDB";
import { Event } from "./../database/eventDB/event/event";
import {Operation} from "./../database/eventDB/event/operation";
import * as MongoDB from "mongodb";

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
  
  private eventDB: EventDB;

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

    this.eventDB = new EventDB();
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
    this.eventDB.connect(this.addEvent);
    return this.addOptions;
  }

  public addEvent = (error, db: MongoDB.Db) => {
    if (error) {
      console.error(error);
    }
    console.log("ADD EVENT");
    var events = db.collection('events');

    var addContent = {
      id:this.id,
      link:this.link
    };

    var event = new Event(Operation.add,"Webhook",addContent);

    events.insert(event, this.eventResult);
  }

  public getDeleteOptions() {
    this.eventDB.connect(this.deleteEvent);
    return this.deleteOptions;
  }

  public deleteEvent = (error, db: MongoDB.Db) => {
    if (error) {
      console.error(error);
    }
    console.log("DELETE EVENT");
    var events = db.collection('events');

    var addContent = {
      id:this.id,
      link:this.link
    };

    var event = new Event(Operation.delete,"Webhook",addContent);

    events.insert(event, this.eventResult);
  }

  public getCorrectOptions() {
    this.eventDB.connect(this.correctEvent);
    return this.updateOptions;
  }

  public correctEvent = (error, db: MongoDB.Db) => {
    if (error) {
      console.error(error);
    }
    console.log("CORRECT EVENT");
    var events = db.collection('events');

    var addContent = {
      id:this.id,
      link:this.link
    };

    var event = new Event(Operation.correct,"Webhook",addContent);

    events.insert(event, this.eventResult);
  }

  public getUpdateOptions() {
    this.eventDB.connect(this.updateEvent);
    return this.updateOptions;
  }

  public updateEvent = (error, db: MongoDB.Db) => {
    if (error) {
      console.error(error);
    }
    console.log("UPDATE EVENT");
    var events = db.collection('events');

    var addContent = {
      id:this.id,
      link:this.link
    };

    var event = new Event(Operation.update,"Webhook",addContent);

    events.insert(event, this.eventResult);
  }

  public getNonexistentOptions() {
    this.eventDB.connect(this.nonexistentEvent);
    return this.deleteOptions;
  }

  public nonexistentEvent = (error, db: MongoDB.Db) => {
    if (error) {
      console.error(error);
    }
    console.log("NONEXISTENT EVENT");
    var events = db.collection('events');

    var addContent = {
      id:this.id,
      link:this.link
    };

    var event = new Event(Operation.nonexistent,"Webhook",addContent);

    events.insert(event, this.eventResult);
  }
}