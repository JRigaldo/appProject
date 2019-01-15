import routes from './routes';
import {CssAnimator} from 'aurelia-animator-css';
import {inject} from 'aurelia-framework';
import {Redirect} from 'aurelia-router';
import { EventAggregator } from 'aurelia-event-aggregator';
import {I18N} from 'aurelia-i18n';
import {AuthService} from '../common/services/auth-service';
import {AuthorizeStep} from '../pipeline-steps/authorize-step';
import * as toastr from 'toastr';

@inject(EventAggregator, AuthService, I18N, CssAnimator, Element)
export class Shell{

  constructor(EventAggregator, AuthService, I18N, CssAnimator, Element){
    this.authService = AuthService;
    this.ea = EventAggregator;
    this.i18n = I18N;
    this.animator = CssAnimator;
    this.element = Element;

    this.isSelected = false;
    this.homepage = false;
    this.iconCross = false;
    this.iconPlus = true;
    this.iconLock = false;
    this.showNavBack = false;
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

    this.subscribToastr = this.ea.subscribe('toast', toast => {
      toastr[toast.type](toast.message);
    });

    this.subscribeEditParams = this.ea.subscribe('pageParams', params => {
      console.log('pageParams', params);
      this.iconEditPost.bind(this);
    });

    this.subscribeAnimationFadeInRigth = this.ea.subscribe('router:navigation:processing', event => {
      let myElement = this.element.querySelector('.animated');
      this.animator.animate(myElement, 'myAnimationRight');
    });

    // ENLEVE LE LI 'HOME' SI LE ROUTER EST HOME AU REFRESH
    if (this.router.currentInstruction.config.name === 'home') {
      this.homepage = true;
    }

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
      this.showNavBack = false;
    }else if(event.instruction.config.name === 'create-post' || event.instruction.config.name === 'register'){
      this.showNavBack = false;
    }else{
      this.homepage = false;
      this.showNavBack = true;
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

  goBack(){
    let myElement = this.element.querySelector('.animated');
    this.animator.animate(myElement, 'myAnimationLeft');
    history.back();
  }

  detached() {
      this.subscriptionNavigationSuccess.dispose();
      this.subscriberBackToMenu.dispose();
      this.subscriptionUser.dispose();
      this.subscribToastr.dispose();
      this.subscribeNavigation.dispose();
      this.subscribeEditParams.dispose();
      this.subscribeAnimationFadeInRigth.dispose();
  }
}
