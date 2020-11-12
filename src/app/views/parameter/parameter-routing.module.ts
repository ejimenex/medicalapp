import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { CountryListComponent } from "./country/list/country-list.component";
import { CountryAddComponent } from "./country/create/country-create.component";
import { TranslateService } from "@ngx-translate/core";
import { UserListComponent } from "./user/list/list-user.component";
import { UserAddComponent } from "./user/create/create-user.component";
import { ArsAddComponent } from "./ars/create/create-ars.component";
import { ArsListComponent } from "./ars/list/list-ars.component";
import { MedicalCenterService } from "../../service/medical-center.service";
import { MedicalCenterListComponent } from "./medical-center/list/medical-center-list.component";
import { MedicalCenterAddComponent } from "./medical-center/create/create-medical-center.component";
import { DoctorListComponent } from "./doctor/list/doctor-list.component";
import { DoctorAddComponent } from "./doctor/create/doctor-create.component";
import { MedicalScheduleComponent } from "./medicalSchedule/medicalSchedule.component";
import { RoleGuard } from "../../service/guard";
import { Permission } from "../../model/enum/permission.enum";
import { MedicalServiceListComponent } from "./medical-service/list/medical-service-list.component";
import { MedicalServiceCreateComponent } from "./medical-service/create/medical-service-create.component";
import { MedicalFormListComponent } from "./form-question/list/list-question.component";
import { CreateQuestionComponent } from "./form-question/create/create-question.component";

const routes: Routes = [
  {
    path: "",
    data: {
      title: "Parameter",
    },
    children: [
      {
        path: "country",
        canActivate: [RoleGuard],
        component: CountryListComponent,
        data: {
          title: "Country",
          expectedPermission: Permission.countryList,
        },
      },
      {
        path: "country/add",
        component: CountryAddComponent,
        canActivate: [RoleGuard],
        data: {
          title: "Add Country",
          expectedPermission: Permission.countryCreate,
        },
      },
      {
        path: "user",
        canActivate: [RoleGuard],
        component: UserListComponent,
        data: {
          title: "User",
          expectedPermission: Permission.userList,
        },
      },
      {
        path: "user/add",
        component: UserAddComponent,
        canActivate: [RoleGuard],
        data: {
          title: "Add User",
          expectedPermission: Permission.userCreate,
        },
      },
      {
        path: "medical-question",
        canActivate: [RoleGuard],
        component: MedicalFormListComponent,
        data: {
          title: "Medical Question",
          expectedPermission: Permission.questionMedicalList,
        },
      },
      {
        path: "medical-question/add/:id",
        canActivate: [RoleGuard],
        component: CreateQuestionComponent,
        data: {
          title: "Medical Question",
          expectedPermission: Permission.questionMedicalCreate,
        },
      },
      {
        path: "medical-service",
        canActivate: [RoleGuard],
        component: MedicalServiceListComponent,
        data: {
          title: "Medical Service",
          expectedPermission: Permission.medicalServiceList,
        },
      },
      {
        path: "medical-service/add/:id",
        component: MedicalServiceCreateComponent,
        canActivate: [RoleGuard],
        data: {
          title: "Add Service",
          expectedPermission: Permission.medicalServiceCreate,
        },
      },
      {
        path: "ars",
        component: ArsListComponent,
        canActivate: [RoleGuard],
        data: {
          title: "Ars",
          expectedPermission: Permission.arsList,
        },
      },
      {
        path: "ars/add",
        component: ArsAddComponent,
        canActivate: [RoleGuard],
        data: {
          title: "Add Ars",
          expectedPermission: Permission.arsCreate,
        },
      },
      {
        path: "medicalcenter",
        component: MedicalCenterListComponent,
        canActivate: [RoleGuard],
        data: {
          title: "Medical Center",
          expectedPermission: Permission.medicalCenterList,
        },
      },
      {
        path: "medicalschedule",
        component: MedicalScheduleComponent,
        canActivate: [RoleGuard],
        data: {
          title: "Medical Schedule",
          expectedPermission: Permission.scheduleList,
        },
      },
      {
        path: "medicalcenter/add",
        component: MedicalCenterAddComponent,
        canActivate: [RoleGuard],
        data: {
          title: "Add Medical Center",
          expectedPermission: Permission.medicalCenterCreate,
        },
      },
      {
        path: "doctor",
        component: DoctorListComponent,
        canActivate: [RoleGuard],
        data: {
          title: "Doctor",
          expectedPermission: Permission.doctorList,
        },
      },
      {
        path: "doctor/add",
        component: DoctorAddComponent,
        canActivate: [RoleGuard],
        data: {
          title: "Add Doctor",
          expectedPermission: Permission.doctorCreate,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParameterRoutingModule {}
