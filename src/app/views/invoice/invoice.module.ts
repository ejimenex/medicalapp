// Angular
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

    // Components Routing
    ;
import { MedicalServiceService } from '../../service/medicalService.service';
import { InvoiceService, DescountReasonService, InvoiceDetailService,CurrencyService } from '../../service/invoice.service';
import { InvoiceListComponent } from './list/list-invoice.component';
import { InvoiceAddComponent } from './create/create-inoice.component';
import { InvoiceRoutingModule } from './invoice.routing';
import { DoctorOfficeService } from '../../service/doctorOffice.service';
import { LanguageService } from '../../service/language.service';
import { PatientService } from '../../service/patient.service';
import { InvoiceEditComponent } from './edit/edit-invoice.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        InvoiceRoutingModule,
        TranslateModule

    ],
    declarations: [
        InvoiceAddComponent,
        InvoiceListComponent,
        InvoiceEditComponent
    ],
    providers: [InvoiceDetailService, LanguageService,DoctorOfficeService,
        CurrencyService,
        PatientService, InvoiceService, DescountReasonService, MedicalServiceService]
})
export class InvoiceModule { }
