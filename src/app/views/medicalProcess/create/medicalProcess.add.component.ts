import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { AlertService } from "../../../service/alert-sweet.service";
import { Router } from "@angular/router";
import {MedicalProcessService

} from "../../../service/medicalProcess.service";
import { DoctorOfficeService } from "../../../service/doctorOffice.service";
import { PatientService } from "../../../service/patient.service";

import {
  debounceTime,
  map,
  distinctUntilChanged,
  catchError,
  switchMap,
} from "rxjs/operators";
import { Observable, of } from "rxjs";
import { invoice } from "../../../model/invoice";
import { MedicalProcessModel } from '../../../model/medicalProcess';
import { MedicalServiceService } from '../../../service/medicalService.service';
import { ViewPatientComponent } from '../../patient/view/view.patient.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { config } from '../../../constant/param';

@Component({
  templateUrl: "./medicalProcess.add.component.html",
})
export class MedicalProcessAddComponent implements OnInit {
  process: MedicalProcessModel = new MedicalProcessModel();
  filter: any = {};
  selectedPatient :any= {};
  offices = [];
  patient = [];
  services = [];
  constructor(
    private translate: TranslateService,
    private router: Router,
    private alertService: AlertService,
    private apiService: MedicalProcessService,
    private officeService: DoctorOfficeService,
    private patientService: PatientService,    
    private _modalService: NgbModal,
    private medicalService:MedicalServiceService
  ) {}

  ngOnInit() {
    this.process.doctorId = JSON.parse(
      localStorage.getItem("currentUser")
    ).doctorId;
    let doctorId = JSON.parse(localStorage.getItem("currentUser")).doctorId;
    this.getPatients(doctorId);
    this.getOffices(doctorId);
    this.getService();
  }
  
  async getPatients(id) {
    this.patient = (await this.patientService
      .getByDoctor(id)
      .toPromise()) as any;
  }
  async getService() {
    let guid= JSON.parse(localStorage.getItem("currentUser")).doctorGuid
    this.services = (await this.medicalService
      .getByDoctor(guid)
      .toPromise()) as any;
  }
  selectOnePatient(data: any) {
    if (data.hasOwnProperty('item')) {
      data = data.item
      console.log(data)
      this.selectedPatient=data;
    }}
  formatterPatient = (result: any) => result.name;
  searchPatient = (text$: Observable<any[]>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term) =>
        this.patientService.getByDoctorAndName(
          this.process.doctorId,
          term,
         
        )
      ),
      map((x) => {
        return x;
      }),
      catchError(() => {
        return of([]);
      })
    );
  applyFilter(term: any) {
    this.filter.value = term;
    return this.filter;
  }
  async getOffices(id) {
    this.offices = (await this.officeService
      .getByDoctor(id)
      .toPromise()) as any;
  }
  validateRequidesFileds() {
    let result = !this.selectedPatient || !this.process.serviceId;
    return result;
  }
  openMedicalFormList(): void {
    if(!this.selectedPatient.id)
    return this.alertService.error( this.translate.instant("selPatient"),
    "Error");
    let modal = this._modalService.open(
      ViewPatientComponent,
      config.modalConfig
    );
    modal.componentInstance.id =this.selectedPatient.id;
  }
  save() {
    if (this.validateRequidesFileds())
      return this.alertService.error(
        this.translate.instant("vreqFiled"),
        "Error"
      );
this.process.patientId=this.selectedPatient.id;
    this.apiService.post(this.process).subscribe(
      (response) => {
        this.router.navigate(["/medical-process/"]);
        this.alertService.success(this.translate.instant("sucessRegister"));
      },
      (error) => {
        this.alertService.error(this.translate.instant(error.error));
      }
    );
  }
}
