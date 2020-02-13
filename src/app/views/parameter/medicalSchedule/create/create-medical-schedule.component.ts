import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { AlertService } from '../../../../service/alert-sweet.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MedicalSchedule } from '../../../../model/medicalSchedule';
import { MedicalCenterService } from '../../../../service/medical-center.service';
import { TranslateService } from '@ngx-translate/core';
import { MedicalScheduleService } from '../../../../service/medicalSchedule.service';
import { Observable, of } from 'rxjs';
import {
    finalize,
    debounceTime,
    distinctUntilChanged,
    switchMap,
    map,
    catchError
} from 'rxjs/operators'
import { DoctorOfficeService } from '../../../../service/doctorOffice.service';


@Component({
    selector: 'add-schedule-app',
    templateUrl: './create-medical-schedule.component.html'
})
export class CreateMedicaScheduleComponent implements OnInit {
    @Output() notifyParent: EventEmitter<any> = new EventEmitter();
    id: number;
    filter: any = {};
    country: number
    offices = [];
    schedule: MedicalSchedule = new MedicalSchedule();

    constructor(private alertService: AlertService,
        private officeService: DoctorOfficeService,
        public activeModal: NgbActiveModal, private scheduleService: MedicalScheduleService, private translate: TranslateService) { }

    ngOnInit() {
        if (this.id != 0)
            this.getOne(this.id);
        this.getOffices();
        this.country = JSON.parse(localStorage.getItem("currentUser")).countryId;
        this.filter.specifiedField = JSON.parse(localStorage.getItem("currentUser")).countryId
        this.filter.field = 'name';
        this.filter.value = '';
    }

    getOne(id: number) {
        this.scheduleService.getById(this.id).subscribe(response => {
            this.schedule = response;
        })
    }

    add() {
        this.schedule.doctorId = JSON.parse(localStorage.getItem("currentUser")).doctorId;
        this.scheduleService.post(this.schedule).subscribe(response => {
            this.alertService.success(this.translate.instant('sucessRegister'));
            this.notifyParent.emit();
            this.close();
        }, error => {

        })
    }
    getOffices() {
        let doctor = JSON.parse(localStorage.getItem("currentUser")).doctorId;
        
        this.officeService.getByDoctor(doctor).subscribe(res => {
            
            this.offices = res as []})
    }
    //formatterMedicalCenter = (result: any) => result.name
    // searchMedicalCenter = (text$: Observable<any[]>) =>
    //     text$.pipe(
    //         debounceTime(300),
    //         distinctUntilChanged(),
    //         switchMap(term =>

    //             this.medicalCenterService.getBySpecifiedParam(false, this.applyFilter(term), 0, 'countryId')
    //         ),
    //         map(x => {
    //             return x
    //         }),
    //         catchError(() => {
    //             return of([])
    //         })
    //     )



    // applyFilter(term: any) {
    //  this.filter.value=term
    //  return this.filter
    // }
    close() { this.activeModal.close() }
}
