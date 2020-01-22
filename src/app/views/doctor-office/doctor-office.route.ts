import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {DoctorOfficeListComponent  } from './list/doctor-office-list.component';
import { DoctorOfficeAddComponent } from './create/doctor-office-create.component';
import {TranslateService} from '@ngx-translate/core';
import { DefaultLayoutComponent } from '../../containers';
import { RoleGuard } from '../../service/guard';
import { Permission } from '../../model/enum/permission.enum';




const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Office'
    },
    
    children: [
   {
      path: '',
      component:DoctorOfficeListComponent,
      canActivate:[RoleGuard],
      data: {
        title: 'Office',expectedPermission: Permission.officeList
      }},
      {
        path: 'add',
        component: DoctorOfficeAddComponent,
        canActivate:[RoleGuard],
        data: {
          title: 'Add Office',expectedPermission: Permission.officeCreate
        }      
      },
    
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorOfficeRoutingModule {}
