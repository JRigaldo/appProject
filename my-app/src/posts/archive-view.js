import {inject} from 'aurelia-framework';
import {PostService} from '../common/services/post-service';

@inject (PostService)
export class ArchiveView {     

  constructor(PostService){
		this.PostService = PostService;
	}

	activate(params){
		this.archive = params.archive;
		this.PostService.postsByArchive(this.archive).then(data => {
			this.posts = data.posts;
		}).catch(error => {
			this.error = error.message;
		});
	}
}