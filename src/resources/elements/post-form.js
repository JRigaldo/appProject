import {inject, bindable} from 'aurelia-framework';
import {ValidationRules, ValidationControllerFactory, validationMessages} from 'aurelia-validation';
import {PostService} from '../../common/services/post-service';
import {EventAggregator} from 'aurelia-event-aggregator';
import $ from 'jquery';
import * as textareaAutosize from 'textarea-autosize';

@inject(PostService, ValidationControllerFactory, EventAggregator)
export class PostForm{
  @bindable title;
  @bindable post;

  constructor(PostService, ValidationControllerFactory, EventAggregator){
    this.ea = EventAggregator;
    this.postService = PostService;
    this.controller = ValidationControllerFactory.createForCurrentScope();
    console.log(this.controller);
  }

  attached(){
    this.postService.allTags().then(data => {
      this.allTags = data.tags;
    }).catch(error => {
      this.ea.publish('toast', {
        type: 'error',
        message: error.message
      })
    });

    $('textarea.js-auto-size').textareaAutoSize();

    $('.field-input').focus(function(){
      $(this).parent().addClass('is-focused has-label');
    });

    $('.field-input').blur(function(){

      if($(this).val() == ''){
        $(this).parent().removeClass('has-label')
      }
      $(this).parent().removeClass('is-focused');
    });
  }

  submit(){

  }

  addTag(){
    this.allTags.push(this.newTag);
    this.post.tags.push(this.newTag);
    this.newTag = '';
  }

  postChanged(newValue, oldValue){

    validationMessages['required'] = `You must enter a \${$displayName}.`;

    if(this.post){
      ValidationRules
      .ensure('title').displayName('title')
        .required()
        .minLength(5)
        .maxLength(50)
      .ensure('body').displayName('body')
        .required()
        .minLength(5)
        .maxLength(50)
       .on(this.post);

      this.controller.validate();
    }
  }

}
