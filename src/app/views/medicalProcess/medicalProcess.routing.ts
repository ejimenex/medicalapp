import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {MedicalProcessListComponent  } from './list/medical-process-list.component';
import { MedicalProcessAddComponent } from './create/medicalProcess.add.component';
import {TranslateService} from '@ngx-translate/core';
import { DefaultLayoutComponent } from '../../containers';
import { RoleGuard } from '../../service/guard';
import { Permission } from '../../model/enum/permission.enum';
import { MedicalProcessEditComponent } from './edit/medicalProcess.edit.component';
const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Medical Process'
    },
    
    children: [
   {
      path: '',
      component:MedicalProcessListComponent,
      canActivate:[RoleGuard],
      data: {
        title: 'List',expectedPermission: Permission.ProcessList
      }},
      {
        path: 'add',
        component: MedicalProcessAddComponent,
        canActivate:[RoleGuard],
        data: {
          title: 'Add Invoice',expectedPermission: Permission.ProcessCreate
        }      
      },
      {
        path: 'edit/:id',
        component: MedicalProcessEditComponent,
        canActivate:[RoleGuard],
        data: {
          title: 'Edit Process',expectedPermission: Permission.ProcessEdit
        }      
      },
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicalProcessRoutingModule {}
