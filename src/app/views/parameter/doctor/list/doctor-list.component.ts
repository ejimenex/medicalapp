import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router'
import { AlertService } from '../../../../service/alert-sweet.service';
import { DoctorService } from '../../../../service/doctor.service'



interface ITableColumn {
  header: string;
  value?: string;
}

@Component({
  templateUrl: './doctor-list.component.html'
})
export class DoctorListComponent implements OnInit {

  doctors = [];
  filters: ITableColumn[];
  filter:any={};
  page:number=0;
  constructor(private translate: TranslateService, private router: Router,
     private alert: AlertService,
      private doctorService: DoctorService) {


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
    this.doctorService.delete(id).subscribe(response => {
      this.alert.success(this.translate.instant('sucessDelete'));
      this.getAll();
    }, error => {
      this.alert.success(this.translate.instant(''));
    })
  }

  newDoctor() {
    this.router.navigate(['parameter/doctor/add'])
  }
  getAll( ) {
    this.doctorService.getAll(true,this.filter,this.page).subscribe(response => {

      this.doctors = response;
    })
  }
  getFiltered(){
    this.doctorService.getAll(false,this.filter,this.page).subscribe(response => {

      this.doctors = response;
    })
  }
  changePage(next:boolean){
    this.filter.value=!this.filter.value?'':!this.filter.value;
    
    if(!this.filter.field)this.filter.field='name';
    this.page=next?this.page +=10:this.page -=10;
    if(this.page<0) this.page=0;
    
    this.doctorService.getAll(false,this.filter,this.page).subscribe(response => {
      this.doctors = response;
    })
  }

}
