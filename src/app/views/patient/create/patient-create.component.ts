import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from '../../../service/alert-sweet.service';
import { PatientModel } from '../../../model/patient.model';
import { Router } from '@angular/router';
import { PatientService } from '../../../service/patient.service';
import { ArsService } from '../../../service/ars.service';

import { debounceTime, map } from 'rxjs/operators';
import { Observable } from 'rxjs';



@Component({
  templateUrl: './patient-create.component.html'
})
export class PatientAddComponent implements OnInit {

  patient: PatientModel = new PatientModel();
  sexList=[];
  arss = [];


  constructor(private translate: TranslateService,
    private router: Router,
    private alertService: AlertService,
  
    private patientService: PatientService,
    private arsService: ArsService
    ) {
  }

  ngOnInit() {
    this.arss=[];
    this.patient.doctorId=JSON.parse(localStorage.getItem("currentUser")).doctorId;
    this.getData();
    this.sexList = [
      { header: this.translate.instant('male'), value: 'M' },
      { header: this.translate.instant('female'), value: 'F' }
    ];
  }
  

  getData() {
    
    this.arsService.getByCountry(JSON.parse(localStorage.getItem("currentUser")).countryId).subscribe(response => {
         this.arss = response as any;

    })
  }
  validateRequidesFileds() {
    let result = (!this.patient.name || !this.patient.phone)

      return result;
  }

  save() {
    if (this.validateRequidesFileds())
      return this.alertService.error(this.translate.instant("vreqFiled"), 'Error')
    this.patientService.post(this.patient).subscribe(response => {
      this.router.navigate(['/patient'])
      this.alertService.success(this.translate.instant("sucessRegister"))
    }, error => {
      this.alertService.error(this.translate.instant(error.error))
    })

  }

}
