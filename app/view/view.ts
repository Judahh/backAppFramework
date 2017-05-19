importJS('app/view/header/header');
importJS('app/view/body/body');
importJS('app/view/footer/footer');

class View{
  render() {
    let header=new Header();
    let body=new Body();
    let footer=new Footer();
    return header.render()+body.render()+footer.render();
  }
}