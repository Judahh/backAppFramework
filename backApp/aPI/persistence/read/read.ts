import { ReadDB } from "./../database/readDB/readDB";
import { Event } from "./../event/event";
import * as MongoDB from "mongodb";
export class Read {
    private readDB: ReadDB;
    private readMongoDB: MongoDB.Db;
    private objects: MongoDB.Collection;

    constructor() {
        this.readDB=new ReadDB();
    }

    public update(event:Event){
        // this.readDB.addItem("objects",event,function(error, result){
        //     console.log("RESULT EVENT");
        //     if (error) {
        //         console.error(error);
        //     } else {
        //         console.log(result);
        //         this.read.update(event);
        //     }
        // });
    }
}