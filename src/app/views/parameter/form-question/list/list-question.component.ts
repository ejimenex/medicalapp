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
    count = 0;
    filterOne="";
    dataPage: any = {};
    doctorId = ""
    page: number = 1;
    constructor(private translate: TranslateService, private router: Router,
        private alert: AlertService, private _modalService: NgbModal,
        private medicalFormService: MedicalFormService) {


    }
    ngOnInit() {
        this.doctorId = JSON.parse(localStorage.getItem("currentUser")).doctorGuid;
        this.getAll();
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

        this.medicalFormService.getByDoctor(this.doctorId,this.page,this.filterOne).subscribe(response => {
            this.questions = response.data;
            this.dataPage = response
        })
    }
    changePage(next: boolean) {
        this.page = next ? this.page += 1 : this.page -= 1;
        if (this.page < 0) this.page = 0;
        this.getAll()
    }

}
