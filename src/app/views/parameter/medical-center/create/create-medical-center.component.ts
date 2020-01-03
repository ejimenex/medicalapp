import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AlertToast } from '../../../../service/alert-toast.service';
import { AlertService } from '../../../../service/alert-sweet.service';
import { MedicalCenter } from '../../../../model/medicalCenter';
import { Router } from '@angular/router';
import { MedicalCenterService } from '../../../../service/medical-center.service'
import { CountryService } from '../../../../service/country.service';


@Component({
    templateUrl: './create-medical-center.component.html'
})
export class MedicalCenterAddComponent implements OnInit {

    center: MedicalCenter = new MedicalCenter();
    country = [];
    role = [];
    constructor(private translate: TranslateService, private alert: AlertToast,
        private router: Router, private alertService: AlertService,
        private countryService: CountryService,
        private medicalCenterService: MedicalCenterService) {

    }
    ngOnInit() {
        this.getCountry();
    }

    async getCountry() {
        this.country = await this.countryService.get().toPromise();
    }

    save() {
        if (!this.center.name || !this.center.countryId)
            return this.alertService.error(this.translate.instant("vreqFiled"), 'Error')
        this.medicalCenterService.post(this.center).subscribe(response => {

            this.router.navigate(['parameter/medicalcenter'])
            this.alertService.success(this.translate.instant("sucessRegister"))
        }, error => {
            this.alertService.error(this.translate.instant(error.error))
        })

    }

}
