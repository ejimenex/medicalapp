import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router'
import { AlertService } from '../../../service/alert-sweet.service';
import { InvoiceService } from '../../../service/invoice.service'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { config } from '../../../constant/param';


@Component({
  templateUrl: './list-invoice.component.html'
})
export class InvoiceListComponent implements OnInit {

  invoices = [];
  doctorId='';
  filterOne='';
  dataPage={}
  page:number=1;
  constructor(private translate: TranslateService, private router: Router,private _modalService: NgbModal,
     private alert: AlertService,
      private invoiceService: InvoiceService) {


  }
  ngOnInit() {
    this.doctorId=JSON.parse(localStorage.getItem("currentUser")).doctorGuid;
    this.getAll();
    
  }
  
  confirmDelete(id) {
    this.alert.question(() => { this.delete(id) }, this.translate.instant('confirm'), this.translate.instant('sureTextRemove'))
  }
  delete(id) {
    this.invoiceService.delete(id).subscribe(response => {
      this.alert.success(this.translate.instant('sucessDelete'));
      this.getAll();
    }, error => {
      this.alert.success(this.translate.instant(''));
    })
  }

  newInvoice() {
    this.router.navigate(['invoices/add'])
  }
  edit(id) {
    this.router.navigate(['invoices/edit/'+id])
  }
  getAll( ) {
    this.invoiceService.getFiltered(this.filterOne,this.page,this.doctorId).subscribe(response => {

      this.invoices = response.data;
      this.dataPage=response
    })
  }
  
  changePage(next:boolean){
    this.page=next?this.page +=10:this.page -=10;
   this.getAll()
  }

}
