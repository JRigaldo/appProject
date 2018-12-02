import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {PostService} from '../common/services/post-service';

@inject(PostService, Router)
export class Create{

  constructor(PostService, Router){
    this.router = Router;
    this.postService = PostService;
  }

  attached(){
    this.post = {
      title: '',
      body: '',
      tags: []
    };

    this.postService.allTags().then(data => {
      this.allTags = data.tags;
    }).catch(error => {
      console.log(error);
    });
  };

  addTag(){
    this.allTags.push(this.newTag);
    this.post.tags.push(this.newTag);
    this.newTag = '';
  }

  createPost(){
    this.postService.create(this.post).then(data => {
      this.router.navigateToRoute('post-view', {slug: data.slug});
    }).catch(error => {
      console.log(error);
    });
  }


}
