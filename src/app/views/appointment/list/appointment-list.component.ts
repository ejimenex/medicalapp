import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router'
import { AlertService } from '../../../service/alert-sweet.service';
import { AppointmentService } from '../../../service/appointment.service'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { config } from '../../../constant/param';
interface ITableColumn {
  header: string;
  value?: string;
}

@Component({
  templateUrl: './appointment-list.component.html'
})
export class AppointmentListComponent implements OnInit {

  appointment = [];
  filters: ITableColumn[];
  filter:any={};
  count=0
  page:number=0;
  constructor(private translate: TranslateService, private router: Router,private _modalService: NgbModal,
     private alert: AlertService,
      private appointmentService: AppointmentService) {


  }
  ngOnInit() {
    this.filter.specifiedField=JSON.parse(localStorage.getItem("currentUser")).doctorId;
    //this.filter.orderBy='id'
    this.getAll();
    this.filters = [
      { header: this.translate.instant('patient'), value: 'patient' },
      { header: this.translate.instant('doctorOffice'), value: 'officeName' } 
    ];  
    
  }

  confirmDelete(id) {
    this.alert.question(() => { this.delete(id) }, this.translate.instant('confirm'), this.translate.instant('sureTextRemove'))
  }
  confirmCancel(id,item) {
    this.alert.question(() => { this.cancel(id,item) }, this.translate.instant('confirm'), this.translate.instant('sureCancel'))
  }
  delete(id) {
    this.appointmentService.delete(id).subscribe(response => {
      this.alert.success(this.translate.instant('sucessDelete'));
      this.getAll();
    }, error => {
      this.alert.success(this.translate.instant(''));
    })
  }

  cancel(id,item) {
    item.appointmentStateId=1;
    this.appointmentService.put(id,item).subscribe(response => {
      this.alert.success(this.translate.instant('sucessDelete'));
      this.getAll();
    }, error => {
      this.alert.success(this.translate.instant(''));
    })
  }
  getAll( ) {
    this.appointmentService.getBySpecifiedParam(true,this.filter,this.page,'DoctorId').subscribe(response => {

      this.appointment = response['value']
      .map(res=>{
          res['class']=res.appointmentStateId==1?'badge badge-danger':res['class'];
          res['class']=res.appointmentStateId==2?'badge badge-success':res['class'];
          res['class']=res.appointmentStateId==3?'badge badge-primary':res['class'];
          res['class']=res.appointmentStateId==4?'badge badge-warning':res['class'];
          return res
      });
      this.count=response['@odata.count']
    })
  }
  getFiltered(){
    this.appointmentService.getBySpecifiedParam(false,this.filter,this.page,'DoctorId').subscribe(response => {

      this.appointment = response['value'];
      this.count=response['@odata.count']
    })
  }
  changePage(next:boolean){
    this.filter.value=!this.filter.value?'':!this.filter.value;
    
    if(!this.filter.field)this.filter.field='name';
    this.page=next?this.page +=10:this.page -=10;
    if(this.page<0) this.page=0;
    
    this.appointmentService.getBySpecifiedParam(false,this.filter,this.page,'DoctorId').subscribe(response => {
      this.appointment = response['value'];
      this.count=response['@odata.count']
    })
  }

}
