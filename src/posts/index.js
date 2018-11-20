import {inject} from 'aurelia-framework';
import {PostService} from '../common/services/post-service';

@inject(PostService)
export class Index{
  constructor(PostService){
    this.postService = PostService;
  }

  attached(){
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
    })
  }
}
