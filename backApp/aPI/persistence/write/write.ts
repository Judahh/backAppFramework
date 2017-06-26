import { Operation } from "./../event/operation";
import { EventDB } from "./../database/eventDB/eventDB";
import { Event } from "./../event/event";
import { Read } from "./../read/read";
import * as MongoDB from "mongodb";
export class Write {
    private read: Read;
    private eventDB: EventDB;
    // private eventMongoDB: MongoDB.Db;
    // private events: MongoDB.Collection;
    // private currentEvent: Event;

    constructor() {
        this.read = new Read();
        this.eventDB= new EventDB();
    }

    public addEvent(event: Event){
        this.eventDB.addItem("events",event,function(error, result){
            console.log("RESULT EVENT");
            if (error) {
                console.error(error);
            } else {
                console.log(result);
                this.read.update(event);
            }
        });
    }
}