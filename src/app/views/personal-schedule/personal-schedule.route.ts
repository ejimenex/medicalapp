import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {PersonalScheduleComponent  } from './create/create-personal-schedule.component';
import { PersonalScheduleListComponent } from './list/list-personal-schedule.component';

import { RoleGuard } from '../../service/guard';
import { Permission } from '../../model/enum/permission.enum';



const routes: Routes = [
  {
    path: '',
    canActivate:[RoleGuard],
    component: PersonalScheduleListComponent,
    data: {
      title: 'Personal Schedule',expectedPermission: Permission.personalSchedule
    }   ,
    children: [
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonalScheduleRoutingModule {}
