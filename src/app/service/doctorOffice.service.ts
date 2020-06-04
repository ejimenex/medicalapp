import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { endpoint } from '../constant/endpoind';
import { BaseService } from './base-service';
import { DoctorOffice } from '../model/doctorOffice';

@Injectable()
export class DoctorOfficeService extends BaseService<DoctorOffice, number> {

  constructor(_httpClient: HttpClient) {
    super(_httpClient, environment.url + endpoint.doctorOffice);
  }
getByDoctor(id:number){
  return this._httpClient.get(environment.url+endpoint.doctorOffice+'/getByDoctor?id='+id,this.httpOptions)
}
getFiltered(filter:string,page:number,id:number){
  return this._httpClient.get<any>(environment.url+endpoint.doctorOffice+`/GetOfficePaginated?pagesize=10&pagenumber=${page}&parameters=${filter}&doctorId=${id}`,this.httpOptions)
}
}
