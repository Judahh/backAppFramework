import {Operation} from "./operation";
export class Event {
    private timestamp: string;
    private operation: Operation;
    private message: string;
    private content;

    constructor(operation: Operation, message: string, content) {
        this.timestamp = this.getCurrentTimestamp();
        this.operation = operation;
        this.message = message;
        this.content = content;
    }

    private getCurrentTimestamp() {
        var d = new Date()
        var dash = "-"
        var colon = ":"
        return d.getFullYear() + dash +
            this.pad(d.getMonth() + 1) + dash +
            this.pad(d.getDate()) + " " +
            this.pad(d.getHours()) + colon +
            this.pad(d.getMinutes()) + colon +
            this.pad(d.getSeconds())
    }

    private pad(n) {
        return n < 10 ? "0" + n : n
    }

    public getTimestamp(){
        return this.timestamp;
    }

    public getOperation(){
        return this.operation;
    }

    public getMessage(){
        return this.message;
    }

    public getContent(){
        return this.content;
    }
}