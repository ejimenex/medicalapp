import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AlertToast } from '../../../../service/alert-toast.service';
import { AlertService } from '../../../../service/alert-sweet.service';
import { Country } from '../../../../model/country';
import { Router } from '@angular/router';

import { CountryService } from '../../../../service/country.service';


@Component({
    templateUrl: './country-create.component.html'
})
export class CountryAddComponent {

    country: Country = new Country();
    constructor(private translate: TranslateService, private alert: AlertToast, private router: Router, private alertService: AlertService, private countryService: CountryService) {
    }
    save() {
        if (!this.country.code || !this.country.name)
            return this.alertService.error(this.translate.instant("vreqFiled"), 'Error')
        this.countryService.post(this.country).subscribe(response => {

            this.router.navigate(['parameter/country'])
            this.alertService.success(this.translate.instant("sucessRegister"))
        }, error => {
            console.log(this.translate.instant(error.error))
            this.alertService.znError(this.translate.instant(error.error))
        })

    }

}
