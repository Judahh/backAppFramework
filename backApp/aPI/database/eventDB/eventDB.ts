import {MongoDB} from "./../noSQL/mongoDB/mongoDB";
export class EventDB extends MongoDB{
    constructor(){
        super("eventDB");
    }
}