import { inject } from 'aurelia-framework';
import {Router} from 'aurelia-router'
import { EventAggregator } from 'aurelia-event-aggregator';
import routes from './routes';

@inject(EventAggregator, Router)
export class Shell {

  constructor(ea, router){
    this.ea = ea;
    this.isSelected = false;
    this.linkIsSelected = false;
    this.router = router;


  }

  configureRouter(config, router) {
    this.router = router;
    config.title = 'Aurelia';
    config.map(routes);
  }


  toggleMenu() {
		this.isSelected = !this.isSelected;
    // console.log(this.isSelected);
    this.ea.publish('puppyMonkeyBaby', {testValue: this.isSelected});


	}

  attached() {
      this.subscriber = this.ea.subscribe('puppyMonkeyBaby', response => {
          console.log(response.testValue);
      });

      this.router.routes.forEach(route => console.log(route));


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
