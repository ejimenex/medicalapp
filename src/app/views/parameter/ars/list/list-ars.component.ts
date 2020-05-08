import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router'
import { AlertService } from '../../../../service/alert-sweet.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { config } from '../../../../constant/param';
import { EditArsComponent } from '../edit/edit-ars.component';
import { ArsService,ArsListService } from '../../../../service/ars.service';



interface ITableColumn {
  header: string;
  value?: string;
}

@Component({
  templateUrl: './list-ars.component.html'
})
export class ArsListComponent implements OnInit {

  arss = [];
  count=0;
  filters: ITableColumn[];
  filterOne:string;
  dataPage:any={}
  page:number=0;
  constructor(private translate: TranslateService, private router: Router,
     private alert: AlertService,private arsListService :ArsListService, private _modalService: NgbModal,
      private arsService: ArsService) {


  }
  ngOnInit() {
    this.getAll();
    this.filters = [
      { header: this.translate.instant('name'), value: 'name' },
      { header: this.translate.instant('country'), value: 'country' }
    
    ];
  }
  confirmDelete(id) {
    this.alert.question(() => { this.delete(id) }, this.translate.instant('confirm'), this.translate.instant('sureTextRemove'))
  }
  delete(id) {
    this.arsService.delete(id).subscribe(response => {
      this.alert.success(this.translate.instant('sucessDelete'));
      this.getAll();
    }, error => {
      this.alert.success(this.translate.instant(''));
    })
  }

  newArs() {
    this.router.navigate(['parameter/ars/add'])
  }
  getAll( ) {
    this.arsService.getFiltered(this.filterOne,this.page).subscribe(response => {
      this.arss = response.data;
      this.dataPage=response
    })
  }
  changePage(next:boolean){
    this.page=next?this.page +=1:this.page -=1;
    if(this.page<0) this.page=0;
    
    this.arsService.getFiltered(this.filterOne,this.page).subscribe(response => {
      this.arss = response.data;
      this.dataPage=response
    })
  }
  openEditView(id: number): void {
    let modal = this._modalService.open(
      EditArsComponent,
      config.modalConfig
    )
    modal.componentInstance.id = id
    modal.componentInstance.notifyParent.subscribe(result => {
      this.getAll();
    })
  }
}
