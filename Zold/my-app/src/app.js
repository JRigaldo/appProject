import {inject} from 'aurelia-framework';
import {PostService} from './common/services/post-service';

@inject (PostService)
export class App {


  constructor(PostService) {
    this.isSelected = false;
    this.postService = PostService;
  }

  attached() {
    this.postService.allTags().then(data => {
      this.tags = data.tags;
    }).catch(error => {
      this.error = error.message;
    });
  }


  configureRouter(config, router) {
  	config.title = "My App";
  	config.map([
  		 { route: '', name: 'home', moduleId: PLATFORM.moduleName('posts/index'), nav: true, title: 'All Posts' },
       { route: 'post/:slug', name: 'post-view', moduleId: PLATFORM.moduleName('posts/view'), title: 'View Post' },
       { route: 'tag/:tag', name: 'tag-view', moduleId: PLATFORM.moduleName('posts/tag-view'), title: 'Tag Post' },
  		 { route: 'archive/:archive', name: 'archive-view', moduleId: PLATFORM.moduleName('posts/archive-view'), title: 'Archive Post' }

  	]);
  	this.router = router;
  }

  toggleMenu() {
		this.isSelected = !this.isSelected;
		// console.log(this.isSelected);
	}
}
