import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'base',
        loadChildren: () => import('./views/base/base.module').then(m => m.BaseModule)
      },
      {
        path: 'buttons',
        loadChildren: () => import('./views/buttons/buttons.module').then(m => m.ButtonsModule)
      },
      {
        path: 'patient',
        loadChildren: () => import('./views/patient/patient.module').then(m => m.PatientModule)
      },
      {
        path: 'appointment',
        loadChildren: () => import('./views/appointment/appointment.module').then(m => m.AppointmentModule)
      },
      {
        path: 'consultation',
        loadChildren: () => import('./views/consultation/consultation.module').then(m => m.ConsultationModule)
      }, 
      {
        path: 'medical-process',
        loadChildren: () => import('./views/medicalProcess/medicalProcess.module').then(m => m.MedicalProcessModule)
      },
      {
        path: 'history',
        loadChildren: () => import('./views/history/history.module').then(m => m.HistoryModule)
      },
      {
        path: 'not-authorized',
        loadChildren: () => import('./views/not-auth/not-auth.module').then(m => m.NotAuthorizedModule)
      },
      {
        path: 'office',
        loadChildren: () => import('./views/doctor-office/doctor-office.module').then(m => m.DoctorOfficeModule)
      },
      {
        path: 'personal-schedule',
        loadChildren: () => import('./views/personal-schedule/personalSchedule.module').then(m => m.PersonalScheduleModule)
      },
      {
        path: 'invoices',
        loadChildren: () => import('./views/invoice/invoice.module').then(m => m.InvoiceModule)
      },
      {
        path: 'parameter',
        loadChildren: () => import('./views/parameter/parameter.module').then(m => m.ParamenterModule)
      },
      {
        path: 'charts',
        loadChildren: () => import('./views/chartjs/chartjs.module').then(m => m.ChartJSModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'icons',
        loadChildren: () => import('./views/icons/icons.module').then(m => m.IconsModule)
      },
      {
        path: 'notifications',
        loadChildren: () => import('./views/notifications/notifications.module').then(m => m.NotificationsModule)
      },
      {
        path: 'theme',
        loadChildren: () => import('./views/theme/theme.module').then(m => m.ThemeModule)
      },
      {
        path: 'widgets',
        loadChildren: () => import('./views/widgets/widgets.module').then(m => m.WidgetsModule)
      }
    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
