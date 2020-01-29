import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router'
import { PatientService } from '../../../../../service/patient.service'

import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';



interface ITableColumn {
    header: string;
    value?: string;
}

@Component({
    templateUrl: './patient.component.html'
})
export class PatientComponent implements OnInit {

    patients = [];
    filters: ITableColumn[];
    filter: any = {};
    page: number = 0;
    constructor(private translate: TranslateService, private router: Router, private _modalService: NgbModal,
        public activeModal: NgbActiveModal,
        private patientService: PatientService) {


    }
    ngOnInit() {
        this.filter.specifiedField = JSON.parse(localStorage.getItem("currentUser")).doctorId;
        //this.filter.orderBy='id'
        this.getAll();
        this.filters = [
            { header: this.translate.instant('name'), value: 'name' },
            { header: this.translate.instant('phone1'), value: 'phone' }
        ];

    }



    newConsultaton(id) {
        this.router.navigate(['consultation/add/' + id])
        this.close();
    }
    close() { this.activeModal.close() }
    getAll() {
        this.patientService.getBySpecifiedParam(true, this.filter, this.page, 'DoctorId').subscribe(response => {

            this.patients = response;
        })
    }
    getFiltered() {
        this.patientService.getBySpecifiedParam(false, this.filter, this.page, 'DoctorId').subscribe(response => {

            this.patients = response;
        })
    }
    changePage(next: boolean) {
        this.filter.value = !this.filter.value ? '' : !this.filter.value;

        if (!this.filter.field) this.filter.field = 'name';
        this.page = next ? this.page += 10 : this.page -= 10;
        if (this.page < 0) this.page = 0;

        this.patientService.getBySpecifiedParam(false, this.filter, this.page, 'DoctorId').subscribe(response => {
            this.patients = response;
        })
    }

}
