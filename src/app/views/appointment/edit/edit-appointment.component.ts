import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from '../../../service/alert-sweet.service';
import { AppointmentModel } from '../../../model/appointment.model';
import { Router, ActivatedRoute } from '@angular/router';
import { PatientService } from '../../../service/patient.service';
import { AppointmentService } from '../../../service/appointment.service';
import { DoctorOfficeService } from '../../../service/doctorOffice.service';
import * as moment from 'moment';



@Component({
    templateUrl: './edit-appointment.component.html'
})
export class ApointmentEditComponent implements OnInit {

    cita: AppointmentModel = new AppointmentModel();
    office = [];
    patient: any = {};
    id: any = 0;
    constructor(private translate: TranslateService,
        private router: Router,
        private alertService: AlertService,
        private officeService: DoctorOfficeService,
        private route: ActivatedRoute,
        private patientService: PatientService,
        private citaService: AppointmentService
    ) {
    }

    ngOnInit() {
        this.id = this.route.snapshot.paramMap.get('id')        
       
        this.getData()
    }
    getData() {
        this.citaService.getById(this.id).subscribe(respo => {
           this.cita=respo
           this.cita.date=moment(this.cita.date).format('YYYY-MM-DD') as any;
           this.patientService.getById(respo.patientId).subscribe(res => this.patient = res)
           this.getOffice()
        })
    }
    getOffice() {
        this.officeService.getByDoctor(this.cita.doctorId).subscribe(res => this.office = res as any)
    }
    validateRequidesFileds() {
        let result = (!this.cita.date || !this.cita.officeId)
        return result;
    }

    save() {
        if (this.validateRequidesFileds())
            return this.alertService.error(this.translate.instant("vreqFiled"), 'Error')
        this.cita.patientId = this.patient.id;

        this.citaService.put(this.id, this.cita).subscribe(response => {
            this.router.navigate(['/appointment'])
            this.alertService.success(this.translate.instant("sucessEdition"))
        }, error => {
            this.alertService.error(this.translate.instant(error.error))
        })
    }
}
