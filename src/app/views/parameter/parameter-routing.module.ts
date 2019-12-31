import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {CountryListComponent  } from './country/list/country-list.component';
import { CountryAddComponent } from './country/create/country-create.component';
import {TranslateService} from '@ngx-translate/core';
import { UserListComponent } from './user/list/list-user.component';
import { UserAddComponent } from './user/create/create-user.component';
import { ArsAddComponent } from './ars/create/create-ars.component';
import { ArsListComponent } from './ars/list/list-ars.component';



const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Parameter'
    },
    children: [
   
      {
        path: 'country',
        component: CountryListComponent,
        data: {
          title: 'Country'
        }      
      },      
      {
        path: 'country/add',
        component: CountryAddComponent,
        data: {
          title: 'Add Country'
        }      
      },
      {
        path: 'user',
        component: UserListComponent,
        data: {
          title: 'User'
        }      
      },
      {
        path: 'user/add',
        component: UserAddComponent,
        data: {
          title: 'Add User'
        }      
      },
      {
        path: 'ars',
        component: ArsListComponent,
        data: {
          title: 'Ars'
        }      
      },
      {
        path: 'ars/add',
        component: ArsAddComponent,
        data: {
          title: 'Add Ars'
        }      
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParameterRoutingModule {}
