import {bindable} from 'aurelia-framework';

export class CarouselCustomElement {
  @bindable items;

  activate() {
    this.itemsChanged(this.items);
  }

  itemsChanged(items) {
    this.currentIndex = 0;    
    this.items[this.currentIndex].carouselCurrent = true;
  }


}
