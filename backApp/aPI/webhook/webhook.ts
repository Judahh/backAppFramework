import { EventDB } from "./../database/eventDB/eventDB";
import * as MongoDB from "mongodb";

export class Webhook {
  private id: number;
  private link: string;
  private data;
  private token;
  private addOptions;
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

  public getAddOptions() {
    var self=this;
    this.eventDB.connect(this.addEvent);

    // this.eventDB.connect(function (err, db) {
    //   console.log("ADD EVENT");
    // });
    return this.addOptions;
  }

  public addEvent = (error, db: MongoDB.Db) =>{
    if (error) {
      console.error(error);
    }
    console.log("ADD EVENT");
    var events = db.collection('events');

    events.insert(this.addOptions, this.addEventResult);
  }

  public addEventResult = (error, result) =>{
    console.log("RESULT EVENT");
    if (error) {
      console.error(error);
    } else {
      console.log(result);
    }
  }

  public getDeleteOptions() {
    return this.deleteOptions;
  }

  public setId(id: number) {
    this.id = id;
  }
}