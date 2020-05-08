import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { endpoint } from '../constant/endpoind';
import { BaseService } from './base-service';
import { DoctorModel } from '../model/doctor';

@Injectable()
export class DoctorService extends BaseService<DoctorModel, number> {

  constructor(_httpClient: HttpClient) {
    super(_httpClient, environment.url + endpoint.doctor);
  }

  getFiltered(param:string,pageNumber:number){
    param=param==null?'':param;
    let url= environment.url + endpoint.doctor+`/GetDoctorPaginated?pagenumber=${pageNumber}&pagesize=10&parameters=${param}`
    return this._httpClient.get<any>(url)
  }
}
