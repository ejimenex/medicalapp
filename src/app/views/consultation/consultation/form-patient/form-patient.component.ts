import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router'
import { PatientFormService } from '../../../../service/patientForm.service'

import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PatientForm } from '../../../../model/medicalForm';
import { AlertService } from '../../../../service/alert-sweet.service';


@Component({
    templateUrl: './form-patient.component.html'
})
export class QuestionComponent implements OnInit {

    patientId = 0;
    filter: any = {};
    data: PatientForm[] = []
    constructor(private translate: TranslateService, private router: Router, private _modalService: NgbModal,
        public activeModal: NgbActiveModal, private alert:AlertService,
        private patientFormService: PatientFormService) {


    }
    ngOnInit() {
        this.filter.specifiedField = JSON.parse(localStorage.getItem("currentUser")).doctorGuid;
        this.getAll();

    }
    close() { this.activeModal.close() }
    getAll() {
        this.patientFormService.getByPatient(this.filter.specifiedField,this.patientId).subscribe(response => {
           this.data=response;

        })
    }
    update(){
        this.data.forEach(res=>{
            
            this.patientFormService.put(res.id,res).subscribe(res=>{
                this.alert.success('');
            },error=>{
                this.alert.error('');
            })
        })
    }

}
