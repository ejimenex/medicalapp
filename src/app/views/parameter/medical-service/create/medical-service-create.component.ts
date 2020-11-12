import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { AlertToast } from "../../../../service/alert-toast.service";
import { AlertService } from "../../../../service/alert-sweet.service";
import { MedicalService } from "../../../../model/medicalService";
import { Router, ActivatedRoute } from "@angular/router";
import { MedicalServiceService } from "../../../../service/medicalService.service";
import { LanguageService } from "../../../../service/language.service";
import { RoleService } from "../../../../service/role.service";

@Component({
  templateUrl: "./medical-service-create.component.html",
})
export class MedicalServiceCreateComponent implements OnInit {
  serviceModel: MedicalService = new MedicalService();
  currency = [];
  role = [];
  id = 0;
  constructor(
    private translate: TranslateService,
    private alert: AlertToast,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private roleService: RoleService,
    private langService: LanguageService,
    private medicalServiceService: MedicalServiceService
  ) {}
  ngOnInit() {
    this.serviceModel.doctorGuid = JSON.parse(
      localStorage.getItem("currentUser")
    ).doctorGuid;
    this.serviceModel.applyInsurance = false;
    this.id = parseInt(this.route.snapshot.paramMap.get("id"));

    this.getCurrencies();
    if (this.id) {
      this.getData();
    }
  }

  async getCurrencies() {
    this.currency = (await this.medicalServiceService
      .getCurrency()
      .toPromise()) as any;
  }
  async getData() {
    this.serviceModel = (await this.medicalServiceService
      .getById(this.id)
      .toPromise()) as any;
  }
  save() {
    if (this.id) this.edit();
    else this.add();
  }
  add() {
    if (
      !this.serviceModel.name ||
      !this.serviceModel.price ||
      !this.serviceModel.currencyId
    )
      return this.alertService.error(
        this.translate.instant("vreqFiled"),
        "Error"
      );
    this.medicalServiceService.post(this.serviceModel).subscribe(
      (response) => {
        this.router.navigate(["parameter/medical-service"]);
        this.alertService.success(this.translate.instant("sucessRegister"));
      },
      (error) => {
        this.alertService.error(this.translate.instant(error.error));
      }
    );
  }
  edit() {
    if (
      !this.serviceModel.name ||
      !this.serviceModel.price ||
      !this.serviceModel.currencyId
    )
      return this.alertService.error(
        this.translate.instant("vreqFiled"),
        "Error"
      );
    this.medicalServiceService.put(this.id, this.serviceModel).subscribe(
      (response) => {
        this.router.navigate(["parameter/medical-service"]);
        this.alertService.success(this.translate.instant("sucessEdition"));
      },
      (error) => {
        this.alertService.error(this.translate.instant(error.error));
      }
    );
  }
}
