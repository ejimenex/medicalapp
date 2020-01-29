import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router'
import { AlertService } from '../../../../service/alert-sweet.service';
import { PatientService } from '../../../../service/patient.service';
import { ConsultationService } from '../../../../service/consultation.service';
import { ReasonConsultationService } from '../../../../service/reason-consultation.service';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PatientComponent } from './new/patient.component';
import { config } from '../../../../constant/param';


interface ITableColumn {
  header: string;
  value?: string;
}

@Component({
  templateUrl: './list-consultation.component.html'
})
export class ConsultationListComponent implements OnInit {

  consultationList = [];
  reasonList=[];
  filters: ITableColumn[];
  filter:any={};
  page:number=0;
  constructor(private translate: TranslateService,
     private router: Router,
     private _modalService: NgbModal,
     private alert: AlertService,
     private reasonConsultationService:ReasonConsultationService,
     private consultationService:ConsultationService,
      private patientService: PatientService) {


  }

  openNewConsultation(): void {
    let modal = this._modalService.open(
      PatientComponent,
      config.modalConfig
    )
    
  }
  ngOnInit() {
    this.filter.specifiedField=JSON.parse(localStorage.getItem("currentUser")).doctorId;
    //this.filter.orderBy='id'
    this.getAll();
   
    this.filters = [
      { header: this.translate.instant('patientName'), value: 'patinetName' },
      { header: this.translate.instant('officeName'), value: 'officeName' }    
    ];  
    
  }
  openEditView(id){
    this.router.navigate(['consultation/edit/'+id])
  }

  confirmDelete(id) {
    this.alert.question(() => { this.delete(id) }, this.translate.instant('confirm'), this.translate.instant('sureTextRemove'))
  }
  delete(id) {
    this.consultationService.delete(id).subscribe(response => {
      this.alert.success(this.translate.instant('sucessDelete'));
      this.getAll();
    }, error => {
      this.alert.success(this.translate.instant(''));
    })
  }

  newPatient() {
    this.router.navigate(['consultation/add'])
  }
  newAppointment(id){
    this.router.navigate(['consultation/create/'+id])
  }
  getAll( ) {
    this.consultationService.getBySpecifiedParam(true,this.filter,this.page,'DoctorId').subscribe(response => {

      this.consultationList = response;
    })
  }
  getFiltered(){
    this.consultationService.getBySpecifiedParam(false,this.filter,this.page,'DoctorId').subscribe(response => {
      this.consultationList = response;
    })
  }
  changePage(next:boolean){
    this.filter.value=!this.filter.value?'':!this.filter.value;
    
    if(!this.filter.field)this.filter.field='id';
    this.page=next?this.page +=10:this.page -=10;
    if(this.page<0) this.page=0;
    
    this.consultationService.getBySpecifiedParam(false,this.filter,this.page,'DoctorId').subscribe(response => {
      this.consultationList = response;
    })
  }

}
