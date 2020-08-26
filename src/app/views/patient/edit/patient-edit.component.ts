import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
} from "@angular/core";
import { AlertService } from "../../../service/alert-sweet.service";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { PatientModel } from "../../../model/patient.model";
import { ArsService } from "../../../service/ars.service";
import { PatientService } from "../../../service/patient.service";
import { TranslateService } from "@ngx-translate/core";
import { ActivatedRoute, Router } from "@angular/router";
import { PatientFormService } from '../../../service/patientForm.service';
import { PatientForm } from '../../../model/medicalForm';

@Component({
  selector: "edit-patient-app",
  templateUrl: "./patient-edit.component.html",
})
export class EditPatientComponent implements OnInit {
  id: number;
  patient: PatientModel = new PatientModel();
  arss = [];
  questions: PatientForm[] = []
  sexList = [];

  constructor(
    private alertService: AlertService,
    private arsService: ArsService,
    private route: ActivatedRoute,
    private router: Router,
    private patientService: PatientService,
    private patientFormService: PatientFormService,
    private translate: TranslateService
  ) {
    this.id = parseInt(this.route.snapshot.paramMap.get("id"));
  }

  ngOnInit() {
    this.getOne(this.id);
    this.getQuestions()
    this.getArs();
    this.sexList = [

      { header: this.translate.instant("male"), value: "M" },
      { header: this.translate.instant("female"), value: "F" },
    ];
  }
  updateQuestion() {
    this.questions.forEach((res) => {
      this.patientFormService.put(res.id, res).subscribe(
        (res) => {},
        (error) => {
          this.alertService.errorSWA("");
        }
      );
    });
  }
  getOne(id: number) {
    this.patientService.getById(this.id).subscribe((response) => {
      this.patient = response;
    });
  }

  async getArs() {
    this.arss = (await this.arsService
      .getByCountry(JSON.parse(localStorage.getItem("currentUser")).countryId)
      .toPromise()) as any;
  }
  getQuestions() {
    this.patientFormService
      .getByPatient(
        JSON.parse(localStorage.getItem("currentUser")).doctorGuid,
        this.id
      )
      .subscribe((response) => {
        this.questions = response;
      });
  }
  edit() {
    if (!this.patient.name || !this.patient.phone)
      return this.alertService.error(
        this.translate.instant("vreqFiled"),
        "Error"
      );
    this.patientService.put(this.id, this.patient).subscribe(
      (response) => {
        this.alertService.success(this.translate.instant("sucessEdition"));
        this.updateQuestion()
        this.router.navigate(["/patient"]);
      },
      (error) => {}
    );
  }
}
