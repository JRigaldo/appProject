import {inject} from 'aurelia-framework';
import {PostService} from '../common/services/post-service';
import {AuthService} from '../common/services/auth-service';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(PostService, AuthService, EventAggregator)
export class View{
  constructor(PostService, AuthService, EventAggregator){
    this.postService = PostService;
    this.authService = AuthService;
    this.ea = EventAggregator;
  }

  activate(params){
    this.error = '';
    this.relatePost = params;
    this.postService.find(params.slug).then(data => {
      this.post = data.post;
      console.log(params.slug);

      this.ea.publish('pageParams', params)
    }).catch(error => {
      this.ea.publish('toast', {
        type: 'error',
        message: error.message
      });
    });
  }

  attached(){
    console.log(this.relatePost);
    this.postService.allPostPreviews().then(data => {
      this.posts = data.posts;
    }).catch(error => {
      this.ea.publish('toast', {
        type: 'error',
        message: error.message
      });
    });
  }
}
