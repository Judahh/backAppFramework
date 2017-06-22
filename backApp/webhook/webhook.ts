export class Webhook {
  private id:number;
  private link:string;
  private data;
  private token;

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
    this.token = process.env.TOKEN;
    this.token = this.token.replaceAll("-NTK-", "");
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

  public getToken(){
      return this.token;
  }

  public setId(id:number){
    console.log("WEBHOOK ID:"+this.id);
    this.id=id;
  }
}