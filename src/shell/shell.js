import routes from './routes';
import {inject} from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class Shell{
  constructor(EventAggregator){
    this.ea = EventAggregator;
    this.isSelected = false;
    this.homepage = false;
  }
  configureRouter(config, router) {
    this.router = router;
    config.map(routes);
  }

  attached(){
    this.subscription = this.ea.subscribe(
      'router:navigation:success',
      this.navigationSuccess.bind(this));
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
		this.isSelected = !this.isSelected;
	}

  pusher(){
    if(this.selected === true){
      this.isSelected = false;
    }else{
      this.isSelected = false;
    }
  }

  detached() {
      this.subscription.dispose();
      this.subscriber.dispose();
  }
}
