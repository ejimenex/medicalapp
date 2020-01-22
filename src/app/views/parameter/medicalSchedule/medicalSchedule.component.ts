import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router'
import { AlertService } from '../../../service/alert-sweet.service';
import { MedicalScheduleService } from '../../../service/medicalSchedule.service'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {CreateMedicaScheduleComponent} from './create/create-medical-schedule.component';
import { config } from '../../../constant/param';
import { EditMedicaScheduleComponent } from './edit/edit-medical-schedule.component';

@Component({
  templateUrl: './medicalSchedule.component.html'
})
export class MedicalScheduleComponent implements OnInit {

  id: number;
  medicalSchedules = [];

  constructor(private translate: TranslateService, private router: Router,
    private alert: AlertService,private _modalService: NgbModal,
    private medicalScheduleService: MedicalScheduleService) {


  }
  ngOnInit() {
    this.id = JSON.parse(localStorage.getItem("currentUser")).doctorId;
    this.getAll();

  }
  confirmDelete(id) {
    this.alert.question(() => { this.delete(id) }, this.translate.instant('confirm'), this.translate.instant('sureTextRemove'))
  }
  delete(id) {
    this.medicalScheduleService.delete(id).subscribe(response => {
      this.alert.success(this.translate.instant('sucessDelete'));
      this.getAll();
    }, error => {
      this.alert.success(this.translate.instant(''));
    })
  }
  openModal(id: number): void {
    let modal = this._modalService.open(
      CreateMedicaScheduleComponent,
      config.modalConfig
    )
    modal.componentInstance.id = id
    modal.componentInstance.notifyParent.subscribe(result => {
      this.getAll();
    })
  }
  edit(id: number): void {
    let modal = this._modalService.open(
      EditMedicaScheduleComponent,
      config.modalConfig
    )
    modal.componentInstance.id = id
    modal.componentInstance.notifyParent.subscribe(result => {
      this.getAll();
    })
  }
  getAll() {
    this.medicalScheduleService.getByDoctor(this.id).subscribe(response => {
      this.medicalSchedules = response as any;
    })
  }


}
