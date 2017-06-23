import { Operation } from "./../event/operation";
import { EventDB } from "./../eventDB/eventDB";
import { Event } from "./../event/event";
import { Read } from "./../read/read";
import * as MongoDB from "mongodb";
export class Write {
    private read: Read;
    private eventDB: EventDB;
    // private eventMongoDB: MongoDB.Db;
    private events: MongoDB.Collection;
    private currentEvent: Event;

    constructor() {
        this.read = new Read();
        this.eventDB.connect(this.connected);
    }

    public connected = (error, db: MongoDB.Db) => {
        if (error) {
            console.error(error);
        } else {
            this.events = db.collection('events');
        }
    }

    public sendEvent = (event: Event) => {
        this.currentEvent = event;
        this.events.insert(this.currentEvent, this.eventResult);
    }

    public eventResult = (error, result) => {
        console.log("RESULT EVENT");
        if (error) {
            console.error(error);
        } else {
            console.log(result);
            this.read.update(this.currentEvent);
        }
    }

    private currentTimestamp() {
        var date = new Date();
        var dash = "-";
        var colon = ":";
        var dot = ".";
        return date.getFullYear() + dash +
            this.pad(date.getMonth() + 1) + dash +
            this.pad(date.getDate()) + " " +
            this.pad(date.getHours()) + colon +
            this.pad(date.getMinutes()) + colon +
            this.pad(date.getSeconds()) + dot +
            this.pad(date.getMilliseconds());
    }

    private pad(n) {
        return n < 10 ? "0" + n : n
    }
}