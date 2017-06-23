import {MongoDB} from "./../noSQL/mongoDB/mongoDB";
export class ReadDB extends MongoDB{
    constructor(){
        super("readDB");
    }
}