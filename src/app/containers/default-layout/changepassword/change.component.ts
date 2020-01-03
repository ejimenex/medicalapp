import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AccountService } from '../../../service/account.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from '../../../service/alert-sweet.service';
@Component({
    selector: 'app-change',
    templateUrl: './change.component.html'
})
export class ChangePasswordComponent {

    newPassword: string;
    oldPassword: string;
    usr: string
    constructor(private _router: Router, private translate: TranslateService, public activeModal: NgbActiveModal,
        private alert: AlertService, private accService: AccountService) {
        this.usr = JSON.parse(localStorage.getItem("currentUser")).userName;
    }

    changePassword() {
        if (!this.newPassword || !this.oldPassword) return this.alert.error('')
        this.accService.put(0, { password: this.newPassword, userName: this.usr, oldPassword: this.oldPassword }).subscribe(response => {
            this.alert.success(this.translate.instant('changepasswordSucess'))
            this.close();
        }, error => {
            this.alert.error(this.translate.instant(error.error))
        })
    }
    close() { this.activeModal.close() }

}
