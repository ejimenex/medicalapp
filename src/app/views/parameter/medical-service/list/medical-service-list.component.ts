import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router'
import { AlertService } from '../../../../service/alert-sweet.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { config } from '../../../../constant/param';
import { MedicalServiceService } from '../../../../service/medicalService.service';

import { MedicalService } from '../../../../model/medicalService';

interface ITableColumn {
    header: string;
    value?: string;
}

@Component({
    templateUrl: './medical-service-list.component.html'
})
export class MedicalServiceListComponent implements OnInit {

    medicalService: MedicalService[];
    filters: ITableColumn[];
    count=0;
    filter: any = {};
    page: number = 0;
    constructor(private translate: TranslateService, private router: Router,
        private alert: AlertService, private _modalService: NgbModal,
        private medicalServiceService: MedicalServiceService) {


    }
    ngOnInit() {
        this.filter.specifiedField = JSON.parse(localStorage.getItem("currentUser")).doctorGuid;
        this.getAll();
        this.filters = [
            { header: this.translate.instant('name'), value: 'name' }

        ];
    }
    confirmDelete(id) {debugger
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
        this.medicalServiceService.getBySpecifiedParam(true, this.filter, this.page, 'DoctorGuid').subscribe(response => {
            this.medicalService = response['value'];
            this.count=response['@odata.count']
        })
    }
    getFiltered() {
        this.medicalServiceService.getBySpecifiedParam(false, this.filter, this.page, 'DoctorGuid').subscribe(response => {
            this.medicalService = response['value'];
            this.count=response['@odata.count']
        })
    }
    changePage(next: boolean) {
        this.filter.value = !this.filter.value ? '' : !this.filter.value;

        if (!this.filter.field) this.filter.field = 'name';
        this.page = next ? this.page += 10 : this.page -= 10;
        if (this.page < 0) this.page = 0;

        this.medicalServiceService.getBySpecifiedParam(false, this.filter, this.page, 'DoctorGuid').subscribe(response => {
            this.medicalService = response['value'];
            this.count=response['@odata.count']
        })
    }

}
