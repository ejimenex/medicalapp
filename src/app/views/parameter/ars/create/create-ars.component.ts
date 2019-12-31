import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AlertToast } from '../../../../service/alert-toast.service';
import { AlertService } from '../../../../service/alert-sweet.service';
import { ArsModel } from '../../../../model/ars';
import { Router } from '@angular/router';
import { ArsService } from '../../../../service/ars.service';
import { CountryService } from '../../../../service/country.service';


@Component({
    templateUrl: './create-ars.component.html'
})
export class ArsAddComponent implements OnInit {

    ars: ArsModel = new ArsModel();
    country = [];
    role = [];
    constructor(private translate: TranslateService, private alert: AlertToast,
        private router: Router, private alertService: AlertService,
        private countryService: CountryService,
        private arsService: ArsService) {

    }
    ngOnInit() {
        this.getCountry();
    }

    async getCountry() {
        this.country = await this.countryService.get().toPromise();
    }

    save() {
        if (!this.ars.name || !this.ars.countryId)
            return this.alertService.error(this.translate.instant("vreqFiled"), 'Error')
        this.arsService.post(this.ars).subscribe(response => {

            this.router.navigate(['parameter/ars'])
            this.alertService.success(this.translate.instant("sucessRegister"))
        }, error => {
            this.alertService.error(this.translate.instant(error.error))
        })

    }

}
