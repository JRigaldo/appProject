import {inject} from 'aurelia-framework';
import {PostService} from '../common/services/post-service';

@inject (PostService)
export class View{
	
	constructor(PostService){
		this.PostService = PostService;
	}

	activate(params){
		this.PostService.find(params.slug).then(data => {
			if(data.error){
				this.error = data.error;
			}else{
				this.post = data.post;
			}
		});
	}


}