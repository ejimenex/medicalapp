import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from '../../../service/alert-sweet.service';
import { DoctorOffice } from '../../../model/doctorOffice';
import { Router } from '@angular/router';
import { DoctorOfficeService } from '../../../service/doctorOffice.service';
import { MedicalCenterService } from '../../../service/medical-center.service';

import { debounceTime, map, distinctUntilChanged, catchError, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';



@Component({
  templateUrl: './doctor-office-create.component.html'
})
export class DoctorOfficeAddComponent implements OnInit {

  office: DoctorOffice = new DoctorOffice();
  filter:any={};
  selectedMedicalCenter={};

  medicalCenters = [];


  constructor(private translate: TranslateService,
    private router: Router,
    private alertService: AlertService,

    private officeService: DoctorOfficeService,
    private medicalCenterService: MedicalCenterService
  ) {
  }

  ngOnInit() {
    this.filter.specifiedField = JSON.parse(localStorage.getItem("currentUser")).countryId
    this.filter.field = 'name';
    this.filter.value = '';
    this.office.doctorId = JSON.parse(localStorage.getItem("currentUser")).doctorId;
    this.getData();

  }
  selectOneMedicalCenter(data: any) {
    if (data.hasOwnProperty('item')) {
      data = data.item
    }

    this.office.medicalCenterId = data.id
  }
  applyFilter(term: any) {
    this.filter.value=term
    return this.filter
   }
formatterMedicalCenter = (result: any) => result.name
searchMedicalCenter = (text$: Observable<any[]>) =>
    text$.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(term =>

            this.medicalCenterService.getBySpecifiedParam(false, this.applyFilter(term), 0, 'countryId')
        ),
        map(x => {
            return x
        }),
        catchError(() => {
            return of([])
        })
    )



  getData() {


  }
  validateRequidesFileds() {
    let result = (!this.office.name || !this.office.medicalCenterId)

    return result;
  }

  save() {
    if (this.validateRequidesFileds())
      return this.alertService.error(this.translate.instant("vreqFiled"), 'Error')
    this.officeService.post(this.office).subscribe(response => {
      this.router.navigate(['/office'])
      this.alertService.success(this.translate.instant("sucessRegister"))
    }, error => {
      this.alertService.error(this.translate.instant(error.error))
    })

  }

}
