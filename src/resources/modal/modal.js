import {inject} from 'aurelia-framework';
import {DialogController} from 'aurelia-dialog';

@inject(DialogController)
export class Modal{

  constructor(DialogController){
    this.dialogController = DialogController;
  }

  activate(model){
    this.model = model;
  }

}
