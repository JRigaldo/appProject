import { PLATFORM } from 'aurelia-framework';
import { Router } from 'aurelia-router';


export class App {

  constructor() {
    this.message = 'Hello my World!';
  }

  configureRouter(config, router){
  	this.router = router;
  	config.title = 'My App';
  	config.map([
      { route: ["", "home"], name: "home", moduleId: PLATFORM.moduleName("page-home", "home"), nav: true, title: "Homepage" }   
      /*{ route: "products", name: "products", moduleId: PLATFORM.moduleName("products", "products"), nav: true, title: "Products" },
      { route: "product/:product_id", name: "product", moduleId: PLATFORM.moduleName("product", "product"), nav: true, title: "Single Product" },*/
      /*{ route: "sign-in", name: "sign-in", moduleId: PLATFORM.moduleName("sign-in", "sign-in"), nav: true, title: "Sign-in" }*/
      /*{ route: "todo", name: "todo", moduleId: PLATFORM.moduleName("todo-list", "todo"), nav: true, title: "Todo" }*/
    ]);
  }



  toggleMenu(){

    let toggleMenuVariable = false;
    let menuButton = document.getElementById('aside')

    if(toggleMenuVariable =! toggleMenuVariable){
      menuButton.classList.toggle('click');
    }

  }

}
