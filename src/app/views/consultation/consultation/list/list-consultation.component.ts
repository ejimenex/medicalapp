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
import { ListPrescripcionComponent } from '../../../prescription/list/list-prescription.component';


@Component({
  templateUrl: './list-consultation.component.html'
})
export class ConsultationListComponent implements OnInit {

  consultationList = [];
  reasonList=[];
  doctorId=null
  filterOne='';
  filterDate:any={};
  dataPage:any={}
  page:number=1;
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
    this.doctorId=JSON.parse(localStorage.getItem("currentUser")).doctorId;
    //this.filter.orderBy='id'
    this.getAll();
    
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
    this.consultationService.getByDoctor(this.doctorId,this.page,this.filterOne,this.filterDate).subscribe(response => {

      this.consultationList = response.data;
      this.dataPage=response
    })
  }
  changePage(next:boolean){;
    this.page=next?this.page +=1:this.page -=1;
    if(this.page<0) this.page=0;
    this.getAll()
  }

}
