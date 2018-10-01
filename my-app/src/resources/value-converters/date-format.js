import moment from 'moment';

export class DateFormatValueConverter {
  toView(value) {
  	return moment(value).format('MMMM Do YYYYY, h:mm a');
  }

  fromView(value) {

  }
}

