import $ from 'jquery';
import Masonry from 'masonry-layout';

export class MasonryGrid{

  constructor(){
  }

  attached(){
    this.masonry();
  }

  masonry() {
    let grid = document.querySelector('.grid')
    let msnry = new Masonry(grid, {
      itemSelector: '.grid-item',
      isFitWidth: true,
      gutter: 2,
      columnWidth: 180
    })
    msnry.once('layoutComplete', () => {
      grid.classList.add('load')
    })

    msnry.layout()
  }
}
// // external js: masonry.pkgd.js
//
// $('.grid').masonry({
//   itemSelector: '.grid-item',
//   columnWidth: 180,
//   isFitWidth: true
// });


// itemSelector: '.grid-item',
// columnWidth: '.grid-sizer',
// gutter: '.gutter-sizer',
// percentPosition: true,
// // itemSelector: '.grid-item',
// // percentPosition: true,
// // columnWidth: 280,
// // gutter: 50,
// // transitionDuration: 0,
// // initLayout: false
// itemSelector: '.grid-item',
// columnWidth: 160
