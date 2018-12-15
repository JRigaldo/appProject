import {inject} from 'aurelia-framework';
import {DialogService} from 'aurelia-dialog';
import {Modal} from './modal';

@inject(DialogService)
export class CommonDialogs{
  constructor(DialogService){
    this.dialogService = DialogService;
  }

  createPost(title, message = 'Mon message', options = ['OK']){
    return this.dialogService.open({viewModel: Modal, model: {title, message, options}});
  }
}
