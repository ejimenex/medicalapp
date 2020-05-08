import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router'
import { AlertService } from '../../../../service/alert-sweet.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { config } from '../../../../constant/param';
import { EditUserComponent } from '../edit/edit-user.component';
import { UserService } from '../../../../service/users.service';


@Component({
  templateUrl: './list-user.component.html'
})
export class UserListComponent implements OnInit {

  users = [];
  filterOne: string="";
  dataPage:any={}
  doctorId=null
  page: number = 0;
  rol: number;
  constructor(private translate: TranslateService, private router: Router,
    private alert: AlertService, private _modalService: NgbModal,
    private userService: UserService) {


  }
  ngOnInit() {
    this.rol = JSON.parse(localStorage.getItem("currentUser")).rol;
    if (this.rol == 2 || this.rol == 3) {
      this.doctorId = JSON.parse(localStorage.getItem("currentUser")).doctorId     

    }
    this.getAll();
  }
  confirmDelete(id) {
    this.alert.question(() => { this.delete(id) }, this.translate.instant('confirm'), this.translate.instant('sureTextRemove'))
  }
  delete(id) {
    this.userService.delete(id).subscribe(response => {
      this.alert.success(this.translate.instant('sucessDelete'));
      this.getAll();
    }, error => {
      this.alert.success(this.translate.instant(''));
    })
  }

  newUser() {
    this.router.navigate(['parameter/user/add'])
  }
  getAll() {
    if (this.rol == 1) {
      this.userService.getFiltered(this.filterOne, this.page).subscribe(response => {
        this.users = response.data;
        this.dataPage=response
      })
    }
    if (this.rol == 2 || this.rol == 3) {
      this.userService.getFilteredByDoctor(this.filterOne, this.page, this.doctorId).subscribe(response => {
        this.users = response.data;
        this.dataPage=response
      })
    }
  }
  changePage(next: boolean) {

    this.page = next ? this.page += 1 : this.page -= 1;
    if (this.page < 0) this.page = 0;

   this.getAll()
  }
  openEditView(id: number): void {
    let modal = this._modalService.open(
      EditUserComponent,
      config.modalConfig
    )
    modal.componentInstance.id = id
    modal.componentInstance.notifyParent.subscribe(result => {
      this.getAll();
    })
  }
}
