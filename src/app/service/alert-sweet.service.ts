import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'
import { TranslateService } from '@ngx-translate/core';
import { NzModalService,NzModalRef } from 'ng-zorro-antd/modal';

//declare var swal: any;
@Injectable()


export class AlertService {
  confirmModal:NzModalRef
  constructor(private translate:TranslateService,private modal: NzModalService) { }
  // error(message: string, title?: string) {

  //   Swal.fire(
  //   title || 'Error',
  //      message,
  //     'error'
  //   );
  // }
  info(message: string, title?: string) {
    Swal.fire(
     title || 'Información',message,'info' );
  }
  warning(message: string, title?: string) {
    Swal.fire( title || 'Confirmación',message,'warning'
    );
  }
  // success(message: string, title?: string) {
  //   Swal.fire(title ,message,'success'  );
  // }
  // // question(ok: () => void,title:string,msg:string){
  //   Swal.fire({
  //     title: title,
  //     text: msg,
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Yes'
  //   }).then((result) => {
  //     if (result.value) {
  //      ok()
  //     }
  //   })
  // }


  //NGZORRO ALERT

  question(ok: () => void,title:string,msg:string): void {
    this.confirmModal = this.modal.confirm({
      nzTitle: title,
      nzContent: msg.toUpperCase(),
      nzCancelText:'Cancel',
      nzOkText:'Ok',
      nzOnOk: () =>
       ok()});
  }


  success(message:string,title?:string): void {
    this.modal.success({
      nzTitle: title || '',
      nzContent: message.toUpperCase(),
      nzOkText:'Ok'
    });
  }

  error(message:string,title?: string): void {
    this.modal.error({
      nzTitle: title || 'Error',
      nzContent: message.toUpperCase(),
      nzOkText:'Ok'      
    });
  }
}
