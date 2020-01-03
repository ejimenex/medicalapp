import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {CountryListComponent  } from './country/list/country-list.component';
import { CountryAddComponent } from './country/create/country-create.component';
import {TranslateService} from '@ngx-translate/core';
import { UserListComponent } from './user/list/list-user.component';
import { UserAddComponent } from './user/create/create-user.component';
import { ArsAddComponent } from './ars/create/create-ars.component';
import { ArsListComponent } from './ars/list/list-ars.component';
import { MedicalCenterService } from '../../service/medical-center.service';
import { MedicalCenterListComponent } from './medical-center/list/medical-center-list.component';
import { MedicalCenterAddComponent } from './medical-center/create/create-medical-center.component';
import { DoctorListComponent } from './doctor/list/doctor-list.component';
import { DoctorAddComponent } from './doctor/create/doctor-create.component';



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
        },
          
      },
      {
        path: 'medicalcenter',
        component: MedicalCenterListComponent,
        data: {
          title: 'Medical Center'
        }      
      },
      {
        path: 'medicalcenter/add',
        component: MedicalCenterAddComponent,
        data: {
          title: 'Add Medical Center'
        },
          
      },
      {
        path: 'doctor',
        component: DoctorListComponent,
        data: {
          title: 'Doctor'
        }      
      },
      {
        path: 'doctor/add',
        component: DoctorAddComponent,
        data: {
          title: 'Add Doctor'
        },
          
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParameterRoutingModule {}
