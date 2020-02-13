import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { AlertService } from '../../../service/alert-sweet.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DoctorOfficeService } from '../../../service/doctorOffice.service';
import { TranslateService } from '@ngx-translate/core';
import { debounceTime, map, distinctUntilChanged, catchError, switchMap } from 'rxjs/operators';
import { PersonalScheduleModel } from '../../../model/personalSchedule.model';

import { EventTypeService } from '../../../service/eventType.service';
import { PatientService } from '../../../service/patient.service';
import { PersonalScheduleService } from '../../../service/personalSchedule.service';
import * as moment from 'moment'


@Component({
    selector: 'create-personal-schedule-app',
    templateUrl: './create-personal-schedule.component.html'
})
export class PersonalScheduleComponent implements OnInit {
    @Output() notifyParent: EventEmitter<any> = new EventEmitter();
    id: number;
    eventsType = [];
    event: any = {};
    patients=[];
    per: PersonalScheduleModel = new PersonalScheduleModel();
    doctor: any = {};
    filter: any = {};
    constructor(
        private alertService: AlertService,
        public activeModal: NgbActiveModal,
        private personalScheduleService: PersonalScheduleService,
        private eventService: EventTypeService,
        private translate: TranslateService,
        private patientService:PatientService) { }

    ngOnInit() {

        this.getOne(this.id);
        this.doctor = JSON.parse(localStorage.getItem("currentUser"));
        this.per.doctorGuid =this.doctor.doctorGuid;
        this.getEvents();
        this.getPatiens();

    }

    getPatiens(){
        this.patientService.get().subscribe(resp=>this.patients=resp)
    }
    getEvents() {
        let id = this.doctor.doctorId;
        this.eventService.getByDoctor(id).subscribe(r => {
            this.eventsType = r as []
        })
    }
    saveEvent() {
        this.event.doctorId =this.doctor.doctorId;
            this.eventService.post(this.event).subscribe(response => {
                this.alertService.success('')
                this.event={};
                this.getEvents();
            })
    }
    getOne(id: number) {
        if (id) {
            this.personalScheduleService.getById(this.id).subscribe(response => {
                this.per = response;
                this.per.eventDate=moment(this.per.eventDate).format('YYYY-MM-DD') as any
            })
        }

    }
    save() {
        if (this.id)
            this.edit();
        else
            this.add();

    }

    edit() {

        if (!this.per.note || !this.per.eventTypeId)
            return this.alertService.error(this.translate.instant("vreqFiled"), 'Error')
        this.personalScheduleService.put(this.id, this.per).subscribe(response => {
            this.alertService.success(this.translate.instant('sucessEdition'));
            this.notifyParent.emit();
            this.close();
        }, error => {

        })
    }
    add() {

        if (!this.per.note || !this.per.eventTypeId || !this.per.eventDate)
            return this.alertService.error(this.translate.instant("vreqFiled"), 'Error')
        this.personalScheduleService.post(this.per).subscribe(response => {
            this.alertService.success(this.translate.instant('sucessInsert'));
            this.notifyParent.emit();
            this.close();
        }, error => {

        })
    }
    close() { this.activeModal.close() }
}
