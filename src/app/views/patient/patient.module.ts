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

import { ArsService } from "../../service/ars.service";

import { PatientListComponent } from "./list/patient-list.component";
import { PatientAddComponent } from "./create/patient-create.component";

import { EditPatientComponent } from "./edit/patient-edit.component";

import { PatientService } from "../../service/patient.service";
import { PatientRoutingModule } from "./patient.route";

import { AppointmentService } from "../../service/appointment.service";
import { PatientFormService } from "../../service/patientForm.service";
import { NzTabsModule } from 'ng-zorro-antd/tabs';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,        
    PatientRoutingModule,
    NzTabsModule,
    TranslateModule,
  ],
  declarations: [
    PatientAddComponent,
    PatientListComponent,
    EditPatientComponent
  ],
  entryComponents: [],
  providers: [
    UserService,
    LanguageService,
    RoleService,
    ArsService,
    PatientService,
    AppointmentService,
    PatientFormService,
    
  ],
})
export class PatientModule {}
