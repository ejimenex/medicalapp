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
import { ActivatedRoute } from "@angular/router";
import { PatientForm } from '../../../model/medicalForm';
import { PatientFormService } from '../../../service/patientForm.service';

@Component({
  selector: "view-patient-app",
  templateUrl: "./view.patient.component.html",
})
export class ViewPatientComponent implements OnInit {
  id: number;
  patient: PatientModel = new PatientModel();
  arss = [];
  sexList = [];
  questions: PatientForm[] = []
  constructor(
    private alertService: AlertService,
    private route: ActivatedRoute,
    private arsService: ArsService,
    private patientService: PatientService,
    private translate: TranslateService,
    private patientFormService: PatientFormService,
    public activeModal: NgbActiveModal
  ) {}
  getQuestions() {
    this.patientFormService
      .getByPatient(JSON.parse(
        localStorage.getItem("currentUser")
      ).doctorGuid, this.id)
      .subscribe((response) => {
                  this.questions = response;
      });
  }
  ngOnInit() {
    this.getOne();
    this.getArs();
    this.getQuestions()
    this.sexList = [
      { header: this.translate.instant("male"), value: "M" },
      { header: this.translate.instant("female"), value: "F" },
    ];
  }
  close() {
    this.activeModal.close();
  }
  getOne() {
    this.patientService.getById(this.id).subscribe((response) => {
      this.patient = response;
    });
  }

  async getArs() {
    this.arss = (await this.arsService
      .getByCountry(JSON.parse(localStorage.getItem("currentUser")).countryId)
      .toPromise()) as any;
  }
}
