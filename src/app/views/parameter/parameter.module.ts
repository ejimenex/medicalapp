// Angular
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { CountryListComponent } from './country/list/country-list.component';
// Components Routing
import { ParameterRoutingModule } from './parameter-routing.module';
import { CountryAddComponent } from './country/create/country-create.component';
import { EditCountryComponent } from './country/edit/edit-country.component';
import { CountryService } from '../../service/country.service';
import { LanguageService } from '../../service/language.service';
import { UserService } from '../../service/users.service';
import { EditUserComponent } from './user/edit/edit-user.component';
import { UserListComponent } from './user/list/list-user.component';
import { UserAddComponent } from './user/create/create-user.component';
import { RoleService } from '../../service/role.service';

import { EditArsComponent } from './ars/edit/edit-ars.component';
import { ArsListComponent } from './ars/list/list-ars.component';
import { ArsAddComponent } from './ars/create/create-ars.component';
import { ArsService } from '../../service/ars.service';


import { MedicalCenterListComponent } from './medical-center/list/medical-center-list.component';
import { MedicalCenterAddComponent } from './medical-center/create/create-medical-center.component';
import { MedicalCenterService } from '../../service/medical-center.service';
import { EditMedicalCenterComponent } from './medical-center/edit/edit-medical-center.component';

import { MedicalSpecilityService } from '../../service/medicalSpeciality.service';
import {DoctorService} from '../../service/doctor.service';
import { DoctorAddComponent } from './doctor/create/doctor-create.component';
import { DoctorListComponent } from './doctor/list/doctor-list.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    ParameterRoutingModule,
    TranslateModule

  ],
  declarations: [
    CountryListComponent,
    CountryAddComponent,
    EditCountryComponent,
    UserListComponent,
    EditUserComponent,
    UserAddComponent,
    ArsAddComponent,
    ArsListComponent,
    EditArsComponent,
    MedicalCenterAddComponent,
    MedicalCenterListComponent,
    EditMedicalCenterComponent,
    DoctorAddComponent,
    DoctorListComponent
  ], entryComponents: [EditCountryComponent, EditUserComponent, EditArsComponent, EditMedicalCenterComponent],
  providers: [CountryService, UserService, LanguageService, RoleService, ArsService, MedicalCenterService, MedicalSpecilityService,DoctorService]
})
export class ParamenterModule { }
