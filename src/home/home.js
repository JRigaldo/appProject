import $ from 'jquery';
import Slick from 'slick-carousel';

export class Home{

  constructor(slick){
    this.slick = slick;
  }


  attached(){
    $('.slider').slick()
  }

}
