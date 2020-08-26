// Angular
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

// Components Routing

import { CountryService } from "../../service/country.service";
import { LanguageService } from "../../service/language.service";
import { UserService } from "../../service/users.service";

import { RoleService } from "../../service/role.service";

import { ReasonConsultationService } from "../../service/reason-consultation.service";

import { PatientService } from "../../service/patient.service";

import { ConsultationService } from "../../service/consultation.service";

import { AppointmentService } from "../../service/appointment.service";
import { ConsultationListComponent } from "./consultation/list/list-consultation.component";
import { ConsultationAddComponent } from "./consultation/create/consultation-create.component";
import { ConsultationRoutingModule } from "./consultation.route";
import { DoctorOfficeService } from "../../service/doctorOffice.service";
import { PatientComponent } from "./consultation/list/new/patient.component";
import { ConsultationEditComponent } from "./consultation/edit/edit-consultation.component";
import { ListPrescripcionComponent } from "../prescription/list/list-prescription.component";
import { PrescriptionService } from "../../service/prescription.service";
import { QuestionComponent } from "./consultation/form-patient/form-patient.component";
import { MedicalFormService } from "../../service/medical-form.service";
import { PatientFormService } from "../../service/patientForm.service";
import { ArsService } from '../../service/ars.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    ConsultationRoutingModule,
    TranslateModule,
  ],
  declarations: [
    ConsultationAddComponent,
    ConsultationListComponent,
    ConsultationEditComponent,
    PatientComponent,
    ListPrescripcionComponent,
    QuestionComponent,
  ],
  entryComponents: [
    PatientComponent,
    ListPrescripcionComponent,
    QuestionComponent,
  ],
  providers: [
    UserService,
    LanguageService,
    MedicalFormService,
    PatientFormService,
    DoctorOfficeService,
    RoleService,
    ArsService,
    ReasonConsultationService,
    ConsultationService,
    PatientService,
    AppointmentService,
    PrescriptionService,
  ],
})
export class ConsultationModule {}
