export class Webhook {
  private id:number;
  private link:string;
  private data;

  constructor(link:string){
    this.link = link;
    console.log("WEBHOOK LINK:"+this.link);
    this.data = {
      "name": "web",
      "active": true,
      "events": [
        "push"
      ],
      "config": {
        "url": this.link,
        "content_type": "json"
      }
    }
  }

  public getId(){
      return this.id;
  }

  public getLink(){
      return this.link;
  }

  public getData(){
      return this.data;
  }

  public setId(id:number){
    console.log("WEBHOOK ID:"+this.id);
    this.id=id;
  }
}