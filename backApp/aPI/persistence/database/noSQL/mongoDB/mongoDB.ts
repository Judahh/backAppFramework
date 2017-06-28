import { MongoClient, Db } from "mongodb";
import * as mongoose from "mongoose";
import { PersistenceAdapter } from "./../../../persistenceAdapter/persistenceAdapter";

export class MongoDB implements PersistenceAdapter {
    private host: string;
    private port: number;
    private database: string;
    private mongooseInstance: mongoose.MongooseThenable;
    private genericSchema = new mongoose.Schema({}, { strict: false });

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

    public updateItem(array: string, item: any, callback) {
        var Item = mongoose.model(array, this.genericSchema);
        Item.findOneAndUpdate(item, callback);
    }
    public readArray(array: string, callback) {
        var Item = mongoose.model(array, this.genericSchema);
        Item.find(callback);
    }
    public deleteArray(array: string, callback) {
        var Item = mongoose.model(array, this.genericSchema);
        Item.remove(callback);
    }
    public addItem(array: string, item: any, callback) {
        var Item = mongoose.model(array, this.genericSchema);
        Item.create(item, callback);
    }
    public deleteItem(array: string, item: any, callback) {
        var Item = mongoose.model(array, this.genericSchema);
        Item.findByIdAndRemove(item, callback);
    }
}