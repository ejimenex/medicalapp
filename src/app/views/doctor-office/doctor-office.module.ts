// Angular
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

// Components Routing


import { LanguageService } from '../../service/language.service';
import { UserService } from '../../service/users.service';

import { RoleService } from '../../service/role.service';

import { DoctorService } from '../../service/doctor.service';


 import { DoctorOfficeListComponent } from './list/doctor-office-list.component';
 import { DoctorOfficeAddComponent } from './create/doctor-office-create.component';

 import { DoctorOfficeEditComponent } from './edit/doctor-office-edit.component';

import { DoctorOfficeRoutingModule } from './doctor-office.route';
import { DoctorOfficeService } from '../../service/doctorOffice.service';
import { MedicalCenterService } from '../../service/medical-center.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    DoctorOfficeRoutingModule,
    TranslateModule

  ],
  declarations: [
  DoctorOfficeAddComponent,
  DoctorOfficeEditComponent,
  DoctorOfficeListComponent
  
  ], entryComponents: [DoctorOfficeEditComponent ],
  providers: [ UserService, LanguageService, RoleService, DoctorOfficeService,MedicalCenterService]
})
export class  DoctorOfficeModule { }
