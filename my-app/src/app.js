export class App {


  constructor() {
    this.isSelected = false;
  }


  configureRouter(config, router){
  	config.title = "My App";
  	config.map([
  		 { route: '', name: 'home', moduleId: PLATFORM.moduleName('posts/index'), nav: true, title: 'All Posts' },
  		 { route: 'post/:slug', name: 'post-view', moduleId: PLATFORM.moduleName('posts/view'), title: 'View Post' }

  	]);
  	this.router = router;
  }

  toggleMenu(){
		this.isSelected = !this.isSelected;
		// console.log(this.isSelected);
	}
}
