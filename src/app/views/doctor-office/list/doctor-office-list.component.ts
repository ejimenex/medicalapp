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
  count=0
  filters: ITableColumn[];
  filter:any={};
  page:number=0;
  constructor(private translate: TranslateService, private router: Router,private _modalService: NgbModal,
     private alert: AlertService,
      private officeService: DoctorOfficeService) {


  }
  ngOnInit() {
    this.filter.specifiedField=JSON.parse(localStorage.getItem("currentUser")).doctorId;
    //this.filter.orderBy='id'
    this.getAll();
    this.filters = [
      { header: this.translate.instant('name'), value: 'name' },
      { header: this.translate.instant('medicalCenterSingular'), value: 'medicalCenterName' }    
    ];  
    
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
    this.officeService.getBySpecifiedParam(true,this.filter,this.page,'DoctorId').subscribe(response => {

      this.offices = response['value'];
      this.count=response['@odata.count']
    })
  }
  getFiltered(){
    this.officeService.getBySpecifiedParam(false,this.filter,this.page,'DoctorId').subscribe(response => {

      this.offices = response['value'];
      this.count=response['@odata.count']
    })
  }
  changePage(next:boolean){
    this.filter.value=!this.filter.value?'':!this.filter.value;
    
    if(!this.filter.field)this.filter.field='name';
    this.page=next?this.page +=10:this.page -=10;
    if(this.page<0) this.page=0;
    
    this.officeService.getBySpecifiedParam(false,this.filter,this.page,'DoctorId').subscribe(response => {
      this.offices = response['value'];
      this.count=response['@odata.count']
    })
  }

}
