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
  count=0;
  filters: ITableColumn[];
  filterOne:string;
  dataPage:any={};
  page:number=1;
  constructor(private translate: TranslateService, private router: Router,
     private alert: AlertService,
      private doctorService: DoctorService) {


  }
  ngOnInit() {
    this.getAll();
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
    this.doctorService.getFiltered(this.filterOne,this.page).subscribe(response => {

      this.doctors = response.data;
      this.dataPage=response
    })
  }
  changePage(next:boolean){
    this.page=next?this.page +=1:this.page -=1;
    if(this.page<0) this.page=0;
    
    this.doctorService.getFiltered(this.filterOne,this.page).subscribe(response => {
      this.doctors = response.data;
      this.dataPage=response
    })
  }

}
