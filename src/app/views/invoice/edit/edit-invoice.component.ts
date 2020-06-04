import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { AlertService } from "../../../service/alert-sweet.service";
import { Router, ActivatedRoute } from "@angular/router";
import {
  InvoiceService,
  CurrencyService,
  InvoiceDetailService,
  DescountReasonService,
} from "../../../service/invoice.service";
import { MedicalServiceService } from "../../../service/medicalService.service";
import { DoctorOfficeService } from "../../../service/doctorOffice.service";
import { PatientService } from "../../../service/patient.service";
import { invoice, invoiceDetail } from "../../../model/invoice";

@Component({
  templateUrl: "./edit-invoice.component.html",
})
export class InvoiceEditComponent implements OnInit {
  invoice: invoice = new invoice();
  invoiceDetail: invoiceDetail = new invoiceDetail();
  invoiceDetailList: invoiceDetail[];
  offices = [];
  patient = [];
  currency = [];
  reasonsDiscount = [];
  services = [];
  id: number;
  originalPrice = 0;
  constructor(
    private translate: TranslateService,
    private router: Router,
    private alertService: AlertService,
    private invoiceService: InvoiceService,
    private officeService: DoctorOfficeService,
    private patientService: PatientService,
    private currencyService: CurrencyService,
    private InvoiceDetailService: InvoiceDetailService,
    private route: ActivatedRoute,
    private servService: MedicalServiceService,
    private reasonService: DescountReasonService
  ) {}

  ngOnInit() {
    this.id = parseInt(this.route.snapshot.paramMap.get("id"));
    this.invoiceDetail.invoiceId = this.id;
    this.invoice.doctorGuid = JSON.parse(
      localStorage.getItem("currentUser")
    ).doctorGuid;
    let doctorId = JSON.parse(localStorage.getItem("currentUser")).doctorId;
    this.getPatients(doctorId);
    this.getOffices(doctorId);
    this.getCurrency();
    this.findHeader();
    this.getService();
    this.invoiceDetail.qty = 1;
    this.getreasonDiscount();
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
  async getreasonDiscount() {
    this.reasonsDiscount = (await this.reasonService.get().toPromise()) as any;
  }
  getService() {
    this.servService.getByDoctor(this.invoice.doctorGuid).subscribe((resp) => {
      this.services = resp;
    });
  }
  setPrice(id) {
    this.servService.getById(id).subscribe((resp) => {
      this.invoiceDetail.price = resp.price;
      this.originalPrice = resp.price;
    });
  }
  validateRequidesFileds() {
    debugger;
    let result =
      !this.invoiceDetail.medicalServiceId || !this.invoiceDetail.price;
    return result;
  }

  findHeader() {
    this.invoiceService.getById(this.id).subscribe((res) => {
      this.invoice = res;
      this.InvoiceDetailService.getByInvoice(this.id).subscribe((result) => {
        this.invoiceDetailList = result;
      });
    });
  }
  saveHeader() {
    this.invoiceService.put(0, this.invoice).subscribe(
      (response) => {
        this.alertService.success(this.translate.instant("sucessEdition"));
      },
      (error) => {
        this.alertService.error(this.translate.instant(error.error));
      }
    );
  }
  saveDetail() {
    if (!this.validateRequidesFileds)
      return this.alertService.error(this.translate.instant("vreqFiled"));
    this.invoiceDetail.discount =
      this.invoiceDetail.qty * this.originalPrice -
      this.invoiceDetail.qty * this.invoiceDetail.price;
    this.invoiceDetail.price = this.originalPrice;
    this.InvoiceDetailService.post(this.invoiceDetail).subscribe(
      (response) => {
        this.invoiceDetail.price = 0;
        this.invoiceDetail.medicalServiceId = null;
        this.invoiceDetail.total = 0;
        this.findHeader();
      },
      (error) => {
        this.alertService.error(this.translate.instant(error.error));
      }
    );
  }
  editDetail(item: invoiceDetail) {
    this.InvoiceDetailService.put(0, item).subscribe(
      (response) => {
        this.alertService.success(this.translate.instant("sucessEdit"));
      },
      (error) => {
        this.alertService.error(this.translate.instant(error.error));
      }
    );
  }
  finish() {
    this.invoice.isBilled = true;
    this.alertService.question(
      () => {
        this.invoiceService.put(0, this.invoice).subscribe(
          (res) => {
            this.alertService.success(
              this.translate.instant("invoiceSusesfully")
            );
            this.findHeader();
          },
          (error) => {}
        );
      },
      this.translate.instant("confirm"),
      this.translate.instant("sureInvoice")
    );
  }
  confirmDelete(id) {
    this.alertService.question(
      () => {
        this.delete(id);
      },
      this.translate.instant("confirm"),
      this.translate.instant("sureTextRemove")
    );
  }
  delete(id) {
    this.InvoiceDetailService.delete(id).subscribe(
      (response) => {
        this.alertService.success(this.translate.instant("sucessDelete"));
        this.findHeader();
      },
      (error) => {
        this.alertService.success(this.translate.instant(error.error));
      }
    );
  }
}
