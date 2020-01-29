import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {TranslateService} from '@ngx-translate/core';
import { DefaultLayoutComponent } from '../../containers';
import { RoleGuard } from '../../service/guard';
import { Permission } from '../../model/enum/permission.enum';
import { ConsultationListComponent } from './consultation/list/list-consultation.component';
import { ConsultationAddComponent } from './consultation/create/consultation-create.component';
import { ConsultationEditComponent } from './consultation/edit/edit-consultation.component';
const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Consultation'
    },
    
    children: [
   {
      path: '',
      component:ConsultationListComponent,
      data: {
        title: 'Consultation',expectedPermission: Permission.consultationList
      }, canActivate:[RoleGuard]},
      {
        path: 'add/:id',
        component: ConsultationAddComponent,
        canActivate:[RoleGuard],
        data: {
          title: 'Add Consultation',expectedPermission: Permission.consultationCreate
        }      
      },{
        path: 'edit/:id',
        component: ConsultationEditComponent,
        canActivate:[RoleGuard],
        data: {
          title: 'Edit Consultation',expectedPermission: Permission.consultationEdit
        }      
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultationRoutingModule {}
