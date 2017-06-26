import {MongoDB} from "./../noSQL/mongoDB/mongoDB";
export class EventDB extends MongoDB{
    constructor(host?: string, port?: number){
        super("eventDB",host,port);
    }
}