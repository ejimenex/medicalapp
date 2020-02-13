import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router'
import { AlertService } from '../../../service/alert-sweet.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { config } from '../../../constant/param';
import { PersonalScheduleService } from '../../../service/personalSchedule.service';
import { PersonalScheduleComponent } from '../create/create-personal-schedule.component';

import * as moment from 'moment'

@Component({
    templateUrl: './list-personal-schedule.component.html'
})
export class PersonalScheduleListComponent implements OnInit {

    data = [];
    filter: any = {};
    constructor(private translate: TranslateService, private router: Router,
        private alert: AlertService, private _modalService: NgbModal,
        private personalScheduleService: PersonalScheduleService) {


    }
    ngOnInit() {
        this.filter.doctor = JSON.parse(localStorage.getItem("currentUser")).doctorGuid;
        this.getAll();

    }
    confirmDelete(id) {
        this.alert.question(() => { this.delete(id) }, this.translate.instant('confirm'), this.translate.instant('sureTextRemove'))
    }
    delete(id) {
        this.personalScheduleService.delete(id).subscribe(response => {
            this.alert.success(this.translate.instant('sucessDelete'));
            this.getAll();
        }, error => {
            this.alert.success(this.translate.instant(''));
        })
    }
    getAll() {
        let date = moment(this.filter.date).format('YYYY-MM-DD')
        
        this.personalScheduleService.getByDoctor(this.filter.doctor, date).subscribe(response => {
            this.data = response.map(res=>{
                res['cl']=res.state?'alert alert-success':'alert alert-danger';
             
                return res
            });
        })
    }

putReady(item){
    item.state=false;
    this.personalScheduleService.put(item.id,item).subscribe(resp=>{
        this.getAll();
    })
}
    openEditView(id: number): void {
        let modal = this._modalService.open(
            PersonalScheduleComponent,
            config.modalConfig
        )
        modal.componentInstance.id = id
        modal.componentInstance.notifyParent.subscribe(result => {
            this.getAll();
        })
    }
}
