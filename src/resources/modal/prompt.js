import {inject, bindable} from 'aurelia-framework';
import {DialogController} from 'aurelia-dialog';

@inject(DialogController)
export class Prompt{

  newTag = '';
  constructor(controller){
    this.controller = controller;

    controller.settings.centerHorizontalOnly = true;
  }
 
  activate(newTag){
    this.newTag = newTag;
  }

  cancel() {
    this.controller.cancel();
  }



}
