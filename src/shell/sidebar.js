import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import {Router} from 'aurelia-router'

@inject(EventAggregator, Router)
export class SideBar{

  constructor(ea, router){
    this.ea = ea;
    this.backToMenuButton = false;
    this.router = router;
  }

  attached(){
    this.menuIndex();
  }

  menuIndex(){
    let lis = [].slice.call(this.sidebarMenu.children);
    let ul = this.sidebarMenu;
    for(let i = 0; i < lis.length; i++){
      lis[i].addEventListener('click', clickPosition, false);
      function clickPosition(e) {
        e.preventDefault;

        if(!this.classList.contains('active')){
          ul.prepend(lis[i]);
        }
      }
    }
    if (performance.navigation.type) {
      // console.info( "This page is reloaded" );
      for(let i = 0; i < lis.length; i++){
        if (lis[i].classList.contains('active')) {
          ul.prepend(lis[i])
        }
      }
    }
  }

  backToMenu(){
    let backToMenuButton = true;
    this.subscriber = this.ea.publish('backToMenu', backToMenuButton);
  }

  detached(){
    this.clickSubscription.dispose();
    this.subscriber.dispose();
  }
}
