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
  }

  configureRouter(config, router) {
    this.router = router;
    config.title = 'Aurelia';
    config.map(routes);
  }

  navigationSuccess(event) {
    let instruction = event.instruction;
    this.isSelected = false;
  }

  attached(){
    this.subscription = this.eventAggregator.subscribe(
      'router:navigation:success',
      ::this.navigationSuccess);
  }

  toggleMenu() {
		this.isSelected = !this.isSelected;
	}

  detached() {
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
