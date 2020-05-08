import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router'
import { AlertService } from '../../../../service/alert-sweet.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { config } from '../../../../constant/param';
import { MedicalServiceService } from '../../../../service/medicalService.service';

import { MedicalService } from '../../../../model/medicalService';



@Component({
    templateUrl: './medical-service-list.component.html'
})
export class MedicalServiceListComponent implements OnInit {

    medicalService: MedicalService[];
    filterOne = "";
    dataPage: any = {}
    doctorId = "";
    page: number = 1;
    constructor(private translate: TranslateService, private router: Router,
        private alert: AlertService, private _modalService: NgbModal,
        private medicalServiceService: MedicalServiceService) {


    }
    ngOnInit() {
        this.doctorId = JSON.parse(localStorage.getItem("currentUser")).doctorGuid;
        this.getAll();

    }
    confirmDelete(id) {
        this.alert.question(() => { this.delete(id) }, this.translate.instant('confirm'), this.translate.instant('sureTextRemove'))
    }
    delete(id) {
        this.medicalServiceService.delete(id).subscribe(response => {
            this.alert.success(this.translate.instant('sucessDelete'));
            this.getAll();
        }, error => {
            this.alert.success(this.translate.instant(''));
        })
    }

    newService(id) {
        this.router.navigate(['parameter/medical-service/add/' + id])
    }
    getAll() {
        this.medicalServiceService.getFiltered(this.filterOne, this.page, this.doctorId).subscribe(response => {
            this.medicalService = response.data;
            this.dataPage = response
        })
    }
    changePage(next: boolean) {
        this.page = next ? this.page += 1 : this.page -= 1;
        if (this.page < 0) this.page = 0;

        this.getAll();
    }

}
