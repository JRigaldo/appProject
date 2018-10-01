import {inject} from 'aurelia-framework';
import {PostService} from '../common/services/post-service';

@inject (PostService)
export class View{
	
	constructor(PostService){
		this.PostService = PostService;
	}

	activate(params){
		this.error = '';
		this.PostService.find(params.slug).then(data => {
			this.post = data.post;
		}).catch(error => {
			this.error = error.message;
		});
	}


}