import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router'
import { AlertService } from '../../../../service/alert-sweet.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { config } from '../../../../constant/param';
import { MedicalFormService } from '../../../../service/medical-form.service';

import { MedicalForm } from '../../../../model/medicalForm';

interface ITableColumn {
    header: string;
    value?: string;
}

@Component({
    templateUrl: './list-question.component.html'
})
export class MedicalFormListComponent implements OnInit {

    questions: MedicalForm[];
    filters: ITableColumn[];
    count=0;
    filter: any = {};
    page: number = 0;
    constructor(private translate: TranslateService, private router: Router,
        private alert: AlertService, private _modalService: NgbModal,
        private medicalFormService: MedicalFormService) {


    }
    ngOnInit() {
        this.filter.specifiedField = JSON.parse(localStorage.getItem("currentUser")).doctorGuid;
        this.getAll();
        this.filters = [
            { header: this.translate.instant('question'), value: 'question' }

        ];
    }
    confirmDelete(id) {
        this.alert.question(() => { this.delete(id) }, this.translate.instant('confirm'), this.translate.instant('sureTextRemove'))
    }
    delete(id) {
        this.medicalFormService.delete(id).subscribe(response => {
            this.alert.success(this.translate.instant('sucessDelete'));
            this.getAll();
        }, error => {
            this.alert.success(this.translate.instant(''));
        })
    }

    newQuestion(id) {
       this.router.navigate(['parameter/medical-question/add/' + id])
    }
    getAll() {
        
        this.medicalFormService.getBySpecifiedParam(true, this.filter, this.page, 'DoctorGuid').subscribe(response => {
            this.questions = response['value'];
            this.count=response['@odata.count']
        })
    }
    getFiltered() {
        this.medicalFormService.getBySpecifiedParam(false, this.filter, this.page, 'DoctorGuid').subscribe(response => {
            this.questions = response['value'];
            this.count=response['@odata.count']
        })
    }
    changePage(next: boolean) {
        this.filter.value = !this.filter.value ? '' : !this.filter.value;

        if (!this.filter.field) this.filter.field = 'name';
        this.page = next ? this.page += 10 : this.page -= 10;
        if (this.page < 0) this.page = 0;

        this.medicalFormService.getBySpecifiedParam(false, this.filter, this.page, 'DoctorGuid').subscribe(response => {
            this.questions = response['value'];
            this.count=response['@odata.count']
        })
    }

}
