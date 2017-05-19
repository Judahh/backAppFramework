importJS('app/view/view');

class App{

  private view:View;

  constructor(){
    this.view = new View();
  }

  render() {
    return this.view.render();
  }
}