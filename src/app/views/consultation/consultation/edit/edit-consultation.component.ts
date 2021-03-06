import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { AlertService } from "../../../../service/alert-sweet.service";
import { PatientModel } from "../../../../model/patient.model";
import { Router, ActivatedRoute } from "@angular/router";
import { PatientService } from "../../../../service/patient.service";
import { DoctorOfficeService } from "../../../../service/doctorOffice.service";

import * as moment from "moment";
import { debounceTime, map } from "rxjs/operators";
import { Observable } from "rxjs";
import { ReasonConsultationService } from "../../../../service/reason-consultation.service";
import { ConsultationService } from "../../../../service/consultation.service";
import { ConsultationModel } from "../../../../model/consultation.model";
import { QuestionComponent } from "../form-patient/form-patient.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { config } from "../../../../constant/param";
import { FileComponent } from "../../../files/create/file.create.component";
import { ViewPatientComponent } from '../../../patient/view/view.patient.component';

@Component({
  templateUrl: "./edit-consultation.component.html",
})
export class ConsultationEditComponent implements OnInit {
  cons: ConsultationModel = new ConsultationModel();
  patient: PatientModel = new PatientModel();
  reasonList = [];
  offices = [];
  id: number = 0;

  constructor(
    private translate: TranslateService,
    private router: Router,
    private alertService: AlertService,
    private reasonConsultationService: ReasonConsultationService,
    private consultationService: ConsultationService,
    private doctorOfficeService: DoctorOfficeService,
    private route: ActivatedRoute,
    private patientService: PatientService,
    private _modalService: NgbModal
  ) {}

  ngOnInit() {
    this.id = parseInt(this.route.snapshot.paramMap.get("id"));
    this.cons.doctorId = JSON.parse(
      localStorage.getItem("currentUser")
    ).doctorId;
    this.cons.doctorGuid = JSON.parse(
      localStorage.getItem("currentUser")
    ).doctorGuid;
    this.getReasons();
    this.getData();
  }
  // openMedicalFormList(): void {
  //   let modal = this._modalService.open(QuestionComponent, config.modalConfig);
  //   modal.componentInstance.patientId = this.cons.patientId;
  // }
  openFile(): void {
    let modal = this._modalService.open(FileComponent, config.modalConfig);
    modal.componentInstance.consultationId = this.cons.id;
    modal.componentInstance.patient = this.patient.patientGuid;
  }
  openMedicalFormList(): void {
    let modal = this._modalService.open(
      ViewPatientComponent,
      config.modalConfig
    );
    modal.componentInstance.id =this.cons.patientId;
  }
  async getData() {
    this.cons = await this.consultationService.getById(this.id).toPromise();
    this.patient = await this.patientService
      .getById(this.cons.patientId)
      .toPromise();
    this.patient.bornDate = moment(this.patient.bornDate).format(
      "YYYY-MM-DD"
    ) as any;
    this.cons.nextDateVisit = moment(this.cons.nextDateVisit).format(
      "YYYY-MM-DD"
    ) as any;
  }
  async getReasons() {
    this.reasonList = await this.reasonConsultationService.get().toPromise();
    this.offices = (await this.doctorOfficeService
      .getByDoctor(this.cons.doctorId)
      .toPromise()) as [];
  }

  confirm() {
    this.alertService.question(
      () => {
        this.save();
      },
      this.translate.instant("confirm"),
      this.translate.instant("sureTextEdit")
    );
  }
  save() {
    this.consultationService.put(this.id, this.cons).subscribe(
      (response) => {
        this.router.navigate(["/consultation"]);
        this.alertService.success(this.translate.instant("sucessRegister"));
      },
      (error) => {
        this.alertService.error(this.translate.instant(error.error));
      }
    );
  }
}
