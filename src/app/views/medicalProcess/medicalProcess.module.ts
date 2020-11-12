// Angular
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

// Components Routing
import { MedicalServiceService } from "../../service/medicalService.service";
import {
  InvoiceService,
  DescountReasonService,
  InvoiceDetailService,
  CurrencyService,
} from "../../service/invoice.service";
import { MedicalProcessListComponent } from "./list/medical-process-list.component";
import { MedicalProcessAddComponent } from "./create/medicalProcess.add.component";
import { MedicalProcessRoutingModule } from "./medicalProcess.routing";
import { DoctorOfficeService } from "../../service/doctorOffice.service";
import { LanguageService } from "../../service/language.service";
import { PatientService } from "../../service/patient.service";
import { MedicalProcessEditComponent } from "./edit/medicalProcess.edit.component";
import { MedicalCenterAddComponent } from "../parameter/medical-center/create/create-medical-center.component";
import { MedicalCenterListComponent } from "../parameter/medical-center/list/medical-center-list.component";
import { MedicalProcessService } from '../../service/medicalProcess.service';
import { ArsService } from '../../service/ars.service';
import { PatientFormService } from '../../service/patientForm.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    MedicalProcessRoutingModule,
    TranslateModule,
  ],
  declarations: [
    MedicalProcessAddComponent,
    MedicalProcessListComponent,
    MedicalProcessEditComponent,
  ],
  providers: [
    MedicalProcessService,
    LanguageService,
    DoctorOfficeService,
    ArsService,
    PatientFormService,
    CurrencyService,
    PatientService,
    DescountReasonService,
    MedicalServiceService,
  ],
})
export class MedicalProcessModule {}
