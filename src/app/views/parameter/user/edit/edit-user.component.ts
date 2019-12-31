import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { AlertService } from '../../../../service/alert-sweet.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserModel } from '../../../../model/user';
import { UserService } from '../../../../service/users.service';
import { LanguageService } from '../../../../service/language.service';
import { TranslateService } from '@ngx-translate/core';
import { RoleService } from '../../../../service/role.service';


@Component({
    selector: 'edit-user-app',
    templateUrl: './edit-user.component.html'
})
export class EditUserComponent implements OnInit {
    @Output() notifyParent: EventEmitter<any> = new EventEmitter();
    id: number;
    user: UserModel = new UserModel();
    language = [];
    role = [];

    constructor(
        private alertService: AlertService,
        public activeModal: NgbActiveModal,
        private userService: UserService,
        private translate: TranslateService,
        private langService: LanguageService,
        private roleService: RoleService) { }

    ngOnInit() {
        
        this.getOne(this.id);
        this.getLanguage();
        this.getRole();
    }

    getOne(id: number) {
        this.userService.getById(this.id).subscribe(response => {
            this.user = response;
        })
    }
    async getLanguage() {
        this.language = await this.langService.get().toPromise();
    }
    async getRole() {
        this.role = await this.roleService.get().toPromise();
    }
    edit() {

        if (!this.user.name || !this.user.surName || !this.user.password || !this.user.userName || !this.user.mail || !this.user.rolId)
            return this.alertService.error(this.translate.instant("vreqFiled"), 'Error')
        this.userService.put(this.id, this.user).subscribe(response => {
            this.alertService.success(this.translate.instant('sucessEdition'));
            this.notifyParent.emit();
            this.close();
        }, error => {

        })
    }
    close() { this.activeModal.close() }
}
