import { Operation } from "./../event/operation";
import { EventDB } from "./../database/eventDB/eventDB";
import { Event } from "./../event/event";
import { Read } from "./../read/read";
import * as MongoDB from "mongodb";
export class Write {
    private read: Read;
    private eventDB: EventDB;
    private static instance: Write = new Write();
    // private eventMongoDB: MongoDB.Db;
    // private events: MongoDB.Collection;
    // private currentEvent: Event;

    constructor() {
        if (Write.instance) {
            throw new Error("The Write is a singleton class and cannot be created!");
        }

        Write.instance = this;

        this.read = Read.getInstance();
        this.eventDB = EventDB.getInstance();
    }

    public static getInstance(): Write {
        return Write.instance;
    }

    public addEvent(event: Event) {
        this.eventDB.addItem("events", event, function (error, result) {
            console.log("RESULT EVENT");
            if (error) {
                console.error(error);
            } else {
                console.log(result);
                this.read.newEvent(event);
            }
        });
    }
}