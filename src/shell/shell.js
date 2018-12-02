import routes from './routes';
import {inject} from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import {AuthService} from '../common/services/auth-service';

@inject(EventAggregator, AuthService)
export class Shell{
  constructor(EventAggregator, AuthService){
    this.authService = AuthService;
    this.ea = EventAggregator;
    this.isSelected = false;
    this.homepage = false;
    this.createPost = true;
  }
  configureRouter(config, router) {
    this.router = router;
    config.map(routes);
  }

  attached(){

    this.currentUser = this.authService.currentUser;

    this.subscriptionUser = this.ea.subscribe('user', user => {
      this.currentUser = this.authService.currentUser;
    })

    this.subscriptionNavigationSuccess = this.ea.subscribe(
      'router:navigation:success',
      this.navigationSuccess.bind(this));

    this.subscriberBackToMenu = this.ea.subscribe('backToMenu', backToMenuButton => {
       this.isSelected = true;
    });

    // ENLEVE LE LI 'HOME' SI LE ROUTER EST HOME AU REFRESH
    if (this.router.currentInstruction.config.name === 'home') {
      this.homepage = true;
    }

  }

  navigationSuccess(event) {
    let instruction = event.instruction;
    this.isSelected = false;

    // ENLEVE : DISPLAY NONE 'HOME' EN TITRE SI HOME EST CLICK
    if(event.instruction.config.name === 'home'){
      this.homepage = true;
    }else{
      this.homepage = false;
    }
  }

  toggleMenu() {
    if(this.currentUser === null){
      this.router.navigateToRoute('register');
    }else{
      this.isSelected = !this.isSelected;
    }
	}

  logout(){
    this.authService.logout().then(data => {
      console.log(data.success);
      this.router.navigateToRoute('home');
      this.isSelected = false;
      this.ea.publish('user', null);
    }).catch(error => {
      this.error = error.message;
    })
  }

  detached() {
      this.subscriptionNavigationSuccess.dispose();
      this.subscriberBackToMenu.dispose();
      this.subscriptionUser.dispose();
  }


  svgToggle(){
    this.router.navigateToRoute('create-post');
    this.createPost = false;
    if(this.router.currentInstruction.config.name === 'create-post'){
      this.router.navigateToRoute('home');
      this.createPost = true;
    }
  }
}
