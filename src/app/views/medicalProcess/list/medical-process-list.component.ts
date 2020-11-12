import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Router } from "@angular/router";
import { AlertService } from "../../../service/alert-sweet.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { config } from "../../../constant/param";
import { MedicalProcessService } from "../../../service/medicalProcess.service";

@Component({
  templateUrl: "./medical-process-list.component.html",
})
export class MedicalProcessListComponent implements OnInit {
  processList = [];
  doctorId = "";
  filter: any = {};
  dataPage = {};
  page: number = 1;
  constructor(
    private translate: TranslateService,
    private router: Router,
    private _modalService: NgbModal,
    private alert: AlertService,
    private apiService: MedicalProcessService
  ) {}
  ngOnInit() {
    this.filter.doctorId = JSON.parse(
      localStorage.getItem("currentUser")
    ).doctorId;
    this.getAll();
  }

  confirmDelete(id) {
    this.alert.question(
      () => {
        this.delete(id);
      },
      this.translate.instant("confirm"),
      this.translate.instant("sureTextRemove")
    );
  }
  delete(id) {
    this.apiService.delete(id).subscribe(
      (response) => {
        this.alert.success(this.translate.instant("sucessDelete"));
        this.getAll();
      },
      (error) => {
        this.alert.success(this.translate.instant(""));
      }
    );
  }

  newProcess() {
    this.router.navigate(["medical-process/add"]);
  }
  edit(id) {
    this.router.navigate(["medical-process/edit/" + id]);
  }
  getAll() {
    this.filter.patientName = !this.filter.patientName
      ? ""
      : this.filter.patientName;
    this.filter.toDate = !this.filter.toDate ? "" : this.filter.toDate;
    this.filter.dateFrom = !this.filter.dateFrom ? "" : this.filter.dateFrom;

    this.apiService
      .getByDoctor(this.page, this.filter)
      .subscribe((response) => {
        this.processList = response.data;
        this.dataPage = response;
      });
  }

  changePage(next: boolean) {
    this.page = next ? (this.page += 10) : (this.page -= 10);
    this.getAll();
  }
}
