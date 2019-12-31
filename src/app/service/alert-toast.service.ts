import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';

@Injectable()
export class AlertToast {
  constructor(private toastr: ToastrService) {}
 
  showSuccess(msg:string, title:string) {
 
    this.toastr.success(msg, title);
  }
  showError(msg:string, title:string) {
    this.toastr.error(msg, title);
  }
}