import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from '../../../service/alert-sweet.service';
import { Router } from '@angular/router';
import { InvoiceService,CurrencyService } from '../../../service/invoice.service';
import { DoctorOfficeService } from '../../../service/doctorOffice.service';
import { PatientService } from '../../../service/patient.service';

import { debounceTime, map, distinctUntilChanged, catchError, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { invoice } from '../../../model/invoice';



@Component({
  templateUrl: './create-invoice.component.html'
})
export class InvoiceAddComponent implements OnInit {

  invoice: invoice = new invoice();
  filter: any = {};
  selectedMedicalCenter = {};
  offices = [];
  patient = []
  currency=[]
  constructor(private translate: TranslateService,
    private router: Router,
    private alertService: AlertService,
    private invoiceService: InvoiceService,
    private officeService: DoctorOfficeService,
    private patientService: PatientService,
    private currencyService: CurrencyService
  ) {
  }

  ngOnInit() {
    this.invoice.doctorGuid = JSON.parse(localStorage.getItem("currentUser")).doctorGuid
    let doctorId = JSON.parse(localStorage.getItem("currentUser")).doctorId
    this.getPatients(doctorId);
    this.getOffices(doctorId);
    this.getCurrency()
  }
  async getPatients(id) {
    this.patient = await this.patientService.getByDoctor(id).toPromise() as any
  }
  async getOffices(id) {
    this.offices = await this.officeService.getByDoctor(id).toPromise() as any
  }
  async getCurrency() {
    this.currency = await this.currencyService.get().toPromise() as any
  }
  validateRequidesFileds() {
    let result = (!this.invoice.patientId || !this.invoice.currencyId)
    return result;
  }

  save() {
    if (this.validateRequidesFileds())
      return this.alertService.error(this.translate.instant("vreqFiled"), 'Error')
      
    this.invoiceService.post(this.invoice).subscribe(response => {
      this.router.navigate(['/invoices/edit/'+response])
      this.alertService.success(this.translate.instant("sucessRegister"))
    }, error => {
      this.alertService.error(this.translate.instant(error.error))
    })

  }

}
