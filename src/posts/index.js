import {inject} from 'aurelia-framework';
import {PostService} from '../common/services/post-service';
import { EventAggregator } from 'aurelia-event-aggregator';

@inject(PostService, EventAggregator)
export class Index{
  constructor(PostService, EventAggregator){
    this.postService = PostService;
    this.ea = EventAggregator;
  }

  attached(){
    this.callPostService();
    this.subscribtionPost = this.ea.subscribe('post-updated', updatedAt => {
      this.callPostService();
    });
  }

  callPostService(){
    this.postService.allPostPreviews().then(data => {
      this.posts = data.posts;
    }).catch(error => {
      this.error = error.message;
    });
    this.postService.allTags().then(data => {
      this.tags = data.tags;
      console.log(this.tags);
    }).catch(error => {
      this.error = error.message;
    });
    this.postService.allArchives().then(data => {
      this.archives = data.archives;
    }).catch(error => {
      this.error = error.message;
    });
  }

  detached(){
    this.subscribtionPost.dispose();
  }

}
