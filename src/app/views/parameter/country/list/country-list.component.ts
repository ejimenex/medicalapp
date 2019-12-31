import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router'
import { AlertService } from '../../../../service/alert-sweet.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { config } from '../../../../constant/param';
import { EditCountryComponent } from '../edit/edit-country.component';
import { CountryService } from '../../../../service/country.service';
import { Country } from '../../../../model/country';


interface ITableColumn {
  header: string;
  value?: string;
}

@Component({
  templateUrl: './country-list.component.html'
})
export class CountryListComponent implements OnInit {

  countries = [];
  filters: ITableColumn[];
  filter:any={};
  page:number=0;
  constructor(private translate: TranslateService, private router: Router, private alert: AlertService, private _modalService: NgbModal, private countryService: CountryService) {
  
  }
  ngOnInit() {
    this.getAll();
    this.filters = [
      { header: this.translate.instant('name'), value: 'name' },
      { header: this.translate.instant('code'), value: 'code' },
    
    ];
  }
  confirmDelete(id) {
    this.alert.question(() => { this.delete(id) }, this.translate.instant('confirm'), this.translate.instant('sureTextRemove'))
  }
  delete(id) {
    this.countryService.delete(id).subscribe(response => {
      this.alert.success(this.translate.instant('sucessDelete'));
      this.getAll();
    }, error => {
      this.alert.success(this.translate.instant(''));
    })
  }

  newCountry() {
    this.router.navigate(['parameter/country/add'])
  }
  getAll( ) {
    this.countryService.getAll(true,this.filter,this.page).subscribe(response => {

      this.countries = response;
    })
  }
  getFiltered(){
    this.countryService.getAll(false,this.filter,this.page).subscribe(response => {

      this.countries = response;
    })
  }
  changePage(next:boolean){
    this.filter.value=!this.filter.value?'':!this.filter.value;
    
    if(!this.filter.field)this.filter.field='name';
    this.page=next?this.page +=10:this.page -=10;
    if(this.page<0) this.page=0;
    
    this.countryService.getAll(false,this.filter,this.page).subscribe(response => {
      this.countries = response;
    })
  }
  openEditView(id: number): void {
    let modal = this._modalService.open(
      EditCountryComponent,
      config.modalConfig
    )
    modal.componentInstance.id = id
    modal.componentInstance.notifyParent.subscribe(result => {
      this.getAll();
    })
  }
}
