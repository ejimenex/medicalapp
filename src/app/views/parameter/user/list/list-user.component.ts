import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router'
import { AlertService } from '../../../../service/alert-sweet.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { config } from '../../../../constant/param';
import { EditUserComponent } from '../edit/edit-user.component';
import { UserService } from '../../../../service/users.service';



interface ITableColumn {
  header: string;
  value?: string;
}

@Component({
  templateUrl: './list-user.component.html'
})
export class UserListComponent implements OnInit {

  users = [];
  filters: ITableColumn[];
  filter:any={};
  page:number=0;
  constructor(private translate: TranslateService, private router: Router,
     private alert: AlertService, private _modalService: NgbModal,
      private userService: UserService) {


  }
  ngOnInit() {
    this.getAll();
    this.filters = [
      { header: this.translate.instant('name'), value: 'name' },
      { header: this.translate.instant('userName'), value: 'userName' },
      { header: this.translate.instant('mail'), value: 'mail' },
      { header: this.translate.instant('rol'), value: 'rolName' }
    
    ];
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
  getAll( ) {
    this.userService.getAll(true,this.filter,this.page).subscribe(response => {

      this.users = response;
    })
  }
  getFiltered(){
    this.userService.getAll(false,this.filter,this.page).subscribe(response => {

      this.users = response;
    })
  }
  changePage(next:boolean){
    this.filter.value=!this.filter.value?'':!this.filter.value;
    
    if(!this.filter.field)this.filter.field='name';
    this.page=next?this.page +=10:this.page -=10;
    if(this.page<0) this.page=0;
    
    this.userService.getAll(false,this.filter,this.page).subscribe(response => {
      this.users = response;
    })
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
