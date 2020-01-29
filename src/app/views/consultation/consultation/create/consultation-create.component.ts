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
    ) {
    }

    ngOnInit() {
        this.patientId =parseInt(this.route.snapshot.paramMap.get('id') )
        this.cons.doctorId = JSON.parse(localStorage.getItem("currentUser")).doctorId;
        this.cons.patientId = this.patientId;
        console.log(this.cons)
        this.getReasons();
        this.getPatient();

    }

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
