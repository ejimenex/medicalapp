import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { AlertService } from '../../../service/alert-sweet.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DoctorOfficeService } from '../../../service/doctorOffice.service';
import { TranslateService } from '@ngx-translate/core';
import { debounceTime, map, distinctUntilChanged, catchError, switchMap } from 'rxjs/operators';
import { DoctorOffice } from '../../../model/doctorOffice';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MedicalCenterService } from '../../../service/medical-center.service';
import { Observable, of } from 'rxjs';



@Component({
    selector: 'doctor-office-patient-app',
    templateUrl: './doctor-office-edit.component.html'
})
export class DoctorOfficeEditComponent implements OnInit {
    @Output() notifyParent: EventEmitter<any> = new EventEmitter();
    id: number;
    office: DoctorOffice = new DoctorOffice();
    iframe: SafeResourceUrl;
    selectedMedicalCenter:any={};
    filter:any={};
    constructor(
        private alertService: AlertService,
        public activeModal: NgbActiveModal,
        private sanitizer: DomSanitizer,
        private doctorOfficeService: DoctorOfficeService,
        private medicalCenterService: MedicalCenterService,
        private translate: TranslateService) { }

    ngOnInit() {
  
        this.getOne(this.id);
        this.filter.specifiedField = JSON.parse(localStorage.getItem("currentUser")).countryId
        this.filter.field = 'name';
        this.filter.value = '';
        this.office.doctorId = JSON.parse(localStorage.getItem("currentUser")).doctorId;

    }

    getOne(id: number) {
        this.doctorOfficeService.getById(this.id).subscribe(response => {
            this.office = response;
            this.selectedMedicalCenter=this.office.medicalCenterName
            this.iframe = this.transformUrl(response.urlMapsAddress);
        })
    }

    transformUrl(url) {

        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }

    selectOneMedicalCenter(data: any) {
        debugger
        if (data.hasOwnProperty('item')) {
            data = data.item
        }

        this.office.medicalCenterId = data.id
    }
    applyFilter(term: any) {
        this.filter.value = term
        return this.filter
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

    edit() {

        if (!this.office.name || !this.office.medicalCenterId)
            return this.alertService.error(this.translate.instant("vreqFiled"), 'Error')
        this.doctorOfficeService.put(this.id, this.office).subscribe(response => {
            this.alertService.success(this.translate.instant('sucessEdition'));
            this.notifyParent.emit();
            this.close();
        }, error => {

        })
    }
    close() { this.activeModal.close() }
}
