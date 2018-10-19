import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import routes from './routes';

@inject(EventAggregator)
export class Shell {

  constructor(ea){
    this.ea = ea;
    this.isSelected = false;
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
  }

  detached() {
      this.subscriber.dispose();
  }

  pusher(){
    this.isSelected = !this.isSelected;
  }

}
