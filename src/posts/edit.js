import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {EventAggregator} from 'aurelia-event-aggregator';
import {PostService} from '../common/services/post-service';

@inject(PostService, Router, EventAggregator)
export class Edit{

  constructor(PostService, Router, EventAggregator){
    this.router = Router;
    this.postService = PostService;
    this.ea = EventAggregator;
  }

  activate(params){
    this.postService.find(params.slug).then(data => {
      this.post = data.post;
    }).catch(error => {
      console.log(error);
    });
    this.title = 'Edit';
  }

  editPost(){
    this.postService.update(this.post).then(data => {
      this.ea.publish('post-updated', Date());
      this.router.navigateToRoute('post-view', {slug: data.slug});
    }).catch(error => {
      console.log(error);
    });
  }


}
