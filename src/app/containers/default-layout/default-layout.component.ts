import { Component } from '@angular/core';
import { navItems } from '../../_nav';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AccountService } from '../../service/account.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChangePasswordComponent } from './changepassword/change.component';
import { DoctorOfficeComponent } from './medical-office/medical-office';
import { config } from '../../constant/param';
import { MenuService } from '../../service/menu.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {

  public sidebarMinimized = false;
  public navItems =[];// navItems;
  user: string;
  rol: number = 0;
  newPasword: string;
  constructor(private _router: Router, private translate: TranslateService, private _modalService: NgbModal, private menuService: MenuService,
    private accService: AccountService) {
    this.user = JSON.parse(localStorage.getItem("currentUser")).userName;
    this.rol = JSON.parse(localStorage.getItem("currentUser")).rol;
    this.menuService.getById(this.rol).subscribe(res => {
      this.navItems = res.map(r => {
        r.name = this.translate.instant(r.name);
        if (r.children)
          r.children.map(e => {
            e.name = this.translate.instant(e.name);
            return e
          })
        return r;
      })

    })

    if (localStorage.getItem("currentUser")) {
      let lang = JSON.parse(localStorage.getItem("currentUser")).language;
      translate.setDefaultLang(lang.toLowerCase())
    }
    ;
  }
  toggleMinimize(e) {
    this.sidebarMinimized = e;


  }
  openChangePassView(): void {
    this._modalService.open(
      ChangePasswordComponent,
      config.modalConfig
    )

  }
  openModalOffices(): void {
    this._modalService.open(
      DoctorOfficeComponent,
      config.modalConfig
    )

  }
  logOut() {
    localStorage.removeItem('currentUser');
    this._router.navigate(['/login']);
    window.location.reload();
  }
}
