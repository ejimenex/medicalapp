import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { AlertService } from '../../../../service/alert-sweet.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ArsModel } from '../../../../model/ars';
import { ArsService } from '../../../../service/ars.service';
import { CountryService } from '../../../../service/country.service';
import { TranslateService } from '@ngx-translate/core';



@Component({
    selector: 'edit-ars-app',
    templateUrl: './edit-ars.component.html'
})
export class EditArsComponent implements OnInit {
    @Output() notifyParent: EventEmitter<any> = new EventEmitter();
    id: number;
    ars: ArsModel = new ArsModel();

    country = [];

    constructor(
        private alertService: AlertService,
        public activeModal: NgbActiveModal,
        private arsService: ArsService,
        private countryService:CountryService,
        private translate: TranslateService)
 { }

    ngOnInit() {
        
        this.getOne(this.id);
        this.getCountry();

    }

    getOne(id: number) {
        this.arsService.getById(this.id).subscribe(response => {
            this.ars = response;
        })
    }

    async getCountry() {
        this.country = await this.countryService.get().toPromise();
    }
    edit() {

        if (!this.ars.name || !this.ars.countryId )
            return this.alertService.error(this.translate.instant("vreqFiled"), 'Error')
        this.arsService.put(this.id, this.ars).subscribe(response => {
            this.alertService.success(this.translate.instant('sucessEdition'));
            this.notifyParent.emit();
            this.close();
        }, error => {

        })
    }
    close() { this.activeModal.close() }
}
