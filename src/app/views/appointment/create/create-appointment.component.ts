import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from '../../../service/alert-sweet.service';
import { AppointmentModel } from '../../../model/appointment.model';
import { Router, ActivatedRoute } from '@angular/router';
import { PatientService } from '../../../service/patient.service';
import { AppointmentService } from '../../../service/appointment.service';
import { DoctorOfficeService } from '../../../service/doctorOffice.service';
import { MedicalScheduleService } from '../../../service/medicalSchedule.service';


@Component({
  templateUrl: './create-appointment.component.html'
})
export class ApointmentAddComponent implements OnInit {

  cita: AppointmentModel = new AppointmentModel();
  office = [];
  patient: any = {};
  schedule = [];
  id: number = 0;
  numberDay=0;
  constructor(private translate: TranslateService,
    private router: Router,
    private alertService: AlertService,
    private officeService: DoctorOfficeService,
    private route: ActivatedRoute,
    private patientService: PatientService,
    private citaService: AppointmentService,
    private scheduleService: MedicalScheduleService
  ) {
  }

  ngOnInit() {
    this.schedule=[]
    this.patient.id = this.route.snapshot.paramMap.get('id')
    this.cita.doctorId = JSON.parse(localStorage.getItem("currentUser")).doctorId;
    this.patientService.getById(this.patient.id).subscribe(res => this.patient = res)
    this.getOffice();
  }

  getOffice() {
    this.officeService.getByDoctor(this.cita.doctorId).subscribe(res => this.office = res as any)
  }
  getNumberDay(){
    this.numberDay=new Date(this.cita.date).getDay()
  }
  getSchedule(id) {
    this.scheduleService.getByOffice(id).subscribe(res => {
      this.schedule = res as any;
    })
  }
  validateRequidesFileds() {
    let result = (!this.cita.date || !this.cita.officeId)
    return result;
  }

  save() {
    if (this.validateRequidesFileds())
      return this.alertService.error(this.translate.instant("vreqFiled"), 'Error')
      this.cita.scheduleId=this.schedule.length==1?this.schedule[0].id:1;
    this.cita.patientId = this.patient.id;
    this.cita.appointmentStateId = 4;
    this.citaService.post(this.cita).subscribe(response => {
      this.router.navigate(['/appointment'])
      this.alertService.success(this.translate.instant("sucessRegister"))
    }, error => {
      this.alertService.error(this.translate.instant(error.error))
    })
  }
}
