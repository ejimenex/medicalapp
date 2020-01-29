import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { AlertService } from '../../../service/alert-sweet.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PatientModel } from '../../../model/patient.model';
import { ArsService } from '../../../service/ars.service';
import { PatientService } from '../../../service/patient.service';
import { TranslateService } from '@ngx-translate/core';



@Component({
    selector: 'edit-patient-app',
    templateUrl: './patient-edit.component.html'
})
export class EditPatientComponent implements OnInit {
    @Output() notifyParent: EventEmitter<any> = new EventEmitter();
    id: number;
    patient: PatientModel = new PatientModel();
    arss = [];
    sexList = [];

    constructor(
        private alertService: AlertService,
        public activeModal: NgbActiveModal,
        private arsService: ArsService,
        private patientService: PatientService,
        private translate: TranslateService) { }

    ngOnInit() {

        this.getOne(this.id);
        this.getArs();
        this.sexList = [
            { header: this.translate.instant('male'), value: 'M' },
            { header: this.translate.instant('female'), value: 'F' }
        ];

    }

    getOne(id: number) {
        this.patientService.getById(this.id).subscribe(response => {
            this.patient = response;
        })
    }

    async getArs() {
        this.arss = await this.arsService.getByCountry(JSON.parse(localStorage.getItem("currentUser")).countryId).toPromise() as any
    }
    edit() {

        if (!this.patient.name || !this.patient.phone)
            return this.alertService.error(this.translate.instant("vreqFiled"), 'Error')
        this.patientService.put(this.id, this.patient).subscribe(response => {
            this.alertService.success(this.translate.instant('sucessEdition'));
            this.notifyParent.emit();
            this.close();
        }, error => {

        })
    }
    close() { this.activeModal.close() }
}
