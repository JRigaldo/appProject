import $ from 'jquery';
import Slick from 'slick-carousel';

export class Carousel{

  constructor(){

  }

  attached(){
    setTimeout(() => {

      $('.slider').slick({
        dots: true,
        speed: 500,
        nextArrow: '<button class="slick-next"></button>',
        prevArrow: '<button class="slick-prev"></button>',
        dotsClass: 'slick-dots custom-pagination',
        customPaging: function (slider, i) {
          return  (i + 1) + '/' + slider.slideCount;
        },
        responsive: [
          {
            breakpoint: 769,
            settings: {
              arrows: false
            }
          }
        ]
      });

      // $(document).ready(function() {
      // $(window).on('resize', '', {'width': $('.router-views').width()}, this.onResizeWatch)});

      // $(window).on('resize', {'width': $('.router-views').width()});

      $( ".slick-dots" ).clone().appendTo( ".copy-dots" ).children().empty();

      var activeClass = 'slick-active', ariaAttribute = 'aria-hidden';
      $('.slider').on('init', function(){
        $('.copy-dots .custom-pagination li:first-of-type').addClass(activeClass).attr( ariaAttribute, false );
      })

      $('.slider').on('afterChange', function(event, slick, currentSlide){

        var $dots = $('.copy-dots .custom-pagination');
        $('li', $dots).removeClass(activeClass).attr(ariaAttribute, true);
        $dots.each(function() {
          $('li', $(this)).eq(currentSlide).addClass(activeClass).attr(ariaAttribute, false);
        })
      })

      $(".slick-next").empty();
      $(".slick-prev").empty();

      // $('.router-views').slick({
      //   onAfterChange: function(oldValue, newValue) {
      //     if(oldValue !== newValue){
      //       console.log(oldValue, newValue);
      //       $('.slider').slickSetOption(null, null, true);
      //     }
      //
      //   }
      // });


    }, 0);
  }

  // onResize(){
  //   $('.router-views').slick({
  //
  //   })
  // }



}

//COPY CLONE OF PAGINATION
// var activeClass = 'slick-active',
// ariaAttribute = 'aria-hidden';
// $( '.slider' )
// .on( 'init', function() {
//     $( '.slick-dots li:first-of-type' ).addClass( activeClass ).attr( ariaAttribute, false );
// } )
// .on( 'afterChange', function( event, slick, currentSlide ) {
//     var $dots = $( '.slick-dots' );
//     $( 'li', $dots ).removeClass( activeClass ).attr( ariaAttribute, true );
//     $dots.each( function() {
//         $( 'li', $( this ) ).eq( currentSlide ).addClass( activeClass ).attr( ariaAttribute, false );
//     } );
// } );


//COPY CLONE OF PAGINATION AND CLICK (DIDN'TRIED)
// $('.containElements').on('init', function(event, slick) {
//
//   var dotsClone = ''
//   $(".containElements ul.slick-dots li").each(function() {
//     dotsClone = dotsClone + '<li class="dot-' + $(this).index() + '" data-slick-index="' + $(this).index() + '"></li>'
//   });
//
//   var dotsCloneElement = document.createElement('ul');
//   dotsCloneElement.className = 'slick-dots-clone slick-dots';
//   dotsCloneElement.innerHTML = dotsClone;
//
//   $('#services .slick-dots').addClass('slick-dots-original');
//
//   $('#services .slick-slider').append(dotsCloneElement);
//
//   $('.slick-dots-clone li').click(function() {
//     var slickIndex = $(this).data('slick-index');
//     $('.slick-dots-clone li').removeClass('slick-active');
//     $(this).addClass('slick-active');
//
//     $('.slick-dots-original li').eq(slickIndex).click();
//   });
//
//   setInterval(function() {
//     $(".slick-dots-original li").each(function() {
//       if ($(this).hasClass('slick-active')) {
//         var slickIndex = ($(this).find('button').text() - 1);
//         $('.slick-dots-clone li').removeClass('slick-active');
//         $('.slick-dots-clone li').eq(slickIndex).addClass('slick-active');
//       }
//     });
//   }, 100);
//
// });
//
// $('.containElements').slick({
//   dots: true,
//   arrows: false,
//   autoplay: false,
//   infinite: false,
//   speed: 300,
//   adaptiveHeight: true,
//   slidesToShow: 1,
//   slidesToScroll: 1
// });
