import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router'
import { AlertService } from '../../../service/alert-sweet.service';
import { DoctorOfficeService } from '../../../service/doctorOffice.service'
import {DoctorOfficeEditComponent} from '../edit/doctor-office-edit.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { config } from '../../../constant/param';



interface ITableColumn {
  header: string;
  value?: string;
}

@Component({
  templateUrl: './doctor-office-list.component.html'
})
export class DoctorOfficeListComponent implements OnInit {

  offices = [];
  doctorId=0;
  filterOne='';
  dataPage={}
  page:number=1;
  constructor(private translate: TranslateService, private router: Router,private _modalService: NgbModal,
     private alert: AlertService,
      private officeService: DoctorOfficeService) {


  }
  ngOnInit() {
    this.doctorId=JSON.parse(localStorage.getItem("currentUser")).doctorId;
    this.getAll();
    
  }
  openEditView(id: number): void {
    let modal = this._modalService.open(
      DoctorOfficeEditComponent,
      config.modalConfig
    )
    modal.componentInstance.id = id
    modal.componentInstance.notifyParent.subscribe(result => {
      this.getAll();
    })
  }
  confirmDelete(id) {
    this.alert.question(() => { this.delete(id) }, this.translate.instant('confirm'), this.translate.instant('sureTextRemove'))
  }
  delete(id) {
    this.officeService.delete(id).subscribe(response => {
      this.alert.success(this.translate.instant('sucessDelete'));
      this.getAll();
    }, error => {
      this.alert.success(this.translate.instant(''));
    })
  }

  newOffice() {
    this.router.navigate(['office/add'])
  }
  getAll( ) {
    this.officeService.getFiltered(this.filterOne,this.page,this.doctorId).subscribe(response => {

      this.offices = response.data;
      this.dataPage=response
    })
  }
  
  changePage(next:boolean){
    this.page=next?this.page +=10:this.page -=10;
   this.getAll()
  }

}
