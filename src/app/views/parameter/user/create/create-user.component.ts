import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AlertToast } from '../../../../service/alert-toast.service';
import { AlertService } from '../../../../service/alert-sweet.service';
import { UserModel } from '../../../../model/user';
import { Router } from '@angular/router';
import { UserService } from '../../../../service/users.service';
import { LanguageService } from '../../../../service/language.service';
import { RoleService } from '../../../../service/role.service';


@Component({
    templateUrl: './create-user.component.html'
})
export class UserAddComponent implements OnInit {

    user: UserModel = new UserModel();
    language = [];
    role = [];
    constructor(private translate: TranslateService, private alert: AlertToast,
        private router: Router, private alertService: AlertService,
        private roleService: RoleService,
        private langService: LanguageService,
        private userService: UserService) {
 
    }
    ngOnInit() {
        this.getLanguage();
        this.getRole();
    }

    async getLanguage() {

        this.language = await this.langService.get().toPromise();
    }
    async getRole() {

        this.role = await this.roleService.get().toPromise();
    }
    save() {

        if (!this.user.name || !this.user.surName || !this.user.languageId || !this.user.password || !this.user.rolId || !this.user.mail)
            return this.alertService.error(this.translate.instant("vreqFiled"), 'Error')
        this.userService.post(this.user).subscribe(response => {

            this.router.navigate(['parameter/user'])
            this.alertService.success(this.translate.instant("sucessRegister"))
        }, error => {

            this.alertService.error(this.translate.instant(error.error))
        })

    }

}
