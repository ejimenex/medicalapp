import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { endpoint } from '../constant/endpoind';
import { BaseService } from './base-service';
import { MedicalService } from '../model/medicalService';

@Injectable()
export class MedicalServiceService extends BaseService<MedicalService, number> {

  constructor(_httpClient: HttpClient) {
    super(_httpClient, environment.url + endpoint.medicalService);
  }
  getCurrency() {
    return this._httpClient.get(environment.url + endpoint.currency);
  }
  getFiltered(param:string,pageNumber:number,DoctorId:string){
    param=param==null?'':param;
    let url= environment.url + endpoint.medicalService+`/GetMedicalServicePaginated?pagenumber=${pageNumber}&pagesize=10&parameters=${param}&doctorGuid=${DoctorId}`
    return this._httpClient.get<any>(url)
  }
  getByDoctor(DoctorId:string){
    let url= environment.url + endpoint.medicalService+`/GetByGuid?id=${DoctorId}`
    return this._httpClient.get<any>(url)
  }
}
