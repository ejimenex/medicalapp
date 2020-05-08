import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router'
import { AlertService } from '../../../../service/alert-sweet.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { config } from '../../../../constant/param';
import { EditCountryComponent } from '../edit/edit-country.component';
import { CountryService } from '../../../../service/country.service';
import { Country } from '../../../../model/country';

import { NzMessageService } from 'ng-zorro-antd/message';


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
  dataPage: any = {};
  filterOne: string
  page: number = 1;
  constructor(private translate: TranslateService,
    private router: Router, private alert: AlertService, private _modalService: NgbModal, private countryService: CountryService) {

  }
  ngOnInit() {

    this.getAll();
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
  getAll() {
    this.countryService.getFiltered(this.filterOne, this.page).subscribe(response => {
      this.countries = response.data;
      this.dataPage = response
    })
  }

  changePage(next: boolean) {

    this.page = next ? this.page += 1 : this.page -= 1;
    if (this.page < 0) this.page = 0;
    this.getAll();
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
