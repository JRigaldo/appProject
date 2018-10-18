import routes from './routes';

export class Shell {

  constructor(){
    this.isSelected = false;
  }

  configureRouter(config, router) {
    this.router = router;
    config.title = 'Aurelia';
    config.map(routes);
  }

  toggleMenu() {
		this.isSelected = !this.isSelected;
    console.log(this.isSelected);
	}

}
