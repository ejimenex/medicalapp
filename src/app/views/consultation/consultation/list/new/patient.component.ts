import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router'
import { PatientService } from '../../../../../service/patient.service'

import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
    templateUrl: './patient.component.html'
})
export class PatientComponent implements OnInit {

    patients = [];
    filterOne = '';
    doctorI = null
    dataPage:any={}
    page: number = 0;
    constructor(private translate: TranslateService, private router: Router, private _modalService: NgbModal,
        public activeModal: NgbActiveModal,
        private patientService: PatientService) {

    }
    ngOnInit() {
        this.doctorI = JSON.parse(localStorage.getItem("currentUser")).doctorId;
        //this.filter.orderBy='id'
        this.getAll();
    }

    newConsultaton(id) {
        this.router.navigate(['consultation/add/' + id])
        this.close();
    }
    close() { this.activeModal.close() }
    getAll() {
        this.patientService.getFiltered( this.doctorI, this.page,this.filterOne).subscribe(response => {

            this.patients = response.data;
            this.dataPage=response
        })
    }

    changePage(next: boolean) {
        this.page = next ? this.page += 1 : this.page -= 1;
        if (this.page < 0) this.page = 0;
        this.getAll()
    }

}
