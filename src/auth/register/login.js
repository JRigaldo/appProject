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

  attached(){
    $('.field-input').focus(function(){
      $(this).parent().addClass('is-focused has-label');
    });

    $('.field-input').blur(function(){

      if($(this).val() == ''){
        $(this).parent().removeClass('has-label')
      }
      $(this).parent().removeClass('is-focused');
    });
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
      this.ea.publish('toast', {
        type: 'error',
        message: error.message
      });
      this.error = error.message;
    })
  }

}
