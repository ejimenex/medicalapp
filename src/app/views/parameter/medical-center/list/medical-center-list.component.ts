import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router'
import { AlertService } from '../../../../service/alert-sweet.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { config } from '../../../../constant/param';
import { EditMedicalCenterComponent } from '../edit/edit-medical-center.component';
import { MedicalCenterService } from '../../../../service/medical-center.service';
import { MedicalCenter } from '../../../../model/medicalCenter';

interface ITableColumn {
  header: string;
  value?: string;
}

@Component({
  templateUrl: './medical-center-list.component.html'
})
export class MedicalCenterListComponent implements OnInit {

  medicalCenter : MedicalCenter[];
  filters: ITableColumn[];
  filter:any={};
  page:number=0;
  constructor(private translate: TranslateService, private router: Router,
     private alert: AlertService, private _modalService: NgbModal,
      private medicalCenterService: MedicalCenterService) {


  }
  ngOnInit() {
    
    this.getAll();
    this.filters = [
      { header: this.translate.instant('name'), value: 'name' },
      { header: this.translate.instant('country'), value: 'countryName' },
      { header: this.translate.instant('city'), value: 'city' },
      { header: this.translate.instant('phone1'), value: 'phone1' }
    
    ];
  }
  confirmDelete(id) {
    this.alert.question(() => { this.delete(id) }, this.translate.instant('confirm'), this.translate.instant('sureTextRemove'))
  }
  delete(id) {
    this.medicalCenterService.delete(id).subscribe(response => {
      this.alert.success(this.translate.instant('sucessDelete'));
      this.getAll();
    }, error => {
      this.alert.success(this.translate.instant(''));
    })
  }

  newMedicalCenter() {
    this.router.navigate(['parameter/medicalcenter/add'])
  }
  getAll( ) {
    this.filter.orderBy='id';
    this.medicalCenterService.getAll(true,this.filter,this.page).subscribe(response => {

      this.medicalCenter = response;
    })
  }
  getFiltered(){
    this.filter.orderBy='id';
    this.medicalCenterService.getAll(false,this.filter,this.page).subscribe(response => {

      this.medicalCenter = response;
    })
  }
  changePage(next:boolean){
    this.filter.orderBy='id';
    this.filter.value=!this.filter.value?'':!this.filter.value;
    
    if(!this.filter.field)this.filter.field='name';
    this.page=next?this.page +=10:this.page -=10;
    if(this.page<0) this.page=0;
    
    this.medicalCenterService.getAll(false,this.filter,this.page).subscribe(response => {
      this.medicalCenter = response;
    })
  }
  openEditView(id: number): void {
     let modal = this._modalService.open(
        EditMedicalCenterComponent,
      config.modalConfig
     )
     modal.componentInstance.id = id
     modal.componentInstance.notifyParent.subscribe(result => {
       this.getAll();
    })
   }
}
