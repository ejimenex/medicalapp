// Angular
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

// Components Routing

import { CountryService } from '../../service/country.service';
import { LanguageService } from '../../service/language.service';
import { UserService } from '../../service/users.service';

import { RoleService } from '../../service/role.service';

import { InvoiceService } from '../../service/invoice.service';

import { PatientService } from '../../service/patient.service';

import { ConsultationService } from '../../service/consultation.service';

import { AppointmentService } from '../../service/appointment.service';
import { HistoryRoutingModule } from './history.route';
import { DoctorOfficeService } from '../../service/doctorOffice.service';
import { PrescriptionService } from '../../service/prescription.service';
import { MedicalFormService } from '../../service/medical-form.service';
import { PatientFormService } from '../../service/patientForm.service';
import { HistoryComponent } from './history.component';
import { NzTabsModule } from 'ng-zorro-antd/tabs';


@NgModule({
    imports: [
        CommonModule,
        NzTabsModule,
        FormsModule,
        NgbModule,
        HistoryRoutingModule,
        TranslateModule

    ],
    declarations: [
        HistoryComponent,

    ],
    providers: [UserService, LanguageService,MedicalFormService, PatientService, RoleService,  ConsultationService,  AppointmentService,PrescriptionService,InvoiceService]
})
export class HistoryModule { }
