// /** Avancée 1 **/

// import {bindable} from 'aurelia-framework';
// import {inject} from 'aurelia-framework';
//
// @inject(Element)
// export class Carousel {
//   @bindable items;
//
//   constructor(element, options = {}){
//     this.element = element;
//     this.options = Object.assign({}, {
//       slidesToScroll: 1,
//       slidesVisible: 3
//     }, options);
//
//     console.log(this.element);
//
//   }
//
//   attached(){
//     // let container = document.getElementById('carousel');
//     let ratio = this.carousel.children.length / this.options.slidesVisible
//     this.carousel.style.width = (ratio * 100) + '%';
//
//     let children = [].slice.call(this.carousel.children);
//     // let item = document.querySelectorAll('figure');
//     // console.log(item);
//
//     children.forEach(child => {
//       let childClass = document.createElement('div');
//       childClass.setAttribute('class', 'item-class');
//       childClass.style.width = ((100 / this.options.slidesVisible) / ratio) + '%';
//       childClass.appendChild(child)
//       this.carousel.appendChild(childClass)
//
//       console.log(child);
//     });
//
//
//
//   }
//
//
// }

// /** Avancée 2 **/

// import {bindable} from 'aurelia-framework';
// import {inject} from 'aurelia-framework';
//
// @inject(Element)
// export class Carousel {
//   @bindable items;
//
//   constructor(element, options = {}, items){
//
//     this.element = element;
//     this.options = Object.assign({}, {
//       slidesToScroll: 1,
//       slidesVisible: 3
//     }, options);
//
//     console.log(this.element);
//
//   }
//
//   attached(){
//     let children = [].slice.call(this.carousel.children);
//
//     this.items = children.map(child => {
//       let itemClass = this.createDivWithClass('item-class');
//       itemClass.appendChild(child)
//       this.carousel.appendChild(itemClass)
//       return itemClass;
//     });
//
//     this.setStyle();
//
//   }
//
//   setStyle(){
//     let ratio = this.items.length / this.options.slidesVisible
//     this.carousel.style.width = (ratio * 100) + '%';
//     this.items.forEach(item => {
//       item.style.width = ((100 / this.options.slidesVisible) / ratio) + '%';
//     });
//   }
//
//   createDivWithClass(className){
//     let div = document.createElement('div');
//     div.setAttribute('class', className);
//     return div
//
//   }
//
//
// }

// /** Avancée 3 **/
// import {bindable} from 'aurelia-framework';
// import {inject} from 'aurelia-framework';
//
// @inject(Element)
// export class Carousel {
//   @bindable items;
//
//   constructor(options = {}){
//     this.options = Object.assign({}, {
//       slidesToScroll: 1,
//       slidesVisible: 3
//     }, options);
//   }
//
//
//
//   attached(){
//
//     let children = [].slice.call(this.carousel.children);
//
//     let items = children.map(child => {
//       let childClass = document.createElement('div');
//       childClass.setAttribute('class', 'item-class');
//       childClass.appendChild(child)
//       this.carousel.appendChild(childClass)
//
//       return childClass
//     });
//
//     let ratio = this.carousel.children.length / this.options.slidesVisible
//     this.carousel.style.width = (ratio * 100) + '%';
//     items.forEach(item => {
//       item.style.width = ((100 / this.options.slidesVisible) / ratio) + '%';
//       console.log(item);
//     });
//   }
//
// nav(){
//
// }
//
//
// }
