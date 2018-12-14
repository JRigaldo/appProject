import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {EventAggregator} from 'aurelia-event-aggregator';
import {PostService} from '../common/services/post-service';
import {AuthService} from '../common/services/auth-service';


@inject(PostService, AuthService, Router, EventAggregator)
export class Edit{

  constructor(PostService, AuthService, Router, EventAggregator){
    this.router = Router;
    this.postService = PostService;
    this.authService = AuthService;
    this.ea = EventAggregator;
  }

  activate(params){
    this.postService.find(params.slug).then(data => {
      // if(data.post.author !== this.authService.currentUser){
      //   this.router.navigateToRoute('home');
      // }
      this.post = data.post;
    }).catch(error => {
      this.ea.publish('toast', {
        type: 'error',
        message: 'Post not found'
      });
      this.router.navigateToRoute('home');
    });
    this.title = 'Edit';
  }

  editPost(){
    this.postService.update(this.post).then(data => {
      this.ea.publish('post-updated', Date());
      this.ea.publish('toast', {
        type: 'error',
        message: 'Post edited !'
      });
      this.router.navigateToRoute('post-view', {slug: data.slug});
    }).catch(error => {
      this.ea.publish('toast', {
        type: 'error',
        message: error.message
      });
    });
  }


}
