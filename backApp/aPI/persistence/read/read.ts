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
                // this.read(event);
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
        this.readDB.addItem(event.getName(),event.getContent(),function(error, result){
            console.log("RESULT CREATE");
            if (error) {
                console.error(error);
            } else {
                console.log(result);
            }
        });
    }

    private read(event:Event){
        
    }

    private update(event:Event){
        this.readDB.updateItem(event.getName(),event.getContent(),function(error, result){
            console.log("RESULT UPDATE");
            if (error) {
                console.error(error);
            } else {
                console.log(result);
            }
        });
    }

    private delete(event:Event){
        this.readDB.deleteItem(event.getName(),event.getContent(),function(error, result){
            console.log("RESULT DELETE");
            if (error) {
                console.error(error);
            } else {
                console.log(result);
            }
        });
    }
}