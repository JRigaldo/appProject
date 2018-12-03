import {inject, bindable} from 'aurelia-framework';
import {PostService} from '../../common/services/post-service';

@inject(PostService)
export class PostForm{
  @bindable title;
  @bindable post;

  constructor(PostService){
    this.postService = PostService;
  }

  attached(){
    this.postService.allTags().then(data => {
      this.allTags = data.tags;
    }).catch(error => {
      console.log(error);
    });
  }

  submit(){

  }

  addTag(){
    this.allTags.push(this.newTag);
    this.post.tags.push(this.newTag);
    this.newTag = '';
  }

}
