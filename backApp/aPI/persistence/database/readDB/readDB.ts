import {MongoDB} from "./../noSQL/mongoDB/mongoDB";
export class ReadDB extends MongoDB{
    constructor(host?: string, port?: number){
        super("readDB", host, port);
    }
}