import routes from './routes';
import {inject} from 'aurelia-framework';
import {Redirect} from 'aurelia-router';
import { EventAggregator } from 'aurelia-event-aggregator';
import {I18N} from 'aurelia-i18n';
import {AuthService} from '../common/services/auth-service';
import {AuthorizeStep} from '../pipeline-steps/authorize-step';
import * as toastr from 'toastr';

@inject(EventAggregator, AuthService, I18N)
export class Shell{

  constructor(EventAggregator, AuthService, I18N){
    this.authService = AuthService;
    this.ea = EventAggregator;
    this.i18n = I18N;

    this.isSelected = false;
    this.homepage = false;
    this.iconCross = false;
    this.iconPlus = true;
    this.iconLock = false;
  }

  configureRouter(config, router) {
    this.router = router;
    config.addAuthorizeStep(AuthorizeStep);
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

    this.subscribToastr = this.ea.subscribe('toast', toast => {
      toastr[toast.type](toast.message);
    });

    this.subscribeEditParams = this.ea.subscribe('pageParams', params => {
      console.log('pageParams', params);
      this.iconEditPost.bind(this);
    });
  }

  iconEditPost(){
    this.router.navigateToRoute('post-edit', params)
  }

  iconCreatePost(){
    this.router.navigateToRoute('create-post');
    if(this.router.currentInstruction.config.name === 'create-post'){
      this.router.navigateToRoute('home');
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
      // console.log(data.success);
      this.isSelected = false;
      this.createPost = true;
      this.ea.publish('user', null);
      this.ea.publish('toast', {
        type: 'success',
        message: 'You have successfully logged out !'
      });
      this.router.navigateToRoute('home');
    }).catch(error => {
      this.ea.publish('toast', {
        type: 'error',
        message: error.message
      });
      // this.error = error.message;
    })
  }

  setLocale(locale){
    this.i18n.setLocale(locale);
  }

  detached() {
      this.subscriptionNavigationSuccess.dispose();
      this.subscriberBackToMenu.dispose();
      this.subscriptionUser.dispose();
      this.subscribToastr.dispose();
  }

  goBack(){
    console.log('back');
    history.back();
  }

  goForward() {
    history.forward();
  }
}
