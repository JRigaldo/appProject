import routes from './routes';
import {CssAnimator} from 'aurelia-animator-css';
import {inject} from 'aurelia-framework';
import {Redirect} from 'aurelia-router';
import { EventAggregator } from 'aurelia-event-aggregator';
import {I18N} from 'aurelia-i18n';
import {AuthService} from '../common/services/auth-service';
import {PostService} from '../common/services/post-service';
import {AuthorizeStep} from '../pipeline-steps/authorize-step';
import * as toastr from 'toastr';

@inject(EventAggregator, AuthService, PostService, I18N, CssAnimator, Element)
export class Shell{

  constructor(EventAggregator, AuthService, PostService, I18N, CssAnimator, Element){
    this.authService = AuthService;
    this.postService = PostService;
    this.ea = EventAggregator;
    this.i18n = I18N;
    this.animator = CssAnimator;
    this.element = Element;

    this.isSelected = false;
    this.homepage = false;
    this.iconCross = false;
    this.iconPlus = false;
    this.iconLock = false;
    this.iconBack = false;
    this.iconEdit = false;
    this.menuActive = false;

    this.storeParams = null;
    this.postAuhtorParams = null;
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

    this.subscribeAnimationFadeInRigth = this.ea.subscribe('router:navigation:processing', event => {
      let myElement = this.element.querySelector('.animated');
      this.animator.animate(myElement, 'myAnimationRight');
    });

    this.subscribeEditParams = this.ea.subscribe('pageParams', params => {
      this.storeParams = params;
    });

    this.subscribePostAuhtorParams = this.ea.subscribe('postAuhtorParams', authorParams => {
      this.postAuhtorParams = authorParams;
      console.log('postAuhtorParams', this.postAuhtorParams);
    });

    // AU REFRESH
    if (this.router.currentInstruction.config.name === 'home') {
      // ENLEVE LE LI 'HOME' SI LE ROUTER EST HOME AU REFRESH
      this.homepage = true;
      this.iconBack = false;
      this.iconEdit = false;
      if (this.currentUser === null) {
        this.iconPlus = false;
      }else{
        this.iconPlus = true;
      }
    }else if (this.router.currentInstruction.config.name === 'post-view') {
      this.iconBack = true;
      this.iconEdit = true;
    }else if (this.router.currentInstruction.config.name === 'post-edit') {
      this.iconEdit = true;
    }else{
      this.iconPlus = false;
    }
  }

  navigationSuccess(event) {
    let instruction = event.instruction;
    this.isSelected = false;
    // ENLEVE : DISPLAY NONE 'HOME' EN TITRE SI HOME EST CLICK
    if(event.instruction.config.name === 'home'){
      this.homepage = true;
      this.iconBack = false;
      this.menuActive = false;
      this.iconPlus = true;
      this.iconEdit = false;
    }else if(event.instruction.config.name === 'create-post' || event.instruction.config.name === 'register'){
      this.iconBack = false;
    }else if (event.instruction.config.name === 'register') {
      this.menuActive = true;
      this.iconPlus = false;
    }else if (event.instruction.config.name === 'post-view') {
      this.iconBack = true;
      this.iconPlus = false;
      this.iconEdit = true;
    }else if (event.instruction.config.name === 'post-edit') {
      this.iconEdit = true;
    }else{
      this.homepage = false;
      this.iconBack = true;
      this.iconPlus = false;
      this.iconEdit = false;
    }
  }

  iconCreatePost(){
    if(this.router.currentInstruction.config.name === 'create-post'){
      this.router.navigateToRoute('home');
    }
    this.router.navigateToRoute('create-post');
  }

  goBack(){
    let myElement = this.element.querySelector('.animated');
    this.animator.animate(myElement, 'myAnimationLeft');
    history.back();
  }

  editPostClick(){
    console.log('storeParams', this.storeParams);
    this.router.navigateToRoute('post-edit', this.storeParams)
    if (this.router.currentInstruction.config.name === 'post-edit') {
      history.back();
    }
  }

  toggleMenu() {
    if(this.currentUser === null){
      this.router.navigateToRoute('register');
      if (this.router.currentInstruction.config.name === 'register') {
        history.back();
      }
    }else{
      this.isSelected = !this.isSelected;
    }
    this.menuActive = !this.menuActive;
	}

  logout(){
    this.authService.logout().then(data => {
      this.isSelected = false;
      this.createPost = true;
      this.menuActive = false;
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
      this.subscribeNavigation.dispose();
      this.subscribeEditParams.dispose();
      this.subscribeAnimationFadeInRigth.dispose();
  }
}
