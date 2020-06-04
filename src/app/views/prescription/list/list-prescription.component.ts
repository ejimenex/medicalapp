import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { AlertService } from '../../../service/alert-sweet.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { TranslateService } from '@ngx-translate/core';
import { PrescriptionService } from '../../../service/prescription.service';



@Component({
  selector: 'prescription-list-app',
  templateUrl: './list-prescription.component.html'
})
export class ListPrescripcionComponent implements OnInit {

  id: number;
  pre: any = {};
  list = [];
  page = 1;
  dataPage={}
  filter: any = {};
  doctor = 0;

  constructor(
    private alertService: AlertService,
    public activeModal: NgbActiveModal,
    private recetaService: PrescriptionService,
    private translate: TranslateService) { }

  ngOnInit() {

    this.filter.field = 'medicine';
    this.filter.value = '';
    this.doctor = JSON.parse(localStorage.getItem("currentUser")).doctorId;
    this.getAll();
  }
  getOne(item) {
    this.pre = item;
  }
  save() {
    this.pre.doctorId = this.doctor
    this.pre.patientId = this.id;
    this.pre.officeId = 4;
    
    if (this.pre.id) {
      this.recetaService.put(this.pre.id, this.pre).subscribe(res => {
        this.pre = {}
        this.getAll()
      }, error => {

      })
    }
    else { 
      this.recetaService.post(this.pre).subscribe(res => {
        this.pre = {}
         this.getAll()
      }, error => {
  
      }
      )
    }

  }
  getAll( ) {
    this.recetaService.getByPatient(this.id, this.doctor, this.page).subscribe(response => {

      this.list = response.data;
      this.dataPage=response
    })
  }
  changePage(next:boolean){
    this.page=next?this.page +=1:this.page -=1;
   this.getAll()
  }
  close() { this.activeModal.close() }
}
