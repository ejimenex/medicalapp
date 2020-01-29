// Angular
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

// Components Routing

import { CountryService } from '../../service/country.service';
import { LanguageService } from '../../service/language.service';
import { UserService } from '../../service/users.service';

import { RoleService } from '../../service/role.service';

import { ArsService } from '../../service/ars.service';


import { AppointmentListComponent } from './list/appointment-list.component';

import { PatientService } from '../../service/patient.service';
import { AppintmentRoutingModule } from './appointment.route';

import { AppointmentService } from '../../service/appointment.service';
import { ApointmentAddComponent } from './create/create-appointment.component';
import { ApointmentEditComponent } from './edit/edit-appointment.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    AppintmentRoutingModule,
    TranslateModule

  ],
  declarations: [
    AppointmentListComponent,
    ApointmentAddComponent,
    ApointmentEditComponent

  ], entryComponents: [],
  providers: [UserService, LanguageService, RoleService, ArsService, PatientService, AppointmentService]
})
export class AppointmentModule { }
