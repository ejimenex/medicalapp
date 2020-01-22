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


@Component({
    selector: 'edit-schedule-app',
    templateUrl: './edit-medical-schedule.component.html'
})
export class EditMedicaScheduleComponent implements OnInit {
    @Output() notifyParent: EventEmitter<any> = new EventEmitter();
    id: number;
    schedule: MedicalSchedule = new MedicalSchedule();
    filter: any = {};
    country:number
    selectedMedicalCenter: any = {}

    constructor(private alertService: AlertService,private medicalCenterService: MedicalCenterService, 
        public activeModal: NgbActiveModal, private scheduleService: MedicalScheduleService, private translate: TranslateService) { }

    ngOnInit() {
        this.country = JSON.parse(localStorage.getItem("currentUser")).countryId;
        this.filter.specifiedField = JSON.parse(localStorage.getItem("currentUser")).countryId
        this.filter.field = 'name';
        this.filter.value = '';
            this.getOne();
            
    }

    getOne() {
        this.scheduleService.getById(this.id).subscribe(response => {
            this.schedule = response;
            console.log(response)
            this.selectedMedicalCenter.name=response.medicalCenterName
            this.selectedMedicalCenter.id=response.medicalCenterId
            console.log(this.selectedMedicalCenter)
        })
    }
    selectOneMedicalCenter(data: any) {
        if (data.hasOwnProperty('item')) {
          data = data.item
        }
    
        this.schedule.medicalCenterId = data.id
      }
    formatterMedicalCenter = (result: any) => result.name
    searchMedicalCenter = (text$: Observable<any[]>) =>
        text$.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap(term =>

                this.medicalCenterService.getBySpecifiedParam(false, this.applyFilter(term), 0, 'countryId')
            ),
            map(x => {
                return x
            }),
            catchError(() => {
                return of([])
            })
        )

      

    applyFilter(term: any) {
     this.filter.value=term
     return this.filter
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
