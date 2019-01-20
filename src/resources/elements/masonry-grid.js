import $ from 'jquery';
import ImagesLoaded from 'imagesloaded';
import jQueryBridget from 'jquery-bridget';
import Masonry from 'masonry-layout';
import {bindable} from 'aurelia-framework';

export class MasonryGrid{
  @bindable posts;

  attached(){
    setTimeout(() => {
		    this.masonry();
  	}, 100);

  }

  masonry() {
    jQueryBridget( 'masonry', Masonry, $ );
    jQueryBridget( 'imagesLoaded', ImagesLoaded, $ );

    let $grid = $('.grid');
    $grid.imagesLoaded(function () {
        $grid.masonry({
            itemSelector: '.grid-item',
            // columnWidth: '.grid__sizer',
            percentPosition: true
        });
     });

    // let grid = document.querySelector('.grid')
    // let msnry = new Masonry(grid, {
    //   itemSelector: '.grid-item',
    //   // isFitWidth: true,
    //   // gutter: 2,
    //   // columnWidth: '.grid-item'
    //   percentPosition: true
    // });

    // msnry.once('layoutComplete', () => {
    //   grid.classList.add('load')
    //
    // });

    // msnry.layout()
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
