import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy, PathLocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { TokenService } from './service/tokenService';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { AppComponent } from './app.component';

// Import containers
import { DefaultLayoutComponent } from './containers';
import { ChangePasswordComponent} from './containers/default-layout/changepassword/change.component';
import { DoctorOfficeComponent} from './containers/default-layout/medical-office/medical-office';

import { P404Component } from './views/error/404.component';

import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { AccountService } from './service/account.service';
import { RegisterComponent } from './views/register/register.component';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


import { ToastrModule } from 'ngx-toastr';

const APP_CONTAINERS = [
  DefaultLayoutComponent
];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,

} from '@coreui/angular';

// Import routing module
import { AppRoutingModule } from './app.routing';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AlertToast } from './service/alert-toast.service';
import { AlertService } from './service/alert-sweet.service';
import { JwtModule } from '@auth0/angular-jwt';
import { DoctorOfficeService } from './service/doctorOffice.service';
import { PermissionService } from './service/permission.service';
import { RoleGuard } from './service/guard';

export function token() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  return currentUser.accessToken;
}

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    NgbModule,

    JwtModule.forRoot({
      config: {
        tokenGetter: token
      }
    }),
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
  
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      positionClass: 'toast-center-center',
      preventDuplicates: true,
      closeButton: true,
      enableHtml: true,
      tapToDismiss: true,
      onActivateTick: true
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    P404Component,
    P500Component,
    LoginComponent,
    DefaultLayoutComponent,
    RegisterComponent,ChangePasswordComponent,DoctorOfficeComponent
  ],
  providers: [AlertToast,  AlertService,AccountService,TokenService,DoctorOfficeService,RoleGuard
    , {
    provide: LocationStrategy,
    useClass: HashLocationStrategy,

  }
],entryComponents:[ChangePasswordComponent,DoctorOfficeComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}