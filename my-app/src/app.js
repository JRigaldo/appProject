export class App {


  constructor() {
    this.message = 'Hello World!';
    this.isSelected = false;
  }

  toggleMenu(){
  	this.isSelected = !this.isSelected;
  }
}
