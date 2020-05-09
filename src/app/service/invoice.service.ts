import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { endpoint } from '../constant/endpoind';
import { BaseService } from './base-service';
import { invoice, invoiceDetail } from '../model/invoice';
import { discountReason } from '../model/discountReason';

@Injectable()
export class InvoiceService extends BaseService<invoice, number> {

  constructor(_httpClient: HttpClient) {
    super(_httpClient, environment.url + endpoint.invoice);
  }

  getFiltered(param:string,pageNumber:number,doctorGuid:string){
    param=param==null?'':param;
    let url= environment.url + endpoint.invoice+`/GetInvoicePaginated?pagenumber=${pageNumber}&pagesize=10&parameters=${param}&doctorGuid=${doctorGuid}`
    return this._httpClient.get<any>(url)
  }
}
@Injectable()
export class InvoiceDetailService extends BaseService<invoiceDetail, number> {

  constructor(_httpClient: HttpClient) {
    super(_httpClient, environment.url + endpoint.invoiceDetail);
  }
  getByInvoice(id){
    return this._httpClient.get<invoiceDetail[]>(environment.url + endpoint.invoiceDetail+'/'+id)
  }
}

@Injectable()
export class DescountReasonService extends BaseService<discountReason, number> {

  constructor(_httpClient: HttpClient) {
    super(_httpClient, environment.url + endpoint.discountReason);
  }
}
@Injectable()
export class CurrencyService extends BaseService<any, number> {

  constructor(_httpClient: HttpClient) {
    super(_httpClient, environment.url + endpoint.currency);
  }
}