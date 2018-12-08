import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {PostService} from '../common/services/post-service';

@inject(PostService, EventAggregator)
export class TagView{
  constructor(PostService, EventAggregator){
    this.postService = PostService;
    this.ea = EventAggregator;
  }

  activate(params){
    this.tag = params.tag;
    this.title = this.tag;
    this.postService.postsByTag(this.tag).then(data => {
      this.posts = data.posts;
    }).catch(error => {
      this.ea.publish('toast', {
        type: 'error',
        message: error.message
      });
    });
  }
}
