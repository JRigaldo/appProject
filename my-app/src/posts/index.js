import {inject} from 'aurelia-framework';
import {PostService} from '../common/services/post-service';

@inject (PostService)
export class Index{

	constructor(PostService) {
	  this.PostService = PostService;
	}

	attached(){
  	this.PostService.allPostPreviews().then(data => {
  		if(data.errors){
  			// Handel the errors 
  		}else{
  			this.posts = data.posts;
  			console.log(this.posts);
  		}
  	});
  }
	
}