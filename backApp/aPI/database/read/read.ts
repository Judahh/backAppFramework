import { ReadDB } from "./../readDB/readDB";
import { Event } from "./../event/event";
import * as MongoDB from "mongodb";
export class Read {
    private readDB: ReadDB;
    private readMongoDB: MongoDB.Db;
    private objects: MongoDB.Collection;

    constructor() {
        this.readDB.connect(this.connected);
    }

    public connected = (error, db: MongoDB.Db) => {
        if (error) {
            console.error(error);
        } else {
            this.readMongoDB = db;
            this.objects = this.readMongoDB.collection('objects');
        }
    }

    public update(event:Event){

    }
}