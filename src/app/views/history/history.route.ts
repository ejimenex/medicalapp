import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {TranslateService} from '@ngx-translate/core';
import { DefaultLayoutComponent } from '../../containers';
import { RoleGuard } from '../../service/guard';
import { Permission } from '../../model/enum/permission.enum';
import { HistoryComponent } from './history.component';
const routes: Routes = [
  {
    path: '',
    data: {
      title: 'History'
    },
    
    children: [
   {
      path: ':id',
      component:HistoryComponent,
      data: {
        title: 'History',expectedPermission: Permission.consultationList
      },
      canActivate:[RoleGuard]
    },
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistoryRoutingModule {}
