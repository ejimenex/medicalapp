import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { AlertService } from '../../../../service/alert-sweet.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Country } from '../../../../model/country';
import { CountryService } from '../../../../service/country.service';
import { TranslateService } from '@ngx-translate/core';


@Component({
    selector: 'edit-country-app',
    templateUrl: './edit-country.component.html'
})
export class EditCountryComponent implements OnInit {
    @Output() notifyParent: EventEmitter<any> = new EventEmitter();
    id: number;
    country: Country = new Country();

    constructor(private alertService: AlertService, public activeModal: NgbActiveModal, private countryService: CountryService, private translate: TranslateService) { }

    ngOnInit() {
            this.getOne(this.id);
    }

    getOne(id: number) {
        this.countryService.getById(this.id).subscribe(response => {
            this.country = response;
        })
    }

    edit() {
     
        if (!this.country.code || !this.country.name)
        return this.alertService.error(this.translate.instant("vreqFiled"), 'Error')
        this.countryService.put(this.id, this.country).subscribe(response => {
            this.alertService.success(this.translate.instant('sucessEdition'));
            this.notifyParent.emit();
            this.close();
        }, error => {

        })
    }
    close() { this.activeModal.close() }
}
