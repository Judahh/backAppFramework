import { ReadDB } from "./../database/readDB/readDB";
import { Event } from "./../event/event";
import { Operation } from "./../event/operation";
import * as MongoDB from "mongodb";
export class Read {
    private readDB: ReadDB;
    private readMongoDB: MongoDB.Db;
    private objects: MongoDB.Collection;

    constructor() {
        this.readDB=new ReadDB();
    }

    public newEvent(event:Event){
        switch(event.getOperation()){
            case Operation.add:
                this.create(event);
            break; 

            case Operation.read:
                this.read(event);
            break; 

            case Operation.correct:
            case Operation.update:
                this.update(event);
            break; 

            case Operation.delete:
            case Operation.nonexistent:
                this.delete(event);
            break; 
        }
    }

    private create(event:Event){

    }

    private read(event:Event){

    }

    private update(event:Event){

    }

    private delete(event:Event){

    }
}