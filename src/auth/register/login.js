import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {AuthService} from '../../common/services/auth-service';
import { EventAggregator } from 'aurelia-event-aggregator';

@inject(AuthService, Router, EventAggregator)
export class Login{

  constructor(AuthService, Router, EventAggregator){
    this.ea = EventAggregator;
    this.router = Router;
    this.authservice = AuthService;
  }

  activate(){
    this.error = null;
  }

  login(){
    this.error = null;
    this.authservice.login(this.name).then(data => {
      this.ea.publish('user', data.name);
      this.router.navigateToRoute('home');
    }).catch(error => {
      this.error = error.message;
    })
  }

}
