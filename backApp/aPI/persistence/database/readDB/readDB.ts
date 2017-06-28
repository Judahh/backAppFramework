import { MongoDB } from "./../noSQL/mongoDB/mongoDB";
export class ReadDB extends MongoDB {
    private static instance: ReadDB = new ReadDB();

    constructor(host?: string, port?: number) {
        if (ReadDB.instance) {
            throw new Error("The Write is a singleton class and cannot be created!");
        }

        super("readDB", host, port);

        ReadDB.instance = this;
    }

    public static getInstance(): ReadDB {
        return ReadDB.instance;
    }
}