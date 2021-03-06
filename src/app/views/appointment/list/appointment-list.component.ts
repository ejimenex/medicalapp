import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router'
import { AlertService } from '../../../service/alert-sweet.service';
import { AppointmentService } from '../../../service/appointment.service'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { config } from '../../../constant/param';

@Component({
  templateUrl: './appointment-list.component.html'
})
export class AppointmentListComponent implements OnInit {

  appointment = [];
  filterOne='';
  doctorId=0
  dataPage={}
  page:number=0;
  constructor(private translate: TranslateService, private router: Router,private _modalService: NgbModal,
     private alert: AlertService,
      private appointmentService: AppointmentService) {


  }
  new(){
    this.router.navigate(['appointment/create'])
  }
  ngOnInit() {
    this.doctorId=JSON.parse(localStorage.getItem("currentUser")).doctorId;
    this.getAll();
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
    this.appointmentService.getFiltered(this.filterOne,this.page,this.doctorId).subscribe(response => {

      this.appointment = response.data
      .map(res=>{
          res['class']=res.appointmentStateId==1?'badge badge-danger':res['class'];
          res['class']=res.appointmentStateId==2?'badge badge-success':res['class'];
          res['class']=res.appointmentStateId==3?'badge badge-primary':res['class'];
          res['class']=res.appointmentStateId==4?'badge badge-warning':res['class'];
          return res
      });
      this.dataPage=response
    })
  }
  changePage(next:boolean){
    this.page=next?this.page +=1:this.page -=1;
   this.getAll()
  }

}
