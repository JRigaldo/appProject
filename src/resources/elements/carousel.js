import {bindable} from 'aurelia-framework';
import {inject} from 'aurelia-framework';

@inject(Element)
export class Carousel {
  @bindable items;

  constructor(options = {}){
    this.options = Object.assign({}, {
      slidesToScroll: 3,
      slidesVisible: 2
    }, options);
  }



  attached(){
    let children = [].slice.call(this.carousel.children);
    this.currentItem = 0;

    let items = children.map(child => {
      let childClass = document.createElement('div');
      childClass.setAttribute('class', 'item-class');
      childClass.appendChild(child)
      this.carousel.appendChild(childClass)

      return childClass
    });

    let ratio = this.carousel.children.length / this.options.slidesVisible
    this.carousel.style.width = (ratio * 100) + '%';
    items.forEach(item => {
      item.style.width = ((100 / this.options.slidesVisible) / ratio) + '%';
    });
  }

prev(){
  this.goTiItem(this.currentItem + this.options.slidesToScroll);
}

next(){
  this.goTiItem(this.currentItem - this.options.slidesToScroll);
}

goTiItem(index){
  if (index < 0) {
    index = this.items.length - this.options.slidesVisible;
  }else if(index >= this.items.length || this.items[this.currentItem + this.options.slidesVisible] === undefined){
    index = 0
  }
  let translateX = (index * -100) / this.items.length;
  this.carousel.style.transform = 'translate3d('+ translateX +'%, 0, 0)';
  this.currentItem = index;
  debugger
}


}
