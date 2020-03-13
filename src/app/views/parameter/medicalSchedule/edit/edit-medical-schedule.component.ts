import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { AlertService } from '../../../../service/alert-sweet.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MedicalSchedule } from '../../../../model/medicalSchedule';
import { CountryService } from '../../../../service/country.service';
import { TranslateService } from '@ngx-translate/core';
import { MedicalScheduleService } from '../../../../service/medicalSchedule.service';
import {
    finalize,
    debounceTime,
    distinctUntilChanged,
    switchMap,
    map,
    catchError
} from 'rxjs/operators'
import { MedicalCenterService } from '../../../../service/medical-center.service';
import { of, Observable } from 'rxjs';
import { DoctorOfficeService } from '../../../../service/doctorOffice.service';


@Component({
    selector: 'edit-schedule-app',
    templateUrl: './edit-medical-schedule.component.html'
})
export class EditMedicaScheduleComponent implements OnInit {
    @Output() notifyParent: EventEmitter<any> = new EventEmitter();
    id: number;
    schedule: MedicalSchedule = new MedicalSchedule();
    filter: any = {};
    country: number
    offices = []

    constructor(private alertService: AlertService, private officeService: DoctorOfficeService,
        public activeModal: NgbActiveModal, private scheduleService: MedicalScheduleService, private translate: TranslateService) { }

    ngOnInit() {
        this.country = JSON.parse(localStorage.getItem("currentUser")).countryId;
        this.filter.specifiedField = JSON.parse(localStorage.getItem("currentUser")).countryId
        this.filter.field = 'name';
        this.filter.value = '';
        this.getOffices()
        this.getOne();

    }

    getOffices() {
        
        this.filter.specifiedField =JSON.parse(localStorage.getItem("currentUser")).doctorId;
        this.officeService.getNotPaginated(this.filter,'DoctorId').subscribe(res => this.offices = res['value'])
    }
    getOne() {
        this.scheduleService.getById(this.id).subscribe(response => {
            this.schedule = response;
          
            console.log(response)
        })
    }

    edit() {
        this.scheduleService.put(this.id, this.schedule).subscribe(response => {
            this.alertService.success(this.translate.instant('sucessEdition'));
            this.notifyParent.emit();
            this.close();
        }, error => {

        })
    }

    close() { this.activeModal.close() }
}
