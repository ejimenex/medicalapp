import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {PatientListComponent  } from './list/patient-list.component';
import { PatientAddComponent } from './create/patient-create.component';
import {TranslateService} from '@ngx-translate/core';
import { DefaultLayoutComponent } from '../../containers';
import { RoleGuard } from '../../service/guard';
import { Permission } from '../../model/enum/permission.enum';
import { ViewPatientComponent } from './view/view.patient.component';
import { EditPatientComponent } from './edit/patient-edit.component';




const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Patient'
    },
    
    children: [
   {
      path: '',
      component:PatientListComponent,
      data: {
        title: 'Patient',expectedPermission: Permission.patientList
      }, canActivate:[RoleGuard]},
      {
        path: 'add',
        component: PatientAddComponent,
        canActivate:[RoleGuard],
        data: {
          title: 'Add Patient',expectedPermission: Permission.patientCreate
        }      
      },
      {
        path: 'edit/:id',
        component: EditPatientComponent,
        canActivate:[RoleGuard],
        data: {
          title: 'Edit Patient',expectedPermission: Permission.patientEdit
        }      
      },
       
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule {}
