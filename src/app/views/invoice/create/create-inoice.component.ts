import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { AlertService } from "../../../service/alert-sweet.service";
import { Router } from "@angular/router";
import {
  InvoiceService,
  CurrencyService,
  DescountReasonService,
} from "../../../service/invoice.service";
import { DoctorOfficeService } from "../../../service/doctorOffice.service";
import { PatientService } from "../../../service/patient.service";

import {
  debounceTime,
  map,
  distinctUntilChanged,
  catchError,
  switchMap,
} from "rxjs/operators";
import { Observable, of } from "rxjs";
import { invoice } from "../../../model/invoice";
import { PatientInvoiceComponent } from "../patient-service/patient-service.component";
import { config } from "../../../constant/param";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  templateUrl: "./create-invoice.component.html",
})
export class InvoiceAddComponent implements OnInit {
  invoice: invoice = new invoice();
  filter: any = {};
  selectedMedicalCenter = {};
  selectedPatient: any = {};
  total = 0;
  offices = [];
  patient = [];
  reasonsDiscount = [];
  currency = [];
  arrayServices = [];
  constructor(
    private translate: TranslateService,
    private router: Router,
    private alertService: AlertService,
    private invoiceService: InvoiceService,
    private officeService: DoctorOfficeService,
    private patientService: PatientService,
    private currencyService: CurrencyService,
    private _modalService: NgbModal,
    private reasonService: DescountReasonService
  ) {}

  ngOnInit() {
    this.invoice.doctorGuid = JSON.parse(
      localStorage.getItem("currentUser")
    ).doctorGuid;
    let doctorId = JSON.parse(localStorage.getItem("currentUser")).doctorId;
    this.getPatients(doctorId);
    this.getOffices(doctorId);
    this.getCurrency();
    this.getreasonDiscount();
  }
  selectOnePatient(data: any) {
    if (data.hasOwnProperty("item")) {
      data = data.item;
      console.log(data);
      this.selectedPatient = data;
      let modal = this._modalService.open(
        PatientInvoiceComponent,
        config.modalConfig
      );
      modal.componentInstance.id = data.id;
      modal.componentInstance.notifyParent.subscribe((result) => {
        var exist = this.arrayServices.some((c) => c.id == result.id);
        if (!exist) {
          this.arrayServices.push(result);
          this.sumTotal();
        }
      });
    }
  }
  sumTotal() {
    this.total=0;
    this.arrayServices.map((re) => {
      this.total += parseFloat(re.amount);
      return re;
    });
  }
  onDeleteItem(i) {
    this.arrayServices.splice(i, 1);
    this.sumTotal();
  }
  formatterPatient = (result: any) => result.name;
  searchPatient = (text$: Observable<any[]>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term) =>
        this.patientService.getByDoctorAndName(
          JSON.parse(localStorage.getItem("currentUser")).doctorId,
          term
        )
      ),
      map((x) => {
        return x;
      }),
      catchError(() => {
        return of([]);
      })
    );
  applyFilter(term: any) {
    this.filter.value = term;
    return this.filter;
  }
  async getPatients(id) {
    this.patient = (await this.patientService
      .getByDoctor(id)
      .toPromise()) as any;
  }
  async getOffices(id) {
    this.offices = (await this.officeService
      .getByDoctor(id)
      .toPromise()) as any;
  }
  async getCurrency() {
    this.currency = (await this.currencyService.get().toPromise()) as any;
  }
  validateRequidesFileds() {
    let result = !this.selectedPatient || !this.invoice.currencyId;
    return result;
  }
  async getreasonDiscount() {
    this.reasonsDiscount = (await this.reasonService.get().toPromise()) as any;
  }
  save() {
    if (this.validateRequidesFileds())
      this.alertService.error(
        this.translate.instant("vreqFiled"),
        "Error"
      );     
    // this.invoiceService.post(this.invoice).subscribe(
      this.invoiceService.billProccess(this.arrayServices as [],this.invoice ).subscribe(
      (response) => {
        this.router.navigate(["/invoices"]);
        // this.router.navigate(["/invoices/edit/" + response]);
        this.alertService.success(this.translate.instant("sucessRegister"));
      },
      (error) => {
        this.alertService.error(this.translate.instant(error.error));
      }
    );
  }
}
