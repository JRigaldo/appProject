import {inject} from 'aurelia-framework';
import {PostService} from '../common/services/post-service';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(PostService, EventAggregator)
export class ArchiveView{
  constructor(PostService, EventAggregator){
    this.postService = PostService;
    this.ea = EventAggregator;
  }

  activate(params){
    this.archive = params.archive;
    this.title = this.archive;
    this.postService.postsByArchive(this.archive).then(data => {
      this.posts = data.posts;
    }).catch(error => {
      this.ea.publish('toast', {
        type: 'error',
        message: error.message
      });
      // this.error = error.message;
    });
  }
}
