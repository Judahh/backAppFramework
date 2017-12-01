export class BasicSocket {
    protected identification: any;
    protected socket: any;

    constructor(identification, socket) {
        this.identification = identification;
        this.socket = socket;
    }

    public getIdentification() {
        return this.identification;
    }
    
    public getSocket() {
        return this.socket;
    }

    public setIdentification(identification){
        this.identification=identification;
    }

    public setSocket(socket){
        this.socket=socket;
    }
}
