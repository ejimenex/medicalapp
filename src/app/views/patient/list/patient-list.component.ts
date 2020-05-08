import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router'
import { AlertService } from '../../../service/alert-sweet.service';
import { PatientService } from '../../../service/patient.service'
import {EditPatientComponent} from '../edit/patient-edit.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { config } from '../../../constant/param';



interface ITableColumn {
  header: string;
  value?: string;
}

@Component({
  templateUrl: './patient-list.component.html'
})
export class PatientListComponent implements OnInit {

  patients = [];
  filterOne='';
  dataPage={}
  doctorId=0
  page:number=0;
  constructor(private translate: TranslateService, private router: Router,private _modalService: NgbModal,
     private alert: AlertService,
      private patientService: PatientService) {


  }
  ngOnInit() {
    this.doctorId=JSON.parse(localStorage.getItem("currentUser")).doctorId;
    this.getAll();
    
  }
  openEditView(id: number): void {
    let modal = this._modalService.open(
      EditPatientComponent,
      config.modalConfig
    )
    modal.componentInstance.id = id
    modal.componentInstance.notifyParent.subscribe(result => {
      this.getAll();
    })
  }
  confirmDelete(id) {
    this.alert.question(() => { this.delete(id) }, this.translate.instant('confirm'), this.translate.instant('sureTextRemove'))
  }
  delete(id) {
    this.patientService.delete(id).subscribe(response => {
      this.alert.success(this.translate.instant('sucessDelete'));
      this.getAll();
    }, error => {
      this.alert.success(this.translate.instant(''));
    })
  }

  newPatient() {
    this.router.navigate(['patient/add'])
  }
  newAppointment(id){
    this.router.navigate(['appointment/create/'+id])
  }
  getAll( ) {
    this.patientService.getFiltered(this.doctorId,this.page,this.filterOne).subscribe(response => {

      this.patients = response.data;
      this.dataPage=response
    })
  }
  newConsultaton(id) {
    this.router.navigate(['consultation/add/' + id])
  
}
  changePage(next:boolean){
    this.page=next?this.page +=10:this.page -=10;
   this.getAll()
  }

}
