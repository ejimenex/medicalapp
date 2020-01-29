import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {AppointmentListComponent  } from './list/appointment-list.component';

import {TranslateService} from '@ngx-translate/core';
import { DefaultLayoutComponent } from '../../containers';
import { RoleGuard } from '../../service/guard';
import { Permission } from '../../model/enum/permission.enum';
import { ApointmentAddComponent } from './create/create-appointment.component';
import { ApointmentEditComponent } from './edit/edit-appointment.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Appointment'
    },
    
    children: [
   {
      path: '',
      component:AppointmentListComponent,
      data: {
        title: 'Appointment',expectedPermission: Permission.appointmentList
      }, canActivate:[RoleGuard]}
      ,
      {
        path: 'create/:id',
        component: ApointmentAddComponent,
        canActivate:[RoleGuard],
        data: {
          title: 'Add Appointment',expectedPermission: Permission.appointMentCreate
        }      
      }, {
        path: 'edit/:id',
        component: ApointmentEditComponent,
        canActivate:[RoleGuard],
        data: {
          title: 'Add Appointment',expectedPermission: Permission.appointMentCreate
        }      
      }
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppintmentRoutingModule {}
