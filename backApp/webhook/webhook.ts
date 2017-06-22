export class Webhook {
  private id:number;
  private link:string;
  private data;
  private token;
  private addOptions;

  constructor(link:string){
    this.link = link;
    this.token = process.env.TOKEN;
    this.token = this.token.replaceAll("-NTK-", "");
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
    var stringData = JSON.stringify(this.data);

    this.addOptions = {
      method: 'post',
      body: this.data,
      json: true,
      url: 'https://api.github.com/repos/Judahh/backAppFramework/hooks',
      headers: {
        'Authorization': 'token ' + this.token,
        'Content-Length': Buffer.byteLength(stringData, 'utf8'),
        'Content-Type': 'application/json.',
        'User-Agent': 'request'
      }
    };
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

  public getAddOptions(){
      return this.addOptions;
  }

  public setId(id:number){
    this.id=id;
  }
}