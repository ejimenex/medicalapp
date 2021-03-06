import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from '../../../../service/alert-sweet.service';
import { PatientModel } from '../../../../model/patient.model';
import { Router, ActivatedRoute } from '@angular/router';
import { PatientService } from '../../../../service/patient.service';
import { DoctorOfficeService } from '../../../../service/doctorOffice.service';

import * as moment from 'moment'
import { debounceTime, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ReasonConsultationService } from '../../../../service/reason-consultation.service';
import { ConsultationService } from '../../../../service/consultation.service';
import { ConsultationModel } from '../../../../model/consultation.model';
import {ListPrescripcionComponent} from '../../../prescription/list/list-prescription.component';
import { config } from '../../../../constant/param';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { QuestionComponent } from '../form-patient/form-patient.component';
import { ViewPatientComponent } from '../../../patient/view/view.patient.component';

@Component({
    templateUrl: './consultation-create.component.html'
})
export class ConsultationAddComponent implements OnInit {

    cons: ConsultationModel = new ConsultationModel();
    patient: PatientModel = new PatientModel();
    reasonList = [];
    offices = [];
    patientId: number = 0



    constructor(private translate: TranslateService,
        private router: Router,
        private alertService: AlertService,
        private reasonConsultationService: ReasonConsultationService,
        private consultationService: ConsultationService,
        private doctorOfficeService:DoctorOfficeService,
        private route: ActivatedRoute,
        private patientService: PatientService,
        private _modalService: NgbModal
    ) {
    }

    ngOnInit() {
        this.patientId =parseInt(this.route.snapshot.paramMap.get('id') )
        this.cons.doctorId = JSON.parse(localStorage.getItem("currentUser")).doctorId;
        this.cons.doctorGuid = JSON.parse(localStorage.getItem("currentUser")).doctorGuid;
        this.cons.patientId = this.patientId;
        console.log(this.cons)
        this.getReasons();
        this.getPatient();

    }
    openMedicalFormList(): void {
        let modal = this._modalService.open(
          ViewPatientComponent,
          config.modalConfig
        );
        modal.componentInstance.id =this.cons.patientId;
      }
    openPrescriptionList(): void {
        let modal = this._modalService.open(
          ListPrescripcionComponent,
          config.modalConfig
        )
        modal.componentInstance.id = this.cons.patientId
        
      }
    //   openMedicalFormList(): void {
    //     let modal = this._modalService.open(
    //         QuestionComponent,
    //       config.modalConfig
    //     )
    //     modal.componentInstance.patientId = this.cons.patientId
        
    //   }
      
    async getPatient() {
        this.patient = await this.patientService.getById(this.patientId).toPromise();
        this.patient.bornDate=moment(this.patient.bornDate).format('YYYY-MM-DD') as any;
    }
    async getReasons() {
        this.reasonList = await this.reasonConsultationService.get().toPromise();
        this.offices=await this.doctorOfficeService.getByDoctor(this.cons.doctorId).toPromise() as [];
    }


    save() {
        this.cons.patientId=this.patientId;

        this.consultationService.post(this.cons).subscribe(response => {
            this.router.navigate(['/consultation'])
            this.alertService.success(this.translate.instant("sucessRegister"))
        }, error => {
            this.alertService.error(this.translate.instant(error.error))
        })

    }

}
