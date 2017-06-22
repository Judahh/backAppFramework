import { MongoClient } from "mongodb";

export class MongoDB {
    private host:string;
    private port:number;
    private database:string;
    constructor(database:string, host?:string, port?:number) {
        if(host){
            this.host=host;
        }else{
            this.host="localhost";
        }
        if(port){
            this.port=port;
        }else{
            this.port=27017;
        }
        this.database=database;
        
    }

    public connect(callback){
        MongoClient.connect("mongodb://"+this.host+":"+this.port+"/"+this.database, callback);
    }
}