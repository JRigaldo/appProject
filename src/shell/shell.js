import { inject } from 'aurelia-framework';
import {Router} from 'aurelia-router'
import { EventAggregator } from 'aurelia-event-aggregator';
import routes from './routes';
import {CssAnimator} from 'aurelia-animator-css';
import { NavigationOptions, History } from 'aurelia-history';

@inject(EventAggregator, Router)
export class Shell {

  constructor(ea, router, element){
    this.ea = ea;
    this.isSelected = false;
    this.router = router;
    this.homepage = false;
  }

  configureRouter(config, router) {
    this.router = router;
    config.title = 'Aurelia';
    config.map(routes);
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


  attached(){
    this.subscription = this.ea.subscribe(
      'router:navigation:success',
      this.navigationSuccess.bind(this));

    this.subscriber = this.ea.subscribe('backToMenu', backToMenuButton => {
         this.isSelected = true;
      });

      // ENLEVE LE LI 'HOME' SI LE ROUTER EST HOME AU REFRESH
      if (this.router.currentInstruction.config.name === 'home') {
        this.homepage = true;
      }

  }

  toggleMenu() {
		this.isSelected = !this.isSelected;
	}

  detached() {
      this.subscription.dispose();
      this.subscriber.dispose();
  }

  pusher(){
    if(this.selected === true){
      this.isSelected = false;
    }else{
      this.isSelected = false;
    }
  }
}
