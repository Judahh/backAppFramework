import { MongoClient, Db } from "mongodb";
import * as mongoose from "mongoose";
import { PersistenceAdapter } from "./../../../persistenceAdapter/persistenceAdapter";

export class MongoDB implements PersistenceAdapter {
    private host: string;
    private port: number;
    private database: string;
    private mongooseInstance: mongoose.MongooseThenable;

    constructor(database: string, host?: string, port?: number) {
        if (host) {
            this.host = host;
        } else {
            this.host = "localhost";
        }
        if (port) {
            this.port = port;
        } else {
            this.port = 27017;
        }
        this.database = database;
        this.mongooseInstance = mongoose.connect("mongodb://" + this.host + ":" + this.port + "/" + this.database);
    }

    update(item: any) {
        throw new Error("Method not implemented.");
    }
    readArray(): any[] {
        return mongoose.model('ads').schema.indexes();
    }
    deleteArray() {
        throw new Error("Method not implemented.");
    }
    addItem(item: any) {
        throw new Error("Method not implemented.");
    }
    deleteItem(item: any) {
        throw new Error("Method not implemented.");
    }
}