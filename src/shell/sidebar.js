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
    console.log(this.router.isActive);
  }

  menuIndex(){
    let lis = [].slice.call(this.sidebarMenu.children);
    let ul = this.sidebarMenu;
    for(let i = 0; i < lis.length; i++){
      lis[i].addEventListener('click', clickPosition, false);
      function clickPosition(e) {
        e.preventDefault;

        if(this.router.isActive === true){
          return
        }else{
          if (lis[i] !== this.e) {
            ul.prepend(lis[i]);
          }
        }


      }
    }
  }

  backToMenu(){
    let backToMenuButton = true;
    this.ea.publish('backToMenu', backToMenuButton);
  }

  detached(){
    this.subscriber.dispose();
  }
}
