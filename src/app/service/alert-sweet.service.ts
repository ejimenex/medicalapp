import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'
import { TranslateService } from '@ngx-translate/core';

//declare var swal: any;
@Injectable()
export class AlertService {
  constructor(private translate:TranslateService) { }
  error(message: string, title?: string) {

    Swal.fire(
    title || 'Error',
       message,
      'error'
    );
  }
  info(message: string, title?: string) {
    Swal.fire(
     title || 'Información',message,'info' );
  }
  warning(message: string, title?: string) {
    Swal.fire( title || 'Confirmación',message,'warning'
    );
  }
  success(message: string, title?: string) {
    Swal.fire(title ,message,'success'  );
  }
  question(ok: () => void,title:string,msg:string){
    Swal.fire({
      title: title,
      text: msg,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
       ok()
      }
    })
  }
}
