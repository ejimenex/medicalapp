import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router'
import { AlertService } from '../../../../service/alert-sweet.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { config } from '../../../../constant/param';
import { EditMedicalCenterComponent } from '../edit/edit-medical-center.component';
import { MedicalCenterService } from '../../../../service/medical-center.service';
import { MedicalCenter } from '../../../../model/medicalCenter';

@Component({
  templateUrl: './medical-center-list.component.html'
})
export class MedicalCenterListComponent implements OnInit {

  medicalCenter : MedicalCenter[];
  filterOne="";
  dataPage:any={}
  page:number=0;
  constructor(private translate: TranslateService, private router: Router,
     private alert: AlertService, private _modalService: NgbModal,
      private medicalCenterService: MedicalCenterService) {


  }
  ngOnInit() {
    
    this.getAll();
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
    this.medicalCenterService.getFiltered(this.filterOne,this.page).subscribe(response => {

      this.medicalCenter = response.data;
      this.dataPage=response
    })
  }
  
  changePage(next:boolean){
    this.page=next?this.page +=1:this.page -=1;
    if(this.page<0) this.page=0;
    
   this.getAll()
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
