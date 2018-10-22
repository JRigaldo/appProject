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

    // this.subscribe();
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
    this.subscription = this.ea.subscribe(
        'router:navigation:success',
        this.navigationSuccess.bind(this));
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

// getRoute() {
//   this.router.routes.forEach(route => {
//     if(route.name === this.router.currentInstruction.config.name){
//         // <h1>test ${router.currentInstruction.config.title}</h1>
//     }
//   });
//  }


// toggleMenu() {
//   this.isSelected = !this.isSelected;
//   // console.log(this.isSelected);
//   this.ea.publish('puppyMonkeyBaby', {testValue: this.isSelected});
// }
//
// attached() {
//   this.subscriber = this.ea.subscribe('puppyMonkeyBaby', response => {
//       console.log(response.testValue);
//     });
//
//     // if(this.router.currentInstruction.config.name = !this.router.currentInstruction.config.name){
//     //   this.isSelected = false;
//     // }
//
//     // let changeRoute = this.router.currentInstruction.config.name
//     // if(changeRoute = !changeRoute){
//     //   this.isSelected = false;
//     // }
//
// }

// console.log(this.router.currentInstruction.config.name);
// console.log(window.location.href);
// if(window.location.href = !window.location.href){
//   console.log('Say hello');
// }


  // locationHashChanged() {
  //   if (location.hash ===  window.location.href) {
  //       console.log('login');
  //   }
  //
  // }

  // window.onhashchange = function(){
  //   console.log('test');
  //   console.log(this.isSelected);
  // }

  // attached(){
  //    // this.ea.publish('puppyMonkeyBaby', {testValue: this.isSelected});
  //    // console.log(window.location);
  //    // console.log(window.location.href);
  //    // console.log(this.router.currentInstruction.config.title);
  //    // console.log(this.router.currentInstruction);
  //
  //    // this.ea.publish('changeHash', this.router.navigation);
  //    //
  //    // let subscriber = this.ea.subscribe('EventMenuLink', response => {
  //    //   console.log(response);
  //    // });
  //
  //    // console.log(this.router.currentInstruction.config.title);
  //    let linkMenu = this.router.routes;
  //    // console.log(linkMenu);
  //    linkMenu.forEach((el) => {
  //      // link.addEventListener('click', (target) => {
  //      //   console.log(target);
  //      // })
  //
  //      // console.log(el.name);
  //      if(this.router.currentInstruction.config.name){
  //
  //      }
  //
  //      // el.addEventListener('click', () => {
  //      //
  //      // });
  //    });
  //    // console.log(this.router.routes);
  //
  // }
  //
  // }

  // window.onhashchange = function(el) {
  // }
