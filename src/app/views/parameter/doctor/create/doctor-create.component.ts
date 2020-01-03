import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from '../../../../service/alert-sweet.service';
import { DoctorModel } from '../../../../model/doctor';
import { Router } from '@angular/router';
import { MedicalSpecilityService } from '../../../../service/medicalSpeciality.service';
import { DoctorService } from '../../../../service/doctor.service';


@Component({
    templateUrl: './doctor-create.component.html'
})
export class DoctorAddComponent implements OnInit {

    doctor: DoctorModel = new DoctorModel();
    sexList=[];
    treament=[];

    constructor(private translate: TranslateService,
        private router: Router,
        private alertService: AlertService,
        private medicalSpecialitityService: MedicalSpecilityService,
        private doctorService: DoctorService) {
    }

    ngOnInit(){
        this.getData();
    }
    getData(){
        this.sexList = [
            { header: this.translate.instant('male'), value: 'M' },
            { header: this.translate.instant('female'), value: 'F' }          
          ];

          this.treament = [
            { header: 'Dr.', value: 'Dr.' },
            { header: 'Dra.', value: 'Dra.' }          
          ];
    }
    save() {
        if (!this.doctor.name || !this.doctor.surName)
            return this.alertService.error(this.translate.instant("vreqFiled"), 'Error')
        this.doctorService.post(this.doctor).subscribe(response => {
            this.router.navigate(['parameter/country'])
            this.alertService.success(this.translate.instant("sucessRegister"))
        }, error => {
            this.alertService.error(this.translate.instant(error.error))
        })

    }

}
