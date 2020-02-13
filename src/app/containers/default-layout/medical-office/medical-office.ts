import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AccountService } from '../../../service/account.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from '../../../service/alert-sweet.service';
import { DoctorOffice } from '../../../model/doctorOffice'
import { DoctorOfficeService } from '../../../service/doctorOffice.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
    selector: 'app-doctor-office',
    templateUrl: './medical-office.html'
})
export class DoctorOfficeComponent {

    office: DoctorOffice[];
    map: string
    doctor: number
    doctorName: string
    iframe: SafeResourceUrl;
    constructor(private translate: TranslateService, public activeModal: NgbActiveModal, private sanitizer: DomSanitizer,
        private alert: AlertService, private officeService: DoctorOfficeService) {
        this.doctor = JSON.parse(localStorage.getItem("currentUser")).doctorId;
        this.getOffices();
    }
    getOffices() {
        this.officeService.getByDoctor(this.doctor).subscribe(respon => {
            this.office = respon as any
            this.doctorName = this.office[0].doctorName;
        })
    }
    transformUrl(url) {

        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
    close() { this.activeModal.close() }

}
