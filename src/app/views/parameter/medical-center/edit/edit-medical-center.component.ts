import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { AlertService } from '../../../../service/alert-sweet.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MedicalCenter } from '../../../../model/medicalCenter';
import { MedicalCenterService } from '../../../../service/medical-center.service';
import { CountryService } from '../../../../service/country.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'edit-medical-center-app',
    templateUrl: './edit-medical-center.component.html'
})
export class EditMedicalCenterComponent implements OnInit {
    @Output() notifyParent: EventEmitter<any> = new EventEmitter();
    id: number;
    center: MedicalCenter = new MedicalCenter();

    country = [];

    constructor(
        private alertService: AlertService,
        public activeModal: NgbActiveModal,
        private medicalCenterService: MedicalCenterService,
        private countryService:CountryService,
        private translate: TranslateService)
 { }

    ngOnInit() {
        
        this.getOne(this.id);
        this.getCountry();

    }

    getOne(id: number) {
        this.medicalCenterService.getById(this.id).subscribe(response => {
            this.center = response;
        })
    }

    async getCountry() {
        this.country = await this.countryService.get().toPromise();
    }
    edit() {

        if (!this.center.name || !this.center.countryId )
            return this.alertService.error(this.translate.instant("vreqFiled"), 'Error')
        this.medicalCenterService.put(this.id, this.center).subscribe(response => {
            this.alertService.success(this.translate.instant('sucessEdition'));
            this.notifyParent.emit();
            this.close();
        }, error => {

        })
    }
    close() { this.activeModal.close() }
}
